<template>
    <v-app>
        <v-toolbar color="deep purple darken-4" dark fixed app>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>TICKET APPLICATION</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <v-btn slot="activator"
                      icon
                      large   
                      @click="logout()"                  
                >
                <v-icon>logout</v-icon>
                </v-btn>
                <span>logout</span>
            </v-tooltip>        
        </v-toolbar>
        <v-content>            
                <v-layout>
                    <v-flex>
                       <strong><h3 class="display-3" style="color:purple">TICKET TABLE</h3></strong>
                       <span>Table shows the tickets according to the type of user logged in. Admin is able to see the tickets raised
                           by all the users. He/She has the permission to assign the ticket to himself/herself. On the other hand a 
                           user can only view the status regarding information of the tickets raised by him/her. Clicking on a tickets
                           gives more detailed information.
                       </span>
                    </v-flex>
                </v-layout>
                <v-layout justify-center>
                    <v-flex xs3 pl-2>
                        <user-detail></user-detail>
                    </v-flex>
                    <v-flex xs9 pl-2 pr-2>
                        <ticket-table></ticket-table>     <br>                       
                        <v-btn dark color="purple" @click="$router.push('/dashboard')"><v-icon left>arrow_back</v-icon> Dashboard</v-btn>    
                    </v-flex>                   
                </v-layout>           
        </v-content>
        <v-snackbar bottom color="error" v-model="snackbar">{{message}}</v-snackbar>
    </v-app>
</template>
<script>
import TicketTable from '@/components/ticket/TicketTable'
import UserDetail from '@/components/ticket/UserDetail'
import Authentication from '@/components/authenticate'
import * as Auth from '@/components/authenticate'
export default {
    components: {
        'ticket-table': TicketTable, 'user-detail': UserDetail
    },
    data () {
        return {
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
            

        }
    },
    methods: {
        logout: function () {
             Authentication.logout (this, '/login');
        },
        showMessage: function (message) {
            this.snackbar = true;
            this.message = message;
        }
       
    }
    
}
</script>

