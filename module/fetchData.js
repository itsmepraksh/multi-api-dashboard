
export async function fetchData(apiurl, retries = 3, delay = 1000) {


    for (let i = 0; i < retries; i++) {
        try {
            let rawResponse = await fetch(apiurl);



            if (!rawResponse.ok) {
                throw new Error(`HTTP Error :${rawResponse.status}`)
            }

            try {
                let responseData = await rawResponse.json()
                return responseData
            } catch (err) {
                throw new Error('Invalid Json')
            }


        } catch (err) {

            if (i < retries - 1) {
                console.warn(`Fetched Attempt failed ${i + 1} : ${err.message}`)

                await new Promise((resolve) => setTimeout(() => resolve(), delay))

            } else throw err;
        }

    }

    return null;
}




// export async function getJokesRefresh() {

//     try {
//         let rawResponse = await fetch('https://official-joke-api.appspot.com/random_ten')

//         if (!rawResponse.ok) {
//             throw new Error(`HTTP Error ${rawResponse.status}`)
//         }

//         // console.log(rawResponse)
//         let responseData = await rawResponse.json()

//         return responseData

//     } catch (err) {
//         console.error('Error', err.message)
//     }

// }