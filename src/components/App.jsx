import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "pages/Home"
import MovieDetails from "pages/MovieDetails"

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<div>movies</div>} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<div>cast</div>} />
          <Route path="reviews" element={<div>reviews</div>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
