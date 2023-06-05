import { Helmet } from 'react-helmet-async'
import { styled, alpha } from '@mui/material/styles'
import { Container, Typography, Avatar, Box } from '@mui/material'
import { LoginForm } from '../sections/auth/login'
import { USER } from '../constant'

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  backgroundColor: theme.palette.background.default,
}))

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  marginBottom: 30,
}))

const StyleLogo = styled('img')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: 50,
  width: 250,
}))

export default function LoginPage() {
  const { USERNAME, PASSWORD } = USER

  return (
    <>
      <Helmet>
        <title>Cinemo</title>
      </Helmet>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <StyleLogo src="/assets/icons/CINEMO.png" alt="" />
            <StyledAccount>
              <Avatar src="/assets/images/avatars/avatar_default.jpg" alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  Username : {USERNAME}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  Password : {PASSWORD}
                </Typography>
              </Box>
            </StyledAccount>
            <Typography variant="h5" gutterBottom mb={4}>
              Sign in
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  )
}
