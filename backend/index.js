import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY,
);

app.use(
	cors({
		origin: ["https://portflolio-backend.vercel.app/", "http://localhost:5173"],
	}),
);
app.use(express.json());

async function findRelevantContext(query, limit = 5) {
	try {
		const embeddingResponse = await openai.embeddings.create({
			model: "text-embedding-3-small",
			input: query,
		});

		const queryEmbedding = embeddingResponse.data[0].embedding;

		const { data, error } = await supabase.rpc("match_embeddings", {
			query_embedding: queryEmbedding,
			match_threshold: 0.5,
			match_count: limit,
		});

		if (error) {
			console.error("Supabase RPC error:", error);
			return [];
		}

		return data.map((row) => row.content);
	} catch (error) {
		console.error("Error creating embedding:", error);
		return [];
	}
}

app.post("/api/chat", async (req, res) => {
	try {
		const { messages } = req.body;

		if (!messages || !Array.isArray(messages)) {
			return res.status(400).json({ error: "Messages are required" });
		}

		const lastMessage = messages.filter((msg) => msg.role === "user").pop();

		let contextPrompt = "";

		if (lastMessage) {
			const relevantContext = await findRelevantContext(lastMessage.content);

			if (relevantContext.length > 0) {
				contextPrompt = `\n\nRelevant information:\n${relevantContext.join("\n")}`;
			}
		}

		const systemMessage = {
			role: "system",
			content: `You are a helpful assistant representing Ryan Rodriguez, a Frontend Developer. Answer questions about Ryan's skills, projects, and experience using the provided context. Be conversational and professional.${contextPrompt}`,
		};

		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [systemMessage, ...messages],
			temperature: 0.7,
			max_tokens: 500,
		});

		res.json({
			response: completion.choices[0].message.content,
			usage: completion.usage,
		});
	} catch (error) {
		console.error("Error handling chat request:", error);
		res
			.status(500)
			.json({ error: "Internal server error", details: error.message });
	}
});

app.get("/api/health", (req, res) => {
	res.json({ status: "ok" });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
