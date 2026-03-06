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
		origin: [
			"https://ryan-portfolio-lilac.vercel.app",
			"http://localhost:5173",
		],
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

		console.log("🔍 Searching for:", query); // ADD THIS

		const { data, error } = await supabase.rpc("match_embeddings", {
			query_embedding: queryEmbedding,
			match_threshold: 0.5,
			match_count: limit,
		});

		if (error) {
			console.error("❌ Supabase RPC error:", error);
			return [];
		}

		console.log("✅ Found contexts:", data?.length || 0); // ADD THIS
		console.log("📝 Context preview:", data?.slice(0, 2)); // ADD THIS

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
			content: `
You are a helpful AI assistant representing Ryan Rodriguez, a Frontend Developer.

Answer questions about skills, projects, and experience using ONLY the provided context.

Formatting rules:
- Return HTML only.
- Use <strong> for project titles and key skills.
- Keep responses concise for chat bubbles.
- Do NOT use headings (<h1>, <h2>, etc.) or <ul>/<li>.

Project rules:
- Always start with the project title as listed in the context, wrapped in <strong> tags.
- Then provide a short description of the project.
- Include links if present.
- Do NOT invent project titles or paraphrase them.
- If multiple projects match, list each with title in <strong>.

Context:
${contextPrompt}
  `,
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
