

import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';
 const APIkey = '2503b31fcfmshab478542c1105b7p131003jsnfde0ca8159d0'

async function fetchData(url){
    const { data} = await axios.get((url),{
        headers: {
            'X-RapidAPI-Key': '2503b31fcfmshab478542c1105b7p131003jsnfde0ca8159d0',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    })

    return {data}
}

export { fetchData };