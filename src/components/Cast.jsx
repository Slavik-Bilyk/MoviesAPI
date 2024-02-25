import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {ActorList, ActorItem} from './Cast.styled'

const Cast = () => {
    const [data, setData] = useState(null);
    const { movieId } = useParams();
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzAyMjMxNGZlNmNmMjVlZmYyOTBkZDkxYjUxOTAzZiIsInN1YiI6IjY0NmZhMDQyYzVhZGE1MDBkZWU2Njc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uIxfSgTwNgRYS5UWjwvghZ01EYEFs3x2JVSyeT6FUHE",
        },
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch movie credits");
                }
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const { cast } = data;
    console.log(data)

    return (
        <div>
            <ActorList>
                {cast.map(actor => (
                    <ActorItem key={actor.id}>
                        {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />}
                        {actor.name}
                    </ActorItem>
                ))}
            </ActorList>
        </div>
    );
}

export default Cast;
