import { axiosInstance } from "./axiosinstance";

export const issueBook = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/issues/issue-new-book",payload);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const GetIssues = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/issues/get-issues",payload);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const ReturnBook = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/issues/return-book",payload);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const EditIssue = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/issues/edit-issue",payload);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const DeleteIssues = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/issues/delete-issue",payload);
        return response.data;
    } catch (error) {
        throw error;
    }

}