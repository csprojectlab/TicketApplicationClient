<template>
    <v-card class="elevation-12">
                            <v-toolbar dark color="green darken-3">
                                <v-toolbar-title><strong><h3 class="display-1">TICKET DATABASE</h3></strong></v-toolbar-title>
                                <v-spacer></v-spacer>
                                <img width="50" height="50" src="./../../assets/ticket.png" alt="">
                            </v-toolbar>
                            <v-card-text>
                                <v-data-table class="elevation-6" :loading="loading" :headers="headers" :items="ticketData">
                                    <template slot="no-data">
                                        <v-alert :value="true" color="error" icon="warning">NO TICKETS RAISED BY NOW</v-alert>
                                    </template>
                                    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                                    <template slot="items" slot-scope="props">
                                        <tr>
                                        <td class="text-xs-left"  @click="expandTicket(props.item.id)">
                                           {{ props.item.id }}
                                        </td>
                                        <td class="text-xs-left"  @click="expandTicket(props.item.id)">
                                            <v-chip :selected="props.item.type" class="v-chip--select-multi ">
                                                <v-avatar class="accent white--text">
                                                    {{ props.item.type.slice(0, 1).toUpperCase() }}
                                                </v-avatar>
                                                {{ props.item.type }}
                                            </v-chip>
                                        </td>
                                        <td class="text-xs-left"  @click="expandTicket(props.item.id)">
                                            <v-chip :selected="props.item.priority" class="v-chip--select-multi ">
                                                <v-avatar class="accent white--text">
                                                    {{ props.item.priority.slice(0, 1).toUpperCase() }}
                                                </v-avatar>
                                                {{ props.item.priority }}
                                            </v-chip>
                                        </td>
                                        <td class="text-xs-left"  @click="expandTicket(props.item.id)">
                                            <v-chip :selected="props.item.status" class="v-chip--select-multi ">
                                                <v-avatar class="accent white--text">
                                                    {{ props.item.status.slice(0, 1).toUpperCase() }}
                                                </v-avatar>
                                                {{ props.item.status }}
                                            </v-chip>
                                        </td>
                                        <td class="text-xs-left"  @click="expandTicket(props.item.id)">{{ props.item.message }}</td>
                                        <td class="text-xs-left"  @click="expandTicket(props.item.id)">{{ props.item.ownedBy }}</td>
                                        <td class="text-xs-left" v-if="isAdmin">
                                            <v-btn round dark color="red" v-if="props.item.status!='ASSIGNED'" @click="assignTicket(props.item.id)">
                                                <v-icon left>label_important</v-icon> Assign</v-btn>
                                            <v-btn v-else round dark color="green darken-3"><v-icon left>done</v-icon> ASSIGNED</v-btn>                                  
                                        </td>
                                        </tr>
                                    </template>
                                </v-data-table>    
                            </v-card-text>        
                            <v-snackbar bottom color="error" v-model="snackbar">{{message}}</v-snackbar>                  
                        </v-card>
                        
</template>
<script>
import * as Auth from '@/components/authenticate'
import TicketApi from '@/components/ticket'
import Authentication from '@/components/authenticate'
export default {   
    created: async function () {
        await this.updateTickets ();
    },
   data () {
        return {   
            snackbar: true,
            isAdmin: false,      
            loading: true,  
            snackbar: false,
            message: '',
            headers: [{ text: 'TicketId', value: 'ticketId'}, 
                      {text: "Type", sortable: false, value: 'type'}, 
                      { text: "Priority", sortable: false, value: 'priority'}, 
                      { text: "Status", sortable: false, value: 'status'}, 
                      { text: 'Message', sortable: false, value: 'message'}, 
                      { text: "OwnedBy", sortable: false, value: 'ownedBy'}, 
                      { text: 'Own', sortable: false}
                      ],
            ticketData: [],            
        }
    },
    methods: {
        showMessage: function (message) {
            this.snackbar = true;
            this.message = message;
        },
        async updateTickets () {
            this.isAdmin = Auth.default.user.admin;  
            let tickets = null;   
            let auth_headers = { 'Authorization': Authentication.authenticationHeader(this)}            
            if(!this.isAdmin) {
                this.headers = this.headers.filter((header) => header.text != 'Own');                 
                tickets = await TicketApi.getTickets(this, auth_headers, this.$cookie.get('user_id'))           
            } else {
                tickets = await TicketApi.getTickets(this, auth_headers);
            }
            setTimeout(() => {
                this.loading = false;
                this.ticketData = tickets;
            }, 1500)
        },
        expandTicket (ticketId) {
            let ticket = this.ticketData.filter((data) => data.id == ticketId)[0];
            // ADDING TO THE LOCAL STORAGE TO USE IT ON ANOTHER PAGE. SAVING A REQUEST.
            localStorage.setItem('t', JSON.stringify(ticket))
            this.$router.push('/ticketdetail')
        },
        async assignTicket (ticketId) {            
            let auth_headers = { 'Authorization': Authentication.authenticationHeader(this)}            
            await TicketApi.assignTicket ({ ticketId: ticketId, ownedBy: this.$cookie.get('user_name')}, auth_headers);
            this.showMessage (`#TICKET:${ticketId} successfully assigned.`);
            this.ticketData.forEach((ticket) => {
                if(ticket.id == ticketId) {
                    ticket.status = 'ASSIGNED'; ticket.ownedBy = this.$cookie.get('user_name')
                }
            })
        }
    }
}
</script>

