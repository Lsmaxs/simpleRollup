function dome() {
    return new Promise((res, rej) => {
        try {
            setTimeout(() => {
                const objA = {
                    'vv': 1
                }
                const objB = {
                    'bb': 2
                }
                const mergeObj = {
                    ...objA,
                    ...objB
                }
                res(mergeObj)
            }, 3000)
        } catch (err) {
            rej(err)
        }
    })
}

export default dome