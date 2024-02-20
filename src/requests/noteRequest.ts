import axios from "axios"

import { API_BASE_URL } from "../config/serverApiConfig"

import type { INote } from "../pages/Home/types/noteTypes"
import type { AxiosResponse } from "axios"

axios.defaults.baseURL = API_BASE_URL

const noteRequest = {
    get: async (): Promise<INote[]> => {
        try {
            const response: AxiosResponse<INote[]> = await axios.get("/notes")
            return response.data
        } catch (error) {
            console.log("error: ", error)
            throw error
        }
    },
}

export default noteRequest
