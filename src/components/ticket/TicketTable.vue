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
                                        <td class="text-xs-left">
                                            <v-chip :selected="props.item.id" class="v-chip--select-multi ">
                                                <v-avatar class="accent white--text">
                                                    {{ props.item.id.toString().slice(0, 1).toUpperCase() }}
                                                </v-avatar>
                                                {{ props.item.id }}
                                            </v-chip>
                                        </td>
                                        <td class="text-xs-left">
                                            <v-chip :selected="props.item.type" class="v-chip--select-multi ">
                                                <v-avatar class="accent white--text">
                                                    {{ props.item.type.slice(0, 1).toUpperCase() }}
                                                </v-avatar>
                                                {{ props.item.type }}
                                            </v-chip>
                                        </td>
                                        <td class="text-xs-left">
                                            <v-chip :selected="props.item.priority" class="v-chip--select-multi ">
                                                <v-avatar class="accent white--text">
                                                    {{ props.item.priority.slice(0, 1).toUpperCase() }}
                                                </v-avatar>
                                                {{ props.item.priority }}
                                            </v-chip>
                                        </td>
                                        <td class="text-xs-left">
                                            <v-chip :selected="props.item.status" class="v-chip--select-multi ">
                                                <v-avatar class="accent white--text">
                                                    {{ props.item.status.slice(0, 1).toUpperCase() }}
                                                </v-avatar>
                                                {{ props.item.status }}
                                            </v-chip>
                                        </td>
                                        <td class="text-xs-left">{{ props.item.message }}</td>
                                        <td class="text-xs-left">{{ props.item.ownedBy }}</td>
                                        <td class="text-xs-left" v-if="isAdmin">
                                            <v-btn dark color="red" v-if="props.item.status!='ASSIGNED'" @click="assignTicket()">
                                                <v-icon left>label_important</v-icon> Assign</v-btn>
                                            <v-btn v-else dark color="green darken-3"><v-icon left>done</v-icon> ASSIGNED</v-btn>                                  
                                        </td>
                                    </template>
                                </v-data-table>    
                            </v-card-text>                          
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
            }, 3000)
        },
        assignTicket () {
            
        }
    }
}
</script>

