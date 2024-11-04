export const priceFormatter = (price) => {
    try {
        let values = price.split(',')
        let units = []
        
        while(values[0].length > 3) {
            units.push(values[0].substr(-3))
            values[0] = values[0].substr(0, values[0].length - 3)
            if(values[0].length < 3) {
                break
            }
        }
        if(values[0] && parseInt(values[0])) {
            units.push(values[0])
        }
        units.reverse()
        if(units.length > 0){
            return units.join("'")+(values[1] ? '.'+values[1].substr(0, 2) : '')
        } else if(values[1]){
            let digits = (values[1].length + 2 - parseInt(values[1]).toString().length)
            return values[0]+'.'+values[1].substr(0, digits)
        } else {
            return '0.00'
        }
    } catch(e) {
        console.warn(e)
    }
}