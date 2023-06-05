import { useState, useContext } from 'react'
import { LoadingButton } from '@mui/lab'
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material'
import Iconify from '../../../components/iconify'
import { USER } from '../../../constant'
import { AuthContext } from '../../../context/AuthContext'

export default function LoginForm() {
  const { USERNAME, PASSWORD } = USER
  const { login } = useContext(AuthContext)
  const [username, setusername] = useState()
  const [password, setpassword] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [errorUsername, seterrorUsername] = useState({
    status: false,
    msg: '',
  })
  const [errorPassword, seterrorPassword] = useState({
    status: false,
    msg: '',
  })

  const handleSubmit = () => {
    if (!username) {
      seterrorUsername({
        status: true,
        msg: 'Please enter your username',
      })
    }
    if (!password) {
      seterrorPassword({
        status: true,
        msg: 'Please enter your password',
      })
    }

    // Login Mockup **
    if (username && password) {
      if (username !== USERNAME) {
        seterrorUsername({
          status: true,
          msg: 'Invalid Username',
        })
      }

      if (password !== PASSWORD) {
        seterrorPassword({
          status: true,
          msg: 'Invalid Password',
        })
      }
      
      if (username === USERNAME && password === PASSWORD) {
        login({ username })
      }
    }
  }

  return (
    <>
      <Stack spacing={3} mb={5}>
        <TextField
          color="secondary"
          name="username"
          label="Username"
          required
          helperText={errorUsername.status ? errorUsername.msg : null}
          error={errorUsername.status}
          onChange={(e) => {
            setusername(e.target.value)
          }}
        />
        <TextField
          color="secondary"
          name="password"
          label="Password"
          required
          error={errorPassword.status}
          helperText={errorPassword.status ? errorPassword.msg : null}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setpassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
    </>
  )
}
