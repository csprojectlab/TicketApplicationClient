import Add_Ticket_Api from '@/api/addTicketApi'
import Get_Ticket_Api from '@/api/getTicketApi'
import Get_Comment_Api from '@/api/getCommentApi'
import Add_Comment_Api from '@/api/addCommentApi'
import Assign_Ticket_Api from '@/api/assignTicketApi'

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
    },
    /**
     * GET THE COMMENTS OF A TICKET.
     */
    async getComments (ticketId, headers) {        
        try {
            const {data} = await Get_Comment_Api.getComments (ticketId, headers);
            return data;
        } catch (error) {
            return null;
        }
    },
    /**
     * ADD A NEW COMMENT TO THE TICKET.
     */
    async addComment (commentData, headers) {
        try {
            const {data} = await Add_Comment_Api.addComment (commentData, headers);
            return data;
        } catch (error) {
            return null;
        }
    },
    /**
     * ASSIGNING THE TICKET TO A OWNER.
     */
    async assignTicket (assignData, headers) {       
        try {
            const {data} = await Assign_Ticket_Api.assignTicket (assignData, headers);
            return data;
        } catch (error) {
            return null;
        }
    }
}