import { axiosInstance } from "./axiosinstance";

export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/register", payload);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/login", payload);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const GetLoggedInUserDetails = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-Logged-in-user");
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const GetAllUsers = async (role) => {
    try {
        const response = await axiosInstance.get(`/api/users/get-all-users/${role}`);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const GetUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/users/get-user-by-id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }

}
