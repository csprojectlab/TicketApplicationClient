import API from '@/api'
import axios from 'axios'

export default {
    getComments (ticketId, headers) {           
        return axios.get(`${API}tickets/${ticketId}/comments`, {headers})        
    }
}