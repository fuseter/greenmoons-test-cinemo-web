import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './assets/main.scss'
import { Provider } from 'react-redux'
import Router from './routes'
import ThemeProvider from './theme'
import ScrollToTop from './components/scroll-to-top'
import { AuthProvider } from './context/AuthProvider'
import store from './redux/Store'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <Provider store={store}>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
