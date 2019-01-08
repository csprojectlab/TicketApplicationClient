<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="error">
            <v-toolbar-title><strong><h5>USER DETAILS</h5></strong></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>person</v-icon>
        </v-toolbar>
        <v-card class="elevation-12">
        <v-card-text color="red" style="align:left">
             <v-chip :selected="$cookie.get('user_email')"  class="v-chip--select-multi ">
                <v-avatar class="accent white--text"> E</v-avatar>
                Email: {{ $cookie.get('user_email') }}
            </v-chip> 
            <v-chip :selected="$cookie.get('user_name')"  class="v-chip--select-multi ">
                <v-avatar class="accent white--text"> {{ $cookie.get('user_name').slice(0,1).toUpperCase() }}</v-avatar>
                {{ $cookie.get('user_name') }}
            </v-chip>  <br>
            <v-chip :selected="$cookie.get('user_id')"  class="v-chip--select-multi ">
                <v-avatar class="accent white--text"> U</v-avatar>
                UserId: {{ $cookie.get('user_id') }}
            </v-chip>                          
        </v-card-text>
        </v-card>
    </v-card>
</template>
<script>
export default {
    
}
</script>

