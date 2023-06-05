import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Stack, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function MovieDetail() {
  const location = useLocation()
  const { tr_mp4, poster_url, title_th, synopsis_th, genre, id } = location.state?.movie
  const [favorite, setFavorite] = useState([])
  const [is_favorite, setis_favorite] = useState(false)

  const StyledMovieImg = styled('img')({
    width: '20%',
    objectFit: 'cover',
    borderRadius: 10,
  })

  useEffect(() => {
    const storedMovie = localStorage.getItem('favoriteMovie')
    if (storedMovie) {
      setFavorite(JSON.parse(storedMovie))
      const favoritData = JSON.parse(storedMovie)
      const findFavorit = favoritData.find((data) => data.id === id)
      if (findFavorit) {
        setis_favorite(true)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favoriteMovie', JSON.stringify(favorite))
  }, [favorite])

  const handleAddFavorite = () => {
    let newFavorite = {
      id: id,
      title: title_th,
    }
    setis_favorite(true)
    setFavorite([...favorite, newFavorite])
  }

  const handleRemoveFavorite = () => {
    const updatedFavorite = favorite.filter((data) => data.id !== id)
    setFavorite(updatedFavorite)
    setis_favorite(false)
  }

  return (
    <div className="movie-detail">
      <Helmet>
        <title>Cinemo | {title_th || ''}</title>
      </Helmet>

      <div className="video-wrapper">
        <video controls width="100%" autoPlay loop style={{ marginTop: '-100px' }}>
          <source src={tr_mp4} type="video/mp4" />
        </video>
      </div>
      <Container>
        <Stack direction="row" alignItems="start" spacing={4} mt={5}>
          <StyledMovieImg className="poster-image" alt={poster_url} src={poster_url} />
          <Stack direction="column" alignItems="start" spacing={4}>
            <Typography variant="h4">{title_th || ''}</Typography>
            <Typography variant="body1">{synopsis_th || ''}</Typography>
            <Stack direction="row" alignItems="center" spacing={0.3} mb={0.3}>
              <SellOutlinedIcon className="tag-icon" />
              <Typography className="movie-genre">{genre}</Typography>
            </Stack>
            <Button
              variant="contained"
              endIcon={is_favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => (!is_favorite ? handleAddFavorite() : handleRemoveFavorite())}
            >
              Like
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
