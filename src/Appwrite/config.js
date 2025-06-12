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
- Created a class that has all Service class( Client, Databases, Storage ) and method and exporting by creating a object
- It has Methods For :
    1. Creating a Post      createPost()
    2. Updating post        updatePost
    3. Deleting a post      deletePost()
    4. To get a single post getPost()
    5. TO get all post      getPosts()
    6. For file Upload      uploadFile()
    7. For deleting a file  deleteFile()
    8. For File Preview     getFilePreview()
--------------------------------------------------------------------------------------------------
*/

// NOTE : Storage service can be created in another file


import { Client, ID, Databases, Storage, Query } from "appwrite";
import En_Variable from '../Environment_Variable/En_Variabe'

export class Service {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(En_Variable.projectEndPoint)
            .setProject(En_Variable.projectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // For creating a post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                En_Variable.databaseId,
                En_Variable.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    // For Updating the post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                En_Variable.databaseId,
                En_Variable.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    // For deleting post
    async deletePost(slug) {
        try {
            const deletePost = await this.databases.deleteDocument(
                En_Variable.databaseId,
                En_Variable.collectionId,
                slug
            )
            return deletePost ? true : false;
        } catch (error) {
            throw error;
        }

    }

    // To get a single post
    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                En_Variable.databaseId,
                En_Variable.collectionId,
                slug
            )
            return post ? post : false
        } catch (error) {
            throw error;
        }
    }

    // To get all post 
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const posts = await this.databases.listDocuments(
                En_Variable.databaseId,
                En_Variable.collectionId,
                queries
            )
            return posts ? posts : false;
        } catch (error) {
            throw error
        }
    }

    // File upload service 
    async uploadFile(file) {
        try {
            const uploadFile = await this.storage.createFile(
                En_Variable.bucketId,
                ID.unique(),
                file
            )
            return uploadFile ? uploadFile : false;
        } catch (error) {
            throw error
        }
    }

    // Delete File
    async deleteFile(fileId) {
        try {
            const deleteFile = await this.storage.deleteFile(
                En_Variable.bucketId,
                fileId
            )
            return deleteFile ? deleteFile : false
        } catch (error) {
            throw error
        }
    }

    // For file preview
    getFilePreview(fileId) {
        return this.storage.getFileView(
            En_Variable.bucketId,
            fileId
        )
    }

}

const service = new Service();
export default service;