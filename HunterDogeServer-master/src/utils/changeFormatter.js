export const changeFormatter = (change) => {
    try {
        if (change > 0) {
            return {text: `24H = +${change.toFixed(2)}%`, up: true}
        } else {
            return {text: `24H = ${change.toFixed(2)}%`, up: false}
        }
    } catch (e) {
        console.warn(e)
    }
}
export const NumberFormatter = (value) => {
    try{
        return value.toLocaleString().replace(/,/g, "'")
    } catch (e) {
        console.warn(e)
    }
}