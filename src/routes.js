import { Navigate, useRoutes } from 'react-router-dom'
import Page404 from './pages/Page404'
import MyFavorite from './pages/MyFavorite'
import LoginPage from './pages/LoginPage'
import SimpleLayout from './layouts/simple'
import MovieFinder from './pages/MovieFinder'
import DashboardLayout from './layouts/dashboard'
import MovieDetail from './components/MovieDetail'
import { element } from 'prop-types'

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/cinemo',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/cinemo/movie-finder" />, index: true },
        { path: 'movie-finder', element: <MovieFinder /> },
        { path: 'movie/:id', element: <MovieDetail /> },
        { path: 'my-favorite', element: <MyFavorite /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ])

  return routes
}
