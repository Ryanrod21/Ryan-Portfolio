import dotenv from "dotenv";
import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";
import { skillsData, skillsData2 } from "../data/SkillsData.js";
import { portfolioData } from "../data/PortfolioData.js";

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function createPortfolioChunks() {
	return portfolioData.map((project) => {
		const chunk = `Project: ${project.title}. Description: ${project.description}. Link: ${project.link ? `Link: ${project.link}` : ""} ${project.gitLink ? `GitHub: ${project.gitLink}` : ""} `;
		return {
			content: chunk,
			metadata: {
				type: "project",
				title: project.title,
				link: project.link || null,
				gitLink: project.gitLink || null,
			},
		};
	});
}

function createSkillsChunks() {
	const chunks = [];

	skillsData.forEach((skill) => {
		chunks.push({
			content: `Technical Skill: ${skill.skill}. Ryan has expertise in ${skill.skill}.`,
			metadata: {
				type: "technical_skill",
				skill: skill.skill,
			},
		});
	});

	skillsData2.forEach((service) => {
		chunks.push({
			content: `Service: ${service.skill}. ${service.skillDescription}`,
			metadata: {
				type: "service",
				skill: service.skill,
			},
		});
	});

	return chunks;
}

function createBioChunks() {
	return [
		{
			content: `Ryan Rodriguez is a Frontend Developer specializing in React, JavaScript, Next.js, and HubSpot CMS development. He builds modern, user-friendly websites and web applications.`,
			metadata: { type: "bio", category: "introduction" },
		},
		{
			content: `Ryan has extensive experience working with HubSpot CMS, creating custom modules, implementing interactive animations, and optimizing websites for performance and SEO.`,
			metadata: { type: "bio", category: "expertise" },
		},
		{
			content: `Ryan has built AI-powered applications including ScrubbedIn (learning platform for nursing students) and an AI Finance Analyzer Dashboard using OpenAI APIs, React, and modern backend technologies.`,
			metadata: { type: "bio", category: "ai_experience" },
		},
	];
}

async function generateEmbedding(text) {
	const response = await openai.embeddings.create({
		model: "text-embedding-3-small",
		input: text,
	});
	return response.data[0].embedding;
}

async function storeEmbedding(content, embedding, metadata) {
	const { data, error } = await supabase
		.from("embeddings")
		.insert({ content, embedding, metadata });
	if (error) {
		console.error("Error storing embedding:", error);
	}
	return data;
}

async function prepareAllEmbeddings() {
	console.log("Starting embedding preparation...");

	//Combine all chunks
	const allChunks = [
		...createPortfolioChunks(),
		...createSkillsChunks(),
		...createBioChunks(),
	];

	console.log(`Total chunks to process: ${allChunks.length}`);

	//Process each chunk sequentially to avoid rate limits
	for (let i = 0; i < allChunks.length; i++) {
		const chunk = allChunks[i];
		console.log(
			`Processing ${i + 1}/${allChunks.length}: ${chunk.metadata.type}`,
		);

		try {
			//Generate embedding
			const embedding = await generateEmbedding(chunk.content);

			//Store in Supabase
			await storeEmbedding(chunk.content, embedding, chunk.metadata);
		} catch (error) {
			console.error(`Error processing chunk ${i + 1}:`, error);
		}
	}
	console.log("Embedding preparation completed.");
}

// Run the preparation script
prepareAllEmbeddings().catch(console.error);
