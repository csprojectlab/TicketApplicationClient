import Ticket_Api from '@/api/addTicketApi'

export default {
    /**
     * ADD A NEW TICKET.
     */
    async addNewTicket (context, ticket, headers) {
        
        try {
            const {data} = await Ticket_Api.addNewTicket (ticket, headers)
            context.showMessage("TICKET ADDED SUCCCESSFULLY.")
            return data;
        } catch (error) {
            context.showMessage("UNABLE TO ADD THE TICKET");
            return null;
        }
    }
}