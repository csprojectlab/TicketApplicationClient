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
                            <v-text-field label="username" prepend-icon="face"
                                :rules="['Required field']"></v-text-field>
                            <v-text-field label="secret" prepend-icon="lock"
                                :rules="['Required field']"></v-text-field>
                            <v-text-field label="email" prepend-icon="email"
                                :rules="['Required field']"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn dark @click="registerModel=false" color="error">
                            <v-icon dark left>arrow_back</v-icon>Back
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn dark color="pink accent-3">
                            <v-icon dark left>add_circle</v-icon>Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <v-snackbar v-model="snackbar" color="error" bottom>
            {{message}}
        </v-snackbar>
    </v-app>
</template>
<script>
export default {
    data () {
        return {
            registerModel: false,
            message: '',
            snackbar: false,
            credentials: {username: '', password: ''}
        }
    },
    methods: {
        submitAuthentication () {
            if(this.credentials.username == '' || this.credentials.password == '') {
                this.snackbar = true;
                this.message = 'PROVIDE COMPLETE CREDENTIALS'
                return;
            }
            
        }
    }
}
</script>

