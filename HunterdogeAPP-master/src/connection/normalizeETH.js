export const normalizeEth = (wei: any, float = 3) => {
    if (!wei) return 0;
    const dot = wei.indexOf('.');
    return wei.slice(0, dot+float);
  }