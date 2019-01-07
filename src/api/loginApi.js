import API from '@/api'
import axios from 'axios'

export default {
    authenticate (credentials) {        
        if(!credentials.username || !credentials.password) 
            return {message: "CREDENTIALS NOT COMPLETE"}       
        return axios.post(`${API}login`, credentials)        
    }
}