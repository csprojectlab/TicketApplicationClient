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
            <v-layout justify-center>
                <v-flex xs5>
                    <v-card class="elevation-5">
                        <v-toolbar dark color="red">
                            <v-toolbar-title><strong><h5 class="display-1">#TicketID: {{ this.ticketDetails.id }}</h5></strong></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <img width="50" height="50" src="./../../assets/ticket.png" alt="">
                        </v-toolbar>
                        <v-card-text>
                            <v-layout justify-center row wrap>
                               <v-flex xs12><strong><h2 style="color:black">RaisedBy: {{ ticketDetails.raisedBy.toUpperCase() }}</h2></strong></v-flex>
                               <v-flex xs12><strong><h2 style="color:black">Type: {{ ticketDetails.type.toUpperCase() }}</h2></strong></v-flex>
                               <v-flex xs12><strong><h2 style="color:black">Priority: {{ ticketDetails.priority.toUpperCase() }}</h2></strong></v-flex>
                               <v-flex xs12><strong><h2 style="color:black">Message: {{ ticketDetails.message.toUpperCase() }}</h2></strong></v-flex>
                               <v-flex xs12>
                                   <v-list two-line>
                                       <template v-for="(commentData, index) in commentList">
                                           <v-list-tile :key="index" avatar ripple>
                                               <v-list-tile-avatar>
                                                   <v-icon color="green">message</v-icon>
                                               </v-list-tile-avatar>
                                               <v-list-tile-content>
                                                   <v-list-tile-title><strong style="color:purple">{{ commentData.author.toUpperCase() }}</strong></v-list-tile-title>
                                                   <v-list-tile-sub-title>{{ commentData.comment }}</v-list-tile-sub-title>
                                               </v-list-tile-content>
                                               <v-list-tile-action>
                                                   <v-list-tile-action-text>{{ commentData.date }}</v-list-tile-action-text>
                                                   <v-icon color="grey lighten-1">star_border</v-icon>
                                               </v-list-tile-action>
                                           </v-list-tile>
                                           <v-divider v-if="index + 1 < commentList.length" :key="`divider-${index}`"></v-divider>
                                       </template>
                                   </v-list>
                               </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs5 pl-5>
                    <v-card class="elevation-5">
                        <v-toolbar dark color="green">
                            <v-toolbar-title><strong><h5 class="display-1">Add Comment</h5></strong></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon>message</v-icon>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field outline clearable label="comment" type="text" prepend-icon="message" v-model="comment">
                                    <v-fade-transition slot="append">
                                        <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
                                        <img v-else width="24" height="24" src="./../../assets/logo.png" alt="">
                                    </v-fade-transition>
                                </v-text-field>
                                <v-btn dark color="primary" @click="submitComment()">add comment</v-btn>
                            </v-form>
                        </v-card-text>                        
                    </v-card><br>
                    <v-btn dark color="purple darken-3" @click="$router.push('/viewticket')">
                        <v-icon left>arrow_back</v-icon> back</v-btn>                   
                </v-flex>
            </v-layout>
        </v-content>
        <v-snackbar bottom color="error" v-model="snackbar"> {{ message }} </v-snackbar>
   </v-app>
</template>
<script>
import Authentication from '@/components/authenticate'
import CommentApi from '@/components/ticket'
export default {
    created: async function () {
        if(localStorage.getItem('t')) {
            this.ticketDetails = JSON.parse(localStorage.getItem('t'));   // GET THE TICKET FROM THE LOCALSTORAGE            
            // localStorage.removeItem('t');
        }
        setTimeout(() => { this.loading = false }, 3000)
        this.getComments();
    },
    data () {
        return {
            snackbar: false,
            message: '',
            ticketDetails: null,
            comment: '',
            commentList: [],
            loading: true       // Just for fun.
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
        async getComments () {
            let headers = { 'Authorization': Authentication.authenticationHeader(this)}
            this.commentList = await CommentApi.getComments(this.ticketDetails.id, headers);
            console.log(this.commentList)
        },
        async submitComment () {
            if(!this.comment) {
                this.showMessage ("COMMENT FIELD IS EMPTY");
                return;
            }
            let commentData = {
                ticketId: this.ticketDetails.id,
                author: this.$cookie.get('user_name'),
                comment: this.comment
            };
            let headers = { 'Authorization': Authentication.authenticationHeader(this)}
            await CommentApi.addComment(commentData, headers)
            this.comment = ''; 
            this.getComments ();
        }
    }
}
</script>

