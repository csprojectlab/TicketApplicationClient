import Add_Ticket_Api from '@/api/addTicketApi'
import Get_Ticket_Api from '@/api/getTicketApi'

export default {
    /**
     * ADD A NEW TICKET.
     */
    async addNewTicket (context, ticket, headers) {        
        try {
            const {data} = await Add_Ticket_Api.addNewTicket (ticket, headers)
            context.showMessage("TICKET ADDED SUCCCESSFULLY.")
            return data;
        } catch (error) {
            context.showMessage("UNABLE TO ADD THE TICKET");
            return null;
        }
    },
    /**
     * GET THET TICKETS FROM THE DATABASE.
     */
    async getTickets (context, headers, userId) {
        let tickets = null;
        try {
            if(userId) {
                const {data} = await Get_Ticket_Api.getTickets (headers, userId);
                tickets = data;
            } else {
                const {data} = await Get_Ticket_Api.getTickets (headers);                
                tickets = data;
            }
            return tickets;
        } catch (error) {
            context.showMessage ("ERROR FETCHING THE TICKETS FROM THE DATABASE.");
            return null;
        }
    }
}