
import { getData } from "./module/getData.js";

// import { fetchData, getJokesRefresh } from "./module/fetchData.js";

let jokeContainter = document.querySelector('#jokes-data');
let quoteContainter = document.querySelector("#quotes-data");
let userContainter = document.querySelector("#users-data");


// console.log(jokeContainter)

let jokeRefreshBtn = document.querySelector("#jokes-refresh")
let quoteRefreshBtn = document.querySelector("#quotes-refresh")
let userRefreshBtn = document.querySelector("#users-refresh")

console.dir(jokeRefreshBtn)


// refresh jokes feature - add new data

jokeRefreshBtn.addEventListener("click", () => {
    // console.log("its working")

    jokeContainter.innerHTML = `
     <h2 class="pl-5"> loading...</h2>
    `

    jokeRefreshBtn.setAttribute("disabled", "true")

    jokeRefreshBtn.disabled ? jokeRefreshBtn.className += (" bg-gray-500 active:scale-[1] active:bg-gray-500") : "";
 
    getJokes() 
})
async function getJokes() {
    // let refreshData = await getJokesRefresh()
    // let refreshData = await fetchData("https://official-joke-api.appspot.com/random_ten")
    let [jokesData] = await getData()
    let refreshData = jokesData;
    // console.log(refreshData)

    await new Promise((resolve)=> setTimeout(()=>resolve(),1000))

    jokeContainter.innerHTML = "";

    renderSection(refreshData, jokeContainter,{
        title:(item)=>item.setup,
        subtitle : (item)=>item.punchline
    })

    
    jokeRefreshBtn.removeAttribute("disabled")
    jokeRefreshBtn.classList.remove("bg-gray-500", "active:scale-[1]", "active:bg-gray-500") 
    jokeRefreshBtn.classList.add("bg-blue-500", "active:scale-[0.9]", "active:bg-blue-600")
    // console.log(jokeRefreshBtn)
 
}

quoteRefreshBtn.addEventListener("click", () => {
    // console.log("its working")

    quoteContainter.innerHTML = `
     <h2 class="pl-5"> loading...</h2>
    `

    quoteRefreshBtn.setAttribute("disabled", "true")

    quoteRefreshBtn.disabled ? quoteRefreshBtn.className += (" bg-gray-500 active:scale-[1] active:bg-gray-500") : "";
 
    getQuotes() 
})
async function getQuotes() {
    // let refreshData = await getJokesRefresh()
    // let refreshData = await fetchData("https://official-joke-api.appspot.com/random_ten")
    let [a,b,quotesData] = await getData()
    let refreshData = quotesData;
    // console.log(refreshData)

    await new Promise((resolve)=> setTimeout(()=>resolve(),1000))

    quoteContainter.innerHTML = "";

    renderSection(refreshData, quoteContainter,{
        title:(item)=>item.quote,
        subtitle : (item)=>item.author
    })

    
    quoteRefreshBtn.removeAttribute("disabled")
    quoteRefreshBtn.classList.remove("bg-gray-500", "active:scale-[1]", "active:bg-gray-500") 
    quoteRefreshBtn.classList.add("bg-blue-500", "active:scale-[0.9]", "active:bg-blue-600")
    // console.log(quoteRefreshBtn)
 
}

userRefreshBtn.addEventListener("click", () => {
    // console.log("its working")

    userContainter.innerHTML = `
     <h2 class="pl-5"> loading...</h2>
    `

    userRefreshBtn.setAttribute("disabled", "true")

    userRefreshBtn.disabled ? userRefreshBtn.className += (" bg-gray-500 active:scale-[1] active:bg-gray-500") : "";
 
    getUsers() 
})
async function getUsers() {
    // let refreshData = await getJokesRefresh()
    // let refreshData = await fetchData("https://official-joke-api.appspot.com/random_ten")
    let [a,usersData,b] = await getData()
    let refreshData = usersData;
    // console.log(refreshData)

    await new Promise((resolve)=> setTimeout(()=>resolve(),1000))

    userContainter.innerHTML = "";

    renderSection(refreshData.results, userContainter,{
        title:(item)=>item.name.first,
        subtitle : (item)=>item.email
    })

    
    userRefreshBtn.removeAttribute("disabled")
    userRefreshBtn.classList.remove("bg-gray-500", "active:scale-[1]", "active:bg-gray-500") 
    userRefreshBtn.classList.add("bg-blue-500", "active:scale-[0.9]", "active:bg-blue-600")
    // console.log(userRefreshBtn)
 
}





//main data fetched and added to the page its included all api

function renderSection(dataArr, container, mapping) {

    dataArr.forEach((dataItm) => {
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
async function renderData() {
    let [jokesData, usersData, quotesData] = await getData()
    // console.log(usersData)
    // console.log(usersData.results[0].name.first)
    // console.log(usersData[0].name.firstname)


    renderSection(jokesData, jokeContainter, {
        title: (item) => item.setup,
        subtitle: (item) => item.punchline
    })

    renderSection(quotesData, quoteContainter, {
        title: (item) => item.quote,
        subtitle: (item) => item.author
    })


    renderSection(usersData.results, userContainter, {
        title: (item) => item.name.first,
        subtitle: (item) => item.email
    })




}

renderData()


