import API from '@/api'
import axios from 'axios'

export default {
    assignTicket (assignData, headers) {        
        return axios.post(`${API}tickets/assignticket`, assignData, {headers})        
    }
}