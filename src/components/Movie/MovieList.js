import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import MovieCard from './MovieCard'
import Loading from '../loading'

export default function MovieList(props) {
  const { isLoading } = props
  const { movies } = useSelector((state) => state.movies)
  const [favorite, setFavorite] = useState([])
  const [is_favorite, setis_favorite] = useState([])

  useEffect(() => {
    const storedMovie = localStorage.getItem('favoriteMovie')
    if (storedMovie) {
      setFavorite(JSON.parse(storedMovie))
      const favoritData = JSON.parse(storedMovie)
      const favoriteList = []
      favoritData.map((data) => favoriteList.push(data.id))
      setis_favorite(favoriteList)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favoriteMovie', JSON.stringify(favorite))
  }, [favorite])

  const handleAddFavorite = (id, title_th) => {
    let newFavorite = {
      id: id,
      title: title_th,
    }
    setFavorite([...favorite, newFavorite])
    const favoriteList = []
    const favoriteNew = [...favorite, newFavorite]
    favoriteNew.map((data) => favoriteList.push(data.id))
    setis_favorite(favoriteList)
  }

  const handleRemoveFavorite = (id) => {
    const updatedFavorite = favorite.filter((data) => data.id !== id)
    const favoriteList = []
    updatedFavorite.map((data) => favoriteList.push(data.id))
    setis_favorite(favoriteList)
    setFavorite(updatedFavorite)
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {_.isEmpty(movies) ? (
            <Typography textAlign="center" color="GrayText" mt={10}>
              ไม่มีรายการถูกใจ
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid key={movie.id} item xs={12} sm={6} md={3}>
                  <MovieCard
                    movie={movie}
                    handleAddFavorite={handleAddFavorite}
                    handleRemoveFavorite={handleRemoveFavorite}
                    isFavorite={is_favorite}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </>
  )
}
