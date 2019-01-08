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
        <v-jumbotron>
            <v-container fill-height style="background-color:white">
                <v-layout align-center>
                    <v-flex>                       
                        <h3 class="display-3" style="color:purple">WELCOME TO THE SITE</h3>
                        <span class="subheading">Ticket application allows users to raise tickets as per their issues. Tickets can be
                            added or viewed by the user. A user can post comments on the ticket and wait for it to be processed by an
                            admin user. Admin user changes the status of the ticket from unassigned to assigned and responds to the
                            corresponding user to solve the issue.
                        </span>
                        <v-divider class="my-3"></v-divider>
                        <div class="title mb-3" v-if="!isAdmin"><strong>CHOOSE OPTION</strong></div>
                        <div>
                            <v-btn dark color="purple darken-3" @click="$router.push('/addticket')" v-if="!isAdmin">
                             <v-icon left>add_circle_outline</v-icon>Add Ticket</v-btn>
                            <v-btn dark color="green darken-3" @click="$router.push('/viewticket')">
                                <v-icon left>view_headline</v-icon> View Tickets</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-jumbotron>
        <v-container style="background-color:white">
             <img src="./../../assets/ticket.png" alt="">
        </v-container>
        <v-snackbar bottom color="error" v-model="snackbar">
            {{message}}
        </v-snackbar>
    </v-app>
</template>
<script>
import * as Auth from '@/components/authenticate'
import Authentication from '@/components/authenticate'
export default {   
    data () {
        return {
            isAdmin: Auth.default.user.admin,
            snackbar: false,
            message: ''
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

