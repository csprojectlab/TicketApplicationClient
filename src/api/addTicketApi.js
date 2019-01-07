import API from '@/api'
import axios from 'axios'

export default {
    addNewTicket (ticket, headers) {           
        return axios.post(`${API}tickets/addticket`, ticket, {headers})        
    }
}