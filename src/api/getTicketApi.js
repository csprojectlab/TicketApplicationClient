import API from '@/api'
import axios from 'axios'

export default {
    getTickets (headers, userId) { 
        if(userId)                   
            return axios.get(`${API}tickets/user/${userId}`, {headers})        
        return axios.get(`${API}tickets`, {headers})
    }
}