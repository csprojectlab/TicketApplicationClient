import API from '@/api'
import axios from 'axios'

export default {
    register (credentials) {        
        if(!credentials.username || !credentials.password || !credentials.email) 
            return {message: "CREDENTIALS NOT COMPLETE"}       
        return axios.post(`${API}register`, credentials)        
    }
}