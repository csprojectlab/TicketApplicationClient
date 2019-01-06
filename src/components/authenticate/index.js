import * as Api_login from './../../api/loginApi'

export default {
    user: { authenticated: false},

    /**
     * AUTHENTICATE THE CREDENTIALS.
     */
    async authenticate (context, credentials, redirect) {
        try {
            const {data} = Api_login.authenticate(credentials)
        } catch (error) {

        }
    },

    /**
     * LOGOUT THE USER.
     */
    logout (context, redirect) {

    },

    /**
     * GET THE HEADER.
     */
    authenticationHeader (context) {

    }
}