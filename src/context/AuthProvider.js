import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import { useNavigate } from 'react-router-dom'
import { secretKey } from '../config'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [userData, setuserData] = useState()

  useEffect(() => {
    const storedUser = localStorage.getItem('userSession')
    if (storedUser) {
      const bytes = CryptoJS.AES.decrypt(storedUser, secretKey)
      const decryptData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      setuserData(decryptData)
    }
  }, [])

  const login = (loginData) => {
    const userDataEncrypt = { username: loginData.username }
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(userDataEncrypt), secretKey).toString()
    setuserData(loginData)
    localStorage.setItem('userSession', ciphertext)
    navigate('/cinemo', { replace: true })
  }

  const logout = () => {
    localStorage.removeItem('userSession')
    window.location.href = '/'
  }

  return <AuthContext.Provider value={{ login, logout, userData }}>{children}</AuthContext.Provider>
}

export { AuthProvider }
