import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;

    constructor(){
       this.client
       .setEndpoint(conf.appwriteURL) // Your API Endpoint
       .setProject(conf.appwriteProjectID);  
       this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){

        try {
          const userAccount= await this.account.create(ID.unique(),email,password,name)
          if (userAccount) {
            //calling another method
            //agr user ka acc ban gya hai toh usy direct login krwa do
            return this.login({email,password})

          } else {
            
            return userAccount;
          }
        } catch (error) {
            throw error;
        }
    }
async login({email,password}){
    try {
        return await this.account.createEmailPasswordSession(email,password)
        
    } catch (error) {
        throw error
    }
}

async logout(){
    try {
        return this.account.deleteSessions()
    } catch (error) {
        throw error
    }
    
}
async getloggedinuser(){
    try {
        return await this.account.get()
        
    } catch (error) {
        // throw error
        console.log("error is ",error)
    }
    return null;
}

}

//object so that whoever imports it can get the access of the methods inside it
const authservice= new AuthService()
export default authservice