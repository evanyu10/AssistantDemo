import OpenAI from 'openai';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { input } = req.body;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: 'user', content: input },
                ],
            });

            const botMessage = response.choices[0].message.content;
            res.status(200).json({ botMessage });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
