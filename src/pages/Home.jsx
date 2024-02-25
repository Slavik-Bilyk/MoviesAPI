import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {MoviesList, MoviesItem} from './Home.styled'

const Home = () => {

const [data, setData] = useState([])
const [error, setError] = useState(null)
const location = useLocation()
const [isLoading, setIsLoading] = useState(true)

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzAyMjMxNGZlNmNmMjVlZmYyOTBkZDkxYjUxOTAzZiIsInN1YiI6IjY0NmZhMDQyYzVhZGE1MDBkZWU2Njc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uIxfSgTwNgRYS5UWjwvghZ01EYEFs3x2JVSyeT6FUHE',
        },
      };


useEffect(() => {


    fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    .then(response => {
        if(response.ok) {
            return response.json()
        } else {
            return 
        }
    })
    .then(data => {
        setData(data.results)
        setIsLoading(false)
    })
    .catch(error => {
        setError(error.message)
        setIsLoading(false)
    })

}, [])


if(!isLoading && error) {
    return (
        <div>Error: {error}</div>
    )
}

if(isLoading) {
    return (
        <div>Loading...</div>
    )
}

return (
    <div>
        <h1>Trending Today</h1>
        <MoviesList>
            {data.map(movie => (
                <MoviesItem key={movie.id}>
                    <Link to={`movies/${movie.id}`} state={{from: location}}>{movie.title}</Link>
                </MoviesItem>
            ))}
        </MoviesList>
    </div>
)

}

export default Home