// const { default: axiosInstance } = require("./axios.config")

// const { default: axiosInstance } = require("./axios.config")
import axiosInstance from "./axios.config.js"

export const GET = async (endpoint = "", payload = {}) => {
    try {
        const res = await axiosInstance.get(endpoint, payload)
        return res
    } catch (error) {
        console.log("axios error", error.message)
        return error.response || { status: 500, data: { message: "Network Error" } }
    }
}


export const POST = async (endpoint = "", payload = {}) => {
    try {
        const isFormData = payload instanceof FormData;

        const res = await axiosInstance.post(endpoint, payload, {
            headers: {
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            },
        }
        )
        return res
    } catch (error) {
        console.log("axios error", error.message)
        return error.response || { status: 500, data: { message: "Network Error" } }
    }
}


export const PUT = async (endpoint = "", payload = {}) => {
    try {
        const isFormData = payload instanceof FormData;

        const res = await axiosInstance.put(endpoint, payload, {
            headers: {
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            },
        }
        )
        return res
    } catch (error) {
        console.log("axios error", error.message)
        return error.response || { status: 500, data: { message: "Network Error" } }
    }
}


export const DELETE = async (endpoint = "", payload = {}) => {
    try {
        const res = await axiosInstance.delete(endpoint, payload)
        return res
    } catch (error) {
        console.log("axios error", error.message)
        return error.response || { status: 500, data: { message: "Network Error" } }
    }
}