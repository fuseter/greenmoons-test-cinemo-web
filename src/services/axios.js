import axios from 'axios'
import { baseURLService } from '../config'

const instance = axios.create({
  baseURL: baseURLService,
})

export default instance
