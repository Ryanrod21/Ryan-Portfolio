import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY,
);

app.use(cors());
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
