import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GenerationConfig, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { toast } from '@utils/toast';

const gemini_api_key = process.env.EXPO_PUBLIC_OPENAI_API_KEY || "";
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig: GenerationConfig = {
    temperature: 0.5,
    topP: 1,
    topK: 1,
    maxOutputTokens: 1024,

};

const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: geminiConfig,
    safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
    ],
});

const useChat = () => {
    const taoMoTaSanPham = async (tenSanPham: string) => {
        try {
            const prompt = `Tạo một mô tả sản phẩm ${tenSanPham}`;
            const result = await geminiModel.generateContent(prompt);
            const response = result.response;
            return response.text()?.replaceAll("*", "");
        } catch (error) {
            console.log("response error", error);
            toast("Có lỗi xảy ra, vui lòng thử lại")
            return ""
        }
    }

    return {
        taoMoTaSanPham
    }
}

export default useChat