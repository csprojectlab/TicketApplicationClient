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
   </v-app>
</template>
<script>
export default {
    created: function () {
        if(localStorage.getItem('t')) {
            
        }
    }
}
</script>

