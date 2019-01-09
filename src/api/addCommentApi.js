import API from '@/api'
import axios from 'axios'

export default {
    addComment (commentData, headers) {           
        return axios.post(`${API}tickets/addcomment`, commentData, {headers})        
    }
}