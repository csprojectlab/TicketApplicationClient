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
                    <v-flex xs10>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="green darken-3">
                                <v-toolbar-title><strong><h3 class="display-1">TICKET DATABASE</h3></strong></v-toolbar-title>
                                <v-spacer></v-spacer>
                                <img width="50" height="50" src="./../../assets/ticket.png" alt="">
                            </v-toolbar>
                            <v-card-text>
                                <v-data-table class="elevation-5" :loading="false" :headers="headers" :items="ticketData">
                                    <template slot="no-data">
                                        <v-alert :value="true" color="error" icon="warning">NO TICKETS RAISED BY NOW</v-alert>
                                    </template>
                                    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                                    <template slot="items" slot-scope="props">
                                        <td class="text-xs-left">{{ props.item.ticketId }}</td>
                                        <td class="text-xs-left">
                                            <v-chip :selected="props.item.type" class="v-chip--select-multi ">
                                                <v-avatar class="accent white--text">
                                                    {{ props.item.type.slice(0, 1).toUpperCase() }}
                                                </v-avatar>
                                                {{ props.item.type }}
                                            </v-chip>
                                        </td>
                                        <td class="text-xs-left">{{ props.item.priority }}</td>
                                        <td class="text-xs-left">{{ props.item.status }}</td>
                                        <td class="text-xs-left">{{ props.item.message }}</td>
                                        <td class="text-xs-left">{{ props.item.ownedBy }}</td>
                                        <td class="text-xs-left"><v-btn>Own</v-btn></td>
                                    </template>
                                </v-data-table>    
                            </v-card-text>                          
                        </v-card>    
                    </v-flex>    
                </v-layout>           
        </v-content>
    </v-app>
</template>
<script>
export default {
    data () {
        return {
            headers: [{ text: 'TicketId', value: 'ticketId'}, 
                      {text: "Type", sortable: false, value: 'type'}, 
                      { text: "Priority", sortable: false, value: 'priority'}, 
                      { text: "Status", sortable: false, value: 'status'}, 
                      { text: 'Message', sortable: false, value: 'message'}, 
                      { text: "OwnedBy", sortable: false, value: 'ownedBy'}, 
                      { text: 'Own', sortable: false}
                      ],
            ticketData: [{ ticketId: 14, type: 'Hardware', priority: 'Urgent', status: 'unassigned', message: 'Do it fast', ownedBy: '-'}]

        }
    }
    
}
</script>

