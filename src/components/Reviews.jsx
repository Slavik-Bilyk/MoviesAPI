import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Reviews = () => {
    const [data, setData] = useState([]);
    const { movieId } = useParams();

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzAyMjMxNGZlNmNmMjVlZmYyOTBkZDkxYjUxOTAzZiIsInN1YiI6IjY0NmZhMDQyYzVhZGE1MDBkZWU2Njc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uIxfSgTwNgRYS5UWjwvghZ01EYEFs3x2JVSyeT6FUHE",
        },
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, options)
            .then(response => {
                if(response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch movie reviews');
                }
            })
            .then(data => {
                setData(data.results);
                console.log(data.results);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if(data.length === 0) {
        return (
            <div>
                Load
            </div>
        )
    }

    return (
        <div>
            {data && data.length > 0 ? (
                <ul>
                    {data.map(result => (
                        <li key={result.id}>
                            <p>{result.author}</p>
                            <p>{result.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Reviews;
