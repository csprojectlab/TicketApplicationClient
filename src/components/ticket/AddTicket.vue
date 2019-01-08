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
            <v-container fluid fill-height>
                <v-layout justify-center>
                    <v-flex md5>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="green darken-3">
                                <v-toolbar-title><h3 class="display-5">ADD TICKET</h3></v-toolbar-title>
                                <v-spacer></v-spacer>
                                <img width="50" height="50" src="./../../assets/ticket.png" alt="">
                            </v-toolbar>
                            <v-card-text>
                                <v-flex>
                                    <v-form>
                                        <v-combobox label="priority"  :items="priorities" v-model="priority" prepend-icon="label_important">
                                            <template slot="selection" slot-scope="data">
                                                <v-chip :selected="data.selected" class="v-chip--select-multi " >                                       
                                                     <v-avatar class="accent white--text">                                                        
                                                        {{ data.item.slice(0, 1).toUpperCase() }}
                                                     </v-avatar>
                                                    {{ data.item }}
                                                 </v-chip>
                                             </template>
                                        </v-combobox>
                                        <v-combobox label="type"  :items="types" v-model="type" prepend-icon="label_important">
                                            <template slot="selection" slot-scope="data">
                                                <v-chip :selected="data.selected" class="v-chip--select-multi " >                                       
                                                     <v-avatar class="accent white--text">                                                        
                                                        {{ data.item.slice(0, 1).toUpperCase() }}
                                                     </v-avatar>
                                                    {{ data.item }}
                                                 </v-chip>
                                             </template>
                                        </v-combobox>
                                        <v-text-field outline clearable label="message" type="text" v-model="ticketMessage" prepend-icon="message">
                                            <v-fade-transiton slot="append">
                                                <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
                                                <img v-else width="24" height="24" src="./../../assets/logo.png" alt="">
                                            </v-fade-transiton>
                                        </v-text-field>
                                    </v-form>
                                </v-flex>                                
                            </v-card-text>
                            <v-card-actions>                          
                              <v-layout justify-center>
                                  <v-flex>
                                      <v-btn dark color="blue darken-3" @click="$router.push('/dashboard')">
                                          <v-icon left>arrow_back</v-icon> Dashboard</v-btn>
                                      <v-btn dark color="blue darken-3" @click="submitTicket()">
                                          <v-icon left>gavel</v-icon> Raise Ticket
                                      </v-btn>
                                  </v-flex>
                              </v-layout>
                            </v-card-actions>
                        </v-card>                        
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <!-- MODEL SHOWING THE TICKET MODEL -->
        <div class="text-xs-center">
            <v-dialog width="500" v-model="ticketModel">
                <v-progress-circular v-if="!ticketData" size="24" color="info" indeterminate></v-progress-circular>
                <v-card v-else>
                    <v-toolbar dark color="pink accent-3">
                        <v-toolbar-title>ADDED TICKET</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <strong style="color:green">
                        <p>TicketId: {{ticketData.id}}</p>
                        <p>Priority: {{ticketData.priority}}</p>
                        <p>Type: {{ticketData.type}}</p>
                        <p>Message: {{ticketData.message}}</p>
                        <p>Status: {{ticketData.status}}</p>
                        <p>RaisedBy: {{this.$cookie.get('user_name')}}</p>
                        <p>OwnedBy: --</p>
                        </strong>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout align-center>
                            <v-flex>
                                <v-btn dark color="purple darken-3" @click="$router.push('/dashboard')">
                                    <v-icon left>open_in_browser</v-icon> Dashboard</v-btn>
                                <v-btn dark color="green darken-3" @click="ticketModel=false"> 
                                    <v-icon left>gavel</v-icon> Add New Ticket</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <!-- END OF THE TICKET MODEL -->
        <v-snackbar bottom color="error" v-model="snackbar">{{message}}</v-snackbar>
    </v-app>
</template>
<script>
import * as Auth from '@/components/authenticate'
import Authentication from '@/components/authenticate'
import TicketApi from '@/components/ticket'
export default {
    created: function () {
        setTimeout(() => { this.loading = false;}, 5000)
        this.types.sort();
        this.priorities.sort();
    },
    data () {
        return {
            ticketModel: false,
            ticketData: null,   // Ticket that is returned from the database.
            snackbar: false,
            message: '',
            priority: '',
            type: '',
            ticketMessage: '',
            types: ["Software", "Hardware", "Stationary", "Account", "Payment", "Leave", "Installation", "Authorization", "Bottle Required",
                    "Headphone", "PC Malfunction", "Cafeteria Food", "Bus Service", "Employee Complaint", "Finger-print"],
            priorities: ["Normal", "Immediate", "Urgent"],
            loading: true    // This is just for fun.
        }
    },
    methods: {        
        logout: function () {
             Authentication.logout (this, '/login');
        },
        showMessage: function (message) {
            this.snackbar = true;
            this.message = message;
        },
        async submitTicket () {
            if(!this.type || !this.priority || !this.ticketMessage) {
                this.showMessage("ALL FIELDS ARE REQUIRED")
                return;
            }
            let ticket = {};
            ticket.status = "unassigned"; ticket.raisedBy = this.$cookie.get('user_name'); ticket.userId = this.$cookie.get('user_id');
            ticket.type = this.type;  ticket.priority = this.priority; ticket.message = this.ticketMessage;
            let headers = { 'Authorization': Authentication.authenticationHeader(this)}            
            this.ticketModel = true;
            let data = await TicketApi.addNewTicket(this, ticket, headers)
            setTimeout(() => { this.ticketData = data; this.clearFields()}, 3000)
        },
        clearFields: function () {
            this.type = ''; this.priority = ''; this.ticketMessage = '';
        }
    }
}
</script>

