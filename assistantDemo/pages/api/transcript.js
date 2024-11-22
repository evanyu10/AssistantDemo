// pages/api/transcript.ts

"use server"

import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const formData = req.body;

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: "OPENAI_API_KEY is not defined" });
        }

        const file = formData.get("audio");
        if (!file || file.size === 0) {
            return res.status(400).json({ error: "Audio file is empty" });
        }

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await client.audio.transcriptions.create({
            file,
            model: "whisper-1",
        });

        console.log("RESPONSE:", result.text);
        return res.status(200).json({ text: result.text });
    } catch (error) {
        console.error("Error during transcription:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
