import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const Movies = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [prevQuery, setPrevQuery] = useState('');
    const [query, setQuery] = useState(searchParams.get('movie') || '');

    const visibleMovieTitles = data.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzAyMjMxNGZlNmNmMjVlZmYyOTBkZDkxYjUxOTAzZiIsInN1YiI6IjY0NmZhMDQyYzVhZGE1MDBkZWU2Njc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uIxfSgTwNgRYS5UWjwvghZ01EYEFs3x2JVSyeT6FUHE",
        },
    };

    useEffect(() => {
        if (prevQuery !== query) {
            setIsLoading(true);
            fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch movie data');
                    }
                })
                .then(data => {
                    setData(data.results);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setIsLoading(false);
                });
            setPrevQuery(query);
        }
    }, [query]);

    const handleInputChange = evt => {
        setQuery(evt.target.value);
    };

    const submitForm = evt => {
        evt.preventDefault();
        if (query === '') {
            alert('Please enter a movie name.');
            return;
        }

        if(prevQuery === query) {
            return
        }
        setSearchParams({ movie: query });
    };

    return (
        <div>
            <form onSubmit={submitForm}>
                <input type="text" value={query} onChange={handleInputChange} />
                <button type="submit">Search</button>
            </form>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {visibleMovieTitles.map(movie => (
                        <li key={movie.id}>
                          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Movies;
