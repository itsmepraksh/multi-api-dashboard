 
import { fetchData } from "./fetchData.js";

export async function getData(){
    

    try{
    
        let jokesData = await fetchData('https://official-joke-api.appspot.com/random_ten'); 
        let usersData = await fetchData('https://randomuser.me/api/?results=10')  
        let quotesData = await fetchData('https://dummyjson.com/quotes/random/10')

        return [jokesData,usersData,quotesData];
        
    }catch(err){
        if(err.message.includes('HTTP Error')){
            console.error('Server not found...')
        }else if(err.message.includes('Invalid json')){
            console.error("Not a valid json Format")
        }else {
            console.error(`Unknown Error : ${err.message}`)
        }
    }

}