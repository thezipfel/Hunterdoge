import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import invariant from 'tiny-invariant'

// taken from ethers.js, compatible interface with web3 provider
class RequestError extends Error {
  constructor(message, code, data) {
    super(message)
  }
}

export class MiniRpcProvider {
  isMetaMask = false
  chainId = 0
  url = null
  host = null
  path = null
  batchWaitTimeMs = null

  nextId = 1
  batchTimeoutId = null
  batch = []

  constructor(chainId, url, batchWaitTimeMs) {
    this.chainId = chainId
    this.url = url
    const parsed = new URL(url)
    this.host = parsed.host
    this.path = parsed.pathname
    // how long to wait to batch calls
    this.batchWaitTimeMs = batchWaitTimeMs ?? 50
  }

  async clearBatch() {
    console.debug('Clearing batch', this.batch)
    const batch = this.batch
    this.batch = []
    this.batchTimeoutId = null
    let response
    try {
      response = await fetch(this.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(batch.map((item) => item.request)),
      })
    } catch (error) {
      batch.forEach(({ reject }) => reject(new Error('Failed to send batch call')))
      return
    }

    if (!response.ok) {
      batch.forEach(({ reject }) => reject(new RequestError(`${response.status}: ${response.statusText}`, -32000)))
      return
    }

    let json
    try {
      json = await response.json()
    } catch (error) {
      batch.forEach(({ reject }) => reject(new Error('Failed to parse JSON response')))
      return
    }
    const byKey = batch.reduce<{ [id]: BatchItem }>((memo, current) => {
      memo[current.request.id] = current
      return memo
    }, {})
    for (const result of json) {
      const {
        resolve,
        reject,
        request: { method },
      } = byKey[result.id]
      if ('error' in result) {
        reject(new RequestError(result?.error?.message, result?.error?.code, result?.error?.data))
      } else if ('result' in result && resolve) {
        resolve(result.result)
      } else {
        reject(new RequestError(`Received unexpected JSON-RPC response to ${method} request.`, -32000, result))
      }
    }
  }

  sendAsync = (request, callback = (error, response) => {}) => {
    this.request(request.method, request.params)
      .then((result) => callback(null, { jsonrpc: '2.0', id: request.id, result }))
      .catch((error) => callback(error, null))
  }

  request = async (method, params) => {
    if (typeof method !== 'string') {
      return this.request(method.method, method.params)
    }
    if (method === 'eth_chainId') {
      return `0x${this.chainId.toString(16)}`
    }
    const promise = new Promise((resolve, reject) => {
      this.batch.push({
        request: {
          jsonrpc: '2.0',
          id: this.nextId++,
          method,
          params,
        },
        resolve,
        reject,
      })
    })
    this.batchTimeoutId = this.batchTimeoutId ?? setTimeout(this.clearBatch, this.batchWaitTimeMs)
    return promise
  }
}

export class NetworkConnector extends AbstractConnector {
  providers = {}
  currentChainId = 0

  constructor({ urls, defaultChainId }) {
    invariant(defaultChainId || Object.keys(urls).length === 1, 'defaultChainId is a required argument with >1 url')
    super({ supportedChainIds: Object.keys(urls).map((k) => Number(k)) })

    this.currentChainId = defaultChainId || Number(Object.keys(urls)[0])
    this.providers = Object.keys(urls).reduce((accumulator, chainId) => {
      accumulator[Number(chainId)] = new MiniRpcProvider(Number(chainId), urls[Number(chainId)])
      return accumulator
    }, {})
  }

  get provider() {
    return this.providers[this.currentChainId]
  }

  async activate() {
    console.log(this.currentChainId)
    return { provider: this.providers[this.currentChainId], chainId: this.currentChainId, account: null }
  }

  async getProvider() {
    return this.providers[this.currentChainId]
  }

  async getChainId() {
    return this.currentChainId
  }

  async getAccount() {
    return null
  }

  deactivate() {
    return
  }
}
