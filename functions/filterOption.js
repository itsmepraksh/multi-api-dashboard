

import { getData } from "../module/getData.js";



export const jokesFilterOption = () => {

    let filter = document.querySelector('#jokes-filter button');
    let userFilter = document.querySelector('#jokes-filter select');
    let jokesContainer = document.querySelector('#jokes-data')

    filter.addEventListener('click', async (e) => {
        e.preventDefault()
        let filterVal = userFilter.value;
        if (filterVal == null || filterVal == "null") return;

        let jokes = await getJokesFilterData(filterVal);
        // console.log(jokes) 

        jokesContainer.innerHTML = ""
        jokesContainer.innerHTML = `
            <h2 class="pl-5"> loading...</h2>
        `

        await new Promise((resolve) => setTimeout(() => resolve(), 1500))
        jokesContainer.innerHTML = ""



        if (jokes) {
            renderSection(jokes, jokesContainer, {
                title: (item) => item.setup,
                subtitle: (item) => item.punchline
            })
        } else {
            jokesContainer.innerHTML = `<h1>data not found</h1>`
        }

    })
}

async function getJokesFilterData(filterKeyword) {

    let [jokesData, usersData, quotesData] = await getData()

    let jokesFilter = applyFilter(jokesData, filterKeyword, {
        seperateBy: (item) => item.type
    }) 
    return jokesFilter;
}

function applyFilter(arrData, keyword, mapping) {

    // console.log('dek le',arrData,'abhi ye check kar reahe hai')
    let refineData = arrData.filter((dataItm) => {
        // console.log(dataItm)
        let titleTxt = mapping.seperateBy(dataItm);
        return titleTxt.includes(keyword) ? dataItm : null
    })
    return refineData
}

function renderSection(arr, container, mapping) {

    // console.log(arr)

    arr.forEach((dataItm) => {
        // console.log(dataItm)
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

        // herre im now
export const usersFilterOption = () => {

    let filter = document.querySelector('#users-filter button');
    let userFilter = document.querySelector('#users-filter select');
    let usersContainer = document.querySelector('#users-data')

    filter.addEventListener('click', async (e) => {
        e.preventDefault()
        let filterVal = userFilter.value;
        if (filterVal == null || filterVal == "null") return;

    let users = await getUsersFilterData(filterVal)

    usersContainer.innerHTML = ""
    usersContainer.innerHTML = `
            <h2 class="pl-5"> loading...</h2>
        `

    await new Promise((resolve) => setTimeout(() => resolve(), 1500))
        usersContainer.innerHTML = ""

        if (users) {
            renderSection(users, usersContainer, {
                title: (item) => item.name.first,
                subtitle: (item) => item.email
            })
        } else {
            usersContainer.innerHTML = `<h1>data not found</h1>`
        }


    })
}

async function getUsersFilterData(filterKeyword){

    let [jokesData, usersData, quotesData] =  await getData();

    // console.log(usersData.results)
    let usersFilter = applyFilter(usersData.results,filterKeyword,{
        seperateBy: (item)=> item.gender
    }) 

    return usersFilter
}

 