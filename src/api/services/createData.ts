import apiClient from "../apiClient";

export const createData = async <T>(url: string, data: T): Promise<T> => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //     throw new Error("Unauthorized");
    // }

    try {
        const response = await apiClient.post<T>(url, data, {
            headers: {
                // "x-auth-token": token,
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`An error occurred while creating data: ${error}`);
    }
};
