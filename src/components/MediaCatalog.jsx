import axios from "axios"
import { useState, useEffect } from "react"

export default function MediaCatalog({ page, limit, sort, type, genre, year, name, total }){
    const API_URL = 'https://evloevfilmapi.vercel.app/api/list'
    const API_TOKEN = '3794a7638b5863cc60d7b2b9274fa32e'

    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)
  
    useEffect(()=>{
        axios.get(API_URL, {
            params: {
                token: API_TOKEN,
                page: page,
                limit: limit,
                sort: sort,
                type: type,
                genre: genre,
                year: year,
                name: name
            }
        }).then((response) => {
            setData(response.data.results)
            total(response.data.total)
            setLoading(false)
            console.log(response.data);
            
        }).catch(error=>{
            setError(error)
            setLoading(false)
        })
    }, [ page, limit, sort, type, genre, year, name ])

    return(
        <>
            {loading && <div>Загрузка...</div>}
            {data.map((film) => (
                <div key={film.id || film._id || Math.random()}>
                    <img src={film.poster}/>
                    {film.name}
                    <a href={film.iframe_url}>_Смотреть</a>
                </div>
            ))}
        </>
    )
}