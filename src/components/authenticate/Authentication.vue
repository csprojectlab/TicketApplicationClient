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
                      @click="registerModel=true"
                >
                <v-icon>person_add</v-icon>
                </v-btn>
                <span>Register</span>
          </v-tooltip>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center>
                    <v-flex md6>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="pink accent-3">
                                <v-toolbar-title>LOGIN FORM</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-tooltip bottom>
                                    <v-btn slot="activator" icon large>
                                        <v-icon>person_outline</v-icon>
                                    </v-btn>
                                    <v-span>source</v-span>
                                </v-tooltip>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field label="username" prepend-icon="person" type="text"
                                        :rules="[() => credentials.username.length > 0 || 'Required field']" v-model="credentials.username"></v-text-field>
                                    <v-text-field label="secret" prepend-icon="lock" type="password"
                                        :rules="[() => credentials.password.length > 0 || 'Required field']" v-model="credentials.password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-layout col>
                                    <v-flex xs6><v-btn @click="submitAuthentication()" class="button-1" color="pink accent">Login</v-btn></v-flex>
                                    <v-flex xs6><v-btn @click="credentials.username=''; credentials.password=''" color="error">clear</v-btn></v-flex>
                                </v-layout>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <!-- REGISTER MODEL -->
        <div class="text-xs-center">
            <v-dialog v-model="registerModel" width=500>
                <v-card>
                    <v-toolbar dark color="pink accent-3">
                        <v-toolbar-title>REGISTER</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon>group_add</v-icon>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="username" prepend-icon="face" type="text" v-model="regData.username"
                                :rules="[() => regData.username.length > 0 || 'Required field']"></v-text-field>
                            <v-text-field label="secret" prepend-icon="lock" type="password" v-model="regData.password"
                                :rules="[() => regData.password.length > 0 || 'Required field']"></v-text-field>
                            <v-text-field label="email" prepend-icon="email" type="email" v-model="regData.email"
                                :rules="[() => regData.email.length > 0 || 'Required field']"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn dark @click="registerModel=false;regData.username='';regData.password='';regData.email=''" color="error">
                            <v-icon dark left>arrow_back</v-icon>Back
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn dark color="pink accent-3" @click="submitRegistration()">
                            <v-icon dark left>add_circle</v-icon>Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <!-- END OF REGISTER MODEL -->
        <v-snackbar v-model="snackbar" color="error" bottom>
            {{message}}
        </v-snackbar>
    </v-app>
</template>
<script>
import Authentication from '@/components/authenticate'
export default {
    data () {
        return {
            registerModel: false,
            message: '',
            snackbar: false,
            credentials: {username: '', password: ''},
            regData: { username: '', password: '', email: ''}
        }
    },
    methods: {
        async submitAuthentication () {
            if(this.credentials.username == '' || this.credentials.password == '') {
               this.showMessage('PROVIDE COMPLETE CREDENTIALS');
                return;
            }
            await Authentication.authenticate(this, this.credentials, '/dashboard')            
        },

        async submitRegistration () {
            if(this.regData.username == '' || this.regData.password == '' || this.regData.email == '') {
               this.showMessage("PROVIDE COMPLETE REGISTRATION CREDENTIALS.");
                return;
            }
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(this.regData.email)) {
               this.showMessage("PROVIDED EMAIL IS NOT VALID.");
                return;
            }
            await Authentication.register(this, this.regData, '/login')
            this.registerModel = false;
            this.showMessage("REGISTRATION SUCCESSFULL. YOU CAN LOGIN NOW.")
        },

        showMessage (errorMessage) {
            this.snackbar = true;
            this.message = errorMessage
        }


    }
}
</script>
<style scoped>
.button-1:hover {
  color: green 
}
</style>

