// 1. Import needed functions
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../Appwrite/config";
import { Query } from "appwrite";

// 2. Async thunk to fetch posts
// For fetaching all post
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (thunkAPI) => {
    try {
        const posts = await service.getPosts();
        return posts.documents;
    } catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong");
    }
});

// For getting a single post
export const fetchPost = createAsyncThunk("posts/fetchPost", async (slug, thunkAPI) => {
    try {
        const post = await service.getPost(slug);
        return post;
    } catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong");
    }
});

// for updating post
export const updatePost = createAsyncThunk("post/updatePost", async ({ slug, updatedData }, thunkAPI) => {
    try {
        const response = await service.updatePost(slug, updatedData);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue("Could not update the post");
    }
});

// For deleting post
export const deletePost = createAsyncThunk('post/deletePost', async (slug, thunkAPI) => {
    try {
        if (slug) {
            await service.deletePost(slug)
            return slug;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong");
    }
})

// For uploading file
export const uploadFile = createAsyncThunk("posts/uploadFile", async (file, thunkAPI) => {
    try {
        const response = await service.uploadFile(file);
        return response; // Typically returns fileId or file metadata
    } catch (error) {
        return thunkAPI.rejectWithValue("Could not upload file");
    }
});


// For all user post
export const fetchUserPosts = createAsyncThunk("posts/fetchUserPosts", async (userId, thunkAPI) => {
    try {
        const queries = [Query.equal("userId", userId)]
        const posts = await service.getPosts(queries);
        return posts.documents;
    } catch (error) {
        return thunkAPI.rejectWithValue("Could not fetch user posts");
    }
});

// for deleting file
export const deleteFile = createAsyncThunk("posts/deleteFile", async (fileId, thunkAPI) => {
    try {
        await service.deleteFile(fileId);
        return fileId;
    } catch (error) {
        return thunkAPI.rejectWithValue("Could not delete file");
    }
});


// 3. Post slice
const postSlice = createSlice({
    name: "posts", // was missing quotes
    initialState: {
        posts: [],
        userPost: [],
        error: '',
        loading: false,
    },
    reducers: {
        // You can add other synchronous reducers here
    },
    extraReducers: (builder) => {
        builder
            // For fetching all post
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // for fetching a single post
            .addCase(fetchPost.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // For Deleting post
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.$id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.error = action.payload;
            })
            // For fetching all user post
            .addCase(fetchUserPosts.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.userPost = action.payload;
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // For updating post
            .addCase(updatePost.pending, (state, action) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const updated = action.payload;
                state.posts = state.posts.map((post) =>
                    post.$id === updated.$id ? updated : post
                );
                state.loading = false;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // For uploading file
            .addCase(uploadFile.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally store uploaded file ID or info if needed
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // For deleting file (no UI state needed in most cases)
            .addCase(deleteFile.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

// 4. Export
export default postSlice.reducer;
