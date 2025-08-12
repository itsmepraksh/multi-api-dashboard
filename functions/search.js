



export let searchFunction = () => {
    let form = document.getElementById("searchBar");

    let userInp = document.querySelector("input")

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('its working')

        console.log(userInp.value)
    })


    function pata_nhi(){

    }
}