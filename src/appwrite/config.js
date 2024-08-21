import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL) // Your API Endpoint
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }
    //we are using slug instead of unique id


    async createPost({ title,slug, content, image, status, userId,username,createdAt }) {
        try {
            const createdAt = new Date().toISOString();
            return await this.databases.createDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                slug,
                { title, content, image, status, userId,username,createdAt }

            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    

    async updatePost(slug, { title, content, image, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                slug,
                { title, content, image, status }
            )

        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            throw error
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                slug,
               
            )
        } catch (error) {
            throw error
        }
    }

    async allPost() {
        try {
            return this.databases.listDocuments(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                [
                    Query.equal("status", "active"),
                    
                ]
            )
        } catch (error) {
            throw error
        }
    }
    async searchallPost(searchQuery) {
        try {
            return this.databases.listDocuments(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                [
                    Query.equal("status", "active"),
                    Query.search("title",searchQuery)
                    
                ]
            )
        } catch (error) {
            throw error
        }
    }
    async alluserPost(userId) {
        try {
            return this.databases.listDocuments(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                [
                    Query.equal("userId", userId)
                ]
            )
        } catch (error) {
            throw error
        }
    }

    async userProfile(username) {
        try {
            return this.databases.listDocuments(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                [
                    Query.equal("username", username),
                    Query.equal("status", "active"),

                ]
            );
        } catch (error) {
            throw error;
        }
    }
    

    //file upload service
    async uploadFile(file) {
        try { 
            // if (!(file instanceof File))
            return this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file,
                
            )
        } catch (error) {
            throw error
        }
    }
    async deleteFile(fileId) {
        try {
            return this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
        } catch (error) {
            throw error
        }
    }
    getfilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }


}


const service = new Service()
export default service

