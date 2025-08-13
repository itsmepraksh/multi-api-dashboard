
import { getData } from "../module/getData.js";

let jokesContainer = document.querySelector('#jokes-data');
let quoteContainer = document.querySelector("#quotes-data");
let userContainer = document.querySelector("#users-data");


export let searchFunction = () => {
    let form = document.getElementById("searchBar");

    let userInp = document.querySelector("input")

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        let keyword = userInp.value.toLowerCase()

        let { jokes, users, quotes } = await searchData(keyword)
        jokesContainer.innerHTML = userContainer.innerHTML = quoteContainer.innerHTML = ""
        jokesContainer.innerHTML = userContainer.innerHTML = quoteContainer.innerHTML = `
            <h2 class="pl-5"> loading...</h2>
        `

        await new Promise((resolve) => setTimeout(() => resolve(), 1500))
        jokesContainer.innerHTML = userContainer.innerHTML = quoteContainer.innerHTML = ""

        if (jokes) {
            renderSection(jokes, jokesContainer, {
                title: (item) => item.setup,
                subtitle: (item) => item.punchline
            })
        } else {
            jokesContainer.innerHTML = `<h1>data not found</h1>`
        }

        if (users) {
            renderSection(users, userContainer, {
                title: (item) => item.name.first,
                subtitle: (item) => item.email
            })
        } else {
            userContainer.innerHTML = `<h1>data not found</h1>`
        }

        if (quotes) {
            renderSection(quotes, quoteContainer, {
                title: (item) => item.quote,
                subtitle: (item) => item.author
            })
        } else {
            quoteContainer.innerHTML = `<h1>data not found</h1>`
        }


    })
}

function renderSection(arr, container, mapping) {


    // console.log(typeof arr)
    console.log(arr, "ye rendersection ke andar check kar", mapping, container)


    arr.forEach((dataItm) => {
        console.log(dataItm)
        let box = document.createElement('div')
        box.setAttribute('class', "box")
        // console.log(dataItm[mapping.title])

        box.innerHTML = `
                <div class="data shrink-[0] w-80 p-4 bg-zinc-300">
                    <h1>${mapping.title(dataItm)}</h1>
                    <h3 class="text-sm py-2">--> ${mapping.subtitle(dataItm)}</h3>
                </div>
                `
        container.appendChild(box)
    })



}

async function searchData(keyword) {

    // console.log(keyword)
    let [jokesData, usersData, quotesData] = await getData();

    // console.log(jokesData,usersData,quotesData,"yeaha type dek....now")

    let jokesFilter = filterData(jokesData, keyword, {
        title: (item) => item.setup,
        subtitle: (item) => item.punchline
    })
    let usersFilter = filterData(usersData.results, keyword, {
        title: (item) => item.name.first,
        subtitle: (item) => item.email
    })
    let quotesFilter = filterData(quotesData, keyword, {
        title: (item) => item.quote,
        subtitle: (item) => item.author
    })

    // console.log(jokesFilter,usersFilter, 'checkinng')

    return {
        jokes: (Array.isArray(jokesFilter) && jokesFilter.length > 0) ? jokesFilter : null,
        users: (Array.isArray(usersFilter) && usersFilter.length > 0) ? usersFilter : null,
        quotes: (Array.isArray(quotesFilter) && quotesFilter.length > 0) ? quotesFilter : null,
    }

}


function filterData(arrData, keyword, mapping) {

    // console.log(typeof arrData,'check kar type')

    // console.log(arrData,"check kar raha hu ki arr hai bhi ki nhi")

    let filterDta = arrData.filter((dataItm) => {
        let titleTxt = mapping.title(dataItm).toLowerCase();


        return titleTxt.includes(keyword)
    })

    console.log(filterDta, 'ye filterdta hai')
    return (Array.isArray(filterDta) && filterDta.length > 0) ? filterDta : null

}