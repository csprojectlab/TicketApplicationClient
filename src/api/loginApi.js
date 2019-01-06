import {API} from './index'
import axios from 'axios'

export default {
    async authenticate (credentials) {
        if(!credentials.username || !credentials.password) 
            return {message: "CREDENTIALS NOT COMPLETE"}       
        return axios.post(`${API}login`)        
    }
}