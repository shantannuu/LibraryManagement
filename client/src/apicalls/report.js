import { axiosInstance } from "./axiosinstance";

export const GetReports = async () => {
    try {
        const response = await axiosInstance.get("/api/reports/get-reports");
        
        return response.data;
    } catch (error) {
        throw error;
    }

}