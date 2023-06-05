import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { MovieList } from '../components/Movie'
import { apiGetMovie } from '../services/Movie'
import { STATUS_CODE } from '../constant'
import { storeMovie } from '../redux/Reducer'

export default function MyFavorite() {
  const { SUCCESS } = STATUS_CODE
  const dispatch = useDispatch()
  const [is_loading, setis_loading] = useState(true)

  useEffect(() => {
    getMovie()
  }, [])

  const getMovie = async () => {
    setis_loading(true)
    try {
      const response = await apiGetMovie()
      if (response.status === SUCCESS) {
        const storedMovie = localStorage.getItem('favoriteMovie')
        if (storedMovie) {
          const favoritData = JSON.parse(storedMovie)
          const filterFavorite = response.data?.movies.filter((res) => favoritData.find(({ id }) => res.id === id))
          if (filterFavorite) {
            dispatch(storeMovie(filterFavorite))
            setis_loading(false)
          }
        }
      }
    } catch (error) {
      Promise.reject(error)
    }
  }

  return (
    <>
      <Helmet>
        <title> Cinemo | My Favorite </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          My Favorite
        </Typography>
        <MovieList isLoading={is_loading} />
      </Container>
    </>
  )
}
