/*
------------------------------------------------------------------
IMP : IF Using any other database like monogo, php, next.js,etc.
- Change the constructor
- Keep the method and parameters same only change the what's inside 
------------------------------------------------------------------
*/
/*
--------------------------------------------------------------------------------------------------
What's Happening :
- Created a class that has all authentication class( Client, Account ) and method and exporting by creating a object
- It has Methods For :
    1. creating a account                       createAccount()
    2. Login into the account                   login()
    3. checking if user has created a account   getCurrentUser()
    4. For login out on all devices             logout()
--------------------------------------------------------------------------------------------------
*/

import { Client, Account, ID } from "appwrite";
import En_Variable from '../Environment_Variable/En_Variabe'

export class AuthService {
    client = new Client();
    account;
    // TO reduce waste we are setting varible and calling account inside constructor
    constructor() {
        this.client
            .setEndpoint(En_Variable.projectEndPoint)
            .setProject(En_Variable.projectId);
        this.account = new Account(this.client)
    }

    // For signUp
    async createAccount({ email, password, name }) {
        try {
            const userData = await this.account.create(ID.unique(), email, password, name);
            if (userData) {
                // calling the login method 
                return this.login({ email, password })
            }
            else {
                return userData;
            }
        } catch (error) {
            throw error
        }
    }

    // For Login
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    // For checking if user has created a account
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error;
        }
        return null;
    }

    // For logout
    async logout() {
        try {
            this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}


const authService = new AuthService();
export default authService