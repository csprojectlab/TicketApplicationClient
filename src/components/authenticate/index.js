import Api_login from '@/api/loginApi'
import Reg_Api from '@/api/registerApi'

export default {
    user: { authenticated: false, admin: false},    

    /** 
     *  REGISTER A NEW USER.
     */
    async register (context, credentials, redirect) {
        try {
            const {data} = await Reg_Api.register (credentials)
            context.$router.push(redirect)
        } catch (error) {
            context.showMessage("INVALID CREDENTIALS || CREDENTIALS NOT UNIQUE")
        }
    },

    /**
     * AUTHENTICATE THE CREDENTIALS.
     */
    async authenticate (context, credentials, redirect) {
        try {        
            const {data} = await Api_login.authenticate(credentials) 
            context.$cookie.set('token', data.token, '1D')
            context.$cookie.set('user_id', data.user.id, '1D') 
            context.$cookie.set('user_name', data.user.username, '1D')
            context.$cookie.set('user_email', data.user.email, '1D')
            this.user.authenticated = true;
            this.user.admin = data.user.admin
            context.showMessage("LOGIN SUCCESSFULL. REDIRECTING TO DASHBOARD.");
            setTimeout(() => { context.$router.push(redirect)}, 2000);
        } catch (error) {            
            context.showMessage("INVALID USERNAME AND PASSWORD")
        }
    },

    /**
     * LOGOUT THE USER.
     */
    logout (context, redirect) {
        context.$cookie.delete('token')
        context.$cookie.delete('user_id')
        context.$cookie.delete('user_name')
        context.$cookie.delete('user_email')
        this.user.authenticated = false;
        this.user.admin = false;
        if(redirect) {
            context.showMessage ("REDIRECTING TO THE LOGIN PAGE...");
            setTimeout (() => {
                context.$router.push('/login')
            }, 2000);
        }
    },

    /**
     * GET THE HEADER.
     */
    authenticationHeader (context) {
        return `Bearer ${context.$cookie.get('token')}`
    }
}