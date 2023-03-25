import { axiosInstance } from "./axiosinstance";

export const addBook = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/books/add-book", payload);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const GetAllBooks = async () => {
    try {
        const response = await axiosInstance.get("/api/books/get-all-books");
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const editBook = async (payload) => {
    try {
        const response = await axiosInstance.put(`/api/books/update-book/${payload._id}`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const deleteBook = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/books/delete-book/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const getBookById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/books/get-book-by-id/${id}`);
        
        return response.data;
        
    } catch (error) {
        throw error;
    }

}

export const searchBook = async (key) => {
    try {
        const response = await axiosInstance.get(`/api/books/search-book/${key}`);
        
        return response.data;
        
    } catch (error) {
        throw error;
    }

}