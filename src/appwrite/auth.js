import { Account, Client, ID } from "appwrite";
import conf from "../conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, username }) {
    try {
      const userInfo = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
      if (userInfo) {
        return this.login({ email, password });
      } else {
        return userInfo;
      }
    } catch (error) {
      console.log("error in createAccount!", error);
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("error in login");
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("error in get current user");
      throw error;
    }
    return null;
  }
  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }

  loginWithGoogle = () => {
    try {
    const hel =   this.account.createOAuth2Session(
        "google",
        "http://localhost:5173",
       'http://localhost:5173/fail',
    )
      console.log(hel);
      
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };
  
  
}

const authService = new AuthService();
export default authService;
