import React from 'react'
import { Box, Card, Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom'

const StyledMovieImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  backfaceVisibility: 'hidden',
  transition: '.2s ease-in-out',
  opacity: 1,
})

export default function MovieCard({ movie, handleAddFavorite, handleRemoveFavorite, isFavorite }) {
  const { poster_url, title_th, genre, id } = movie
  const navigate = useNavigate()

  const handleSeeDetail = () => {
    navigate(`/cinemo/movie/${title_th}`, {
      state: {
        movie,
      },
    })
  }

  return (
    <Card className="movie-card-container">
      <Box sx={{ pt: '100%' }}>
        <StyledMovieImg className="poster-image" alt={poster_url} src={poster_url} onClick={() => handleSeeDetail()} />
        <div className="favorite-icon-wrapper">
          {isFavorite?.includes(id) ? (
            <FavoriteIcon className="icon-favorite-red" onClick={() => handleRemoveFavorite(id)} />
          ) : (
            <FavoriteBorderIcon className="icon-favorite" onClick={() => handleAddFavorite(id, title_th)} />
          )}
        </div>
        <div className="content-detail-wrapper">
          <div className="movie-genre-wrapper">
            <Stack direction="row" alignItems="center" spacing={0.3} mb={0.3}>
              <SellOutlinedIcon className="tag-icon" />
              <Typography className="movie-genre">{genre}</Typography>
            </Stack>
            <Typography className="movie-name">{title_th}</Typography>
          </div>
        </div>
      </Box>
    </Card>
  )
}
