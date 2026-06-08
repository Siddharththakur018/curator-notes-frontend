import axiosClient from "@/client/axios";

export const aiAssist = async(payload: {
    action: "extract" | "summarize" | "improve",
    text: string
}) => {
    const response = await axiosClient.post("/gemini/assist", payload)

    return response.data
}