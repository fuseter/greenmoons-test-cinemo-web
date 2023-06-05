import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { MovieList } from '../components/Movie'
import { apiGetMovie } from '../services/Movie'
import { STATUS_CODE } from '../constant'
import { storeMovie } from '../redux/Reducer'

export default function MovieFinder() {
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
        dispatch(storeMovie(response.data?.movies))
        setis_loading(false)
      }
    } catch (error) {
      Promise.reject(error)
    }
  }

  return (
    <>
      <Helmet>
        <title>Cinemo | Movie Finder</title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Movie Finder
        </Typography>
        <MovieList isLoading={is_loading} />
      </Container>
    </>
  )
}
