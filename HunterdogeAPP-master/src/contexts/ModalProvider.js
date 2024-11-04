import React, { useState, createContext } from 'react'

export const ModalContext = createContext({
    openModal: false,
    setOpenModal: () => { },
    openSearch: false,
    setOpenSearch: () => { },
    searchOption: [],
    setSearchOption: () => {},
    isMember: {},
    setIsMember: () => {},
    removeSearchOption: () => {}
})

const ModalContextProvider = ({ children }) => {
    const [openModal, setOpenModalValue] = useState(false)
    const [openSearch, setOpenSearchValue] = useState(true)
    const [searchOption, setSearchOptionValue] = useState([])
    const [isMember, setIsMemberValue] = useState({})

    /*eslint-disable */

    const setOpenModal = () => {
        setOpenModalValue(prevState => {
            return {
                ...prevState,
                openModal: !prevState.openModal
            }
        })
    }

    const setOpenSearch = (value) => {
        setOpenSearchValue(value)
    }

    const setSearchOption = (option) => {
        setSearchOptionValue(prevState => {
            return [
                ...prevState,
                option
            ]
        })
    }
    const setIsMember = (account, value) => {
        setIsMemberValue(prevState => {
            prevState[account] = value
            return prevState
        })
    }

    const removeSearchOption = (id) => {
        const options = searchOption.filter((item)=>id != item.id)
        setSearchOptionValue(options)
    }


    let contextState = {
        openModal,
        setOpenModal,
        openSearch,
        setOpenSearch,
        searchOption,
        setSearchOption,
        isMember,
        setIsMember,
        removeSearchOption,
    }

    /*eslint-enable */

    return (
        <ModalContext.Provider value={contextState}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider;