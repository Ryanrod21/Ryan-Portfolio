import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import { skillsData, skillsData2 } from '../data/SkillsData.js';
import { portfolioData } from '../data/PortfolioData.js';

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
    // ENRICHED: Build semantically rich text for embedding
    const enrichedText = `
Project: ${project.title}
Portfolio Work: ${project.title}
Web Development Project: ${project.title}
Frontend Development: ${project.title}

Description: ${project.description}

Ryan Rodriguez built this project.
Ryan developed ${project.title}.
This is a web development project by Ryan.
Ryan's portfolio includes ${project.title}.

Technologies and features: ${project.description}

${project.link ? `Live website available at ${project.link}` : ''}
${project.git ? `Source code repository at ${project.git}` : ''}
    `.trim();

    // DISPLAY: Build clean description for showing to users
    let displayContent = `Ryan built ${project.title}, which is ${project.description}`;

    if (project.link) {
      displayContent += ` You can view it at ${project.link}.`;
    }
    if (project.git) {
      displayContent += ` The source code is available at ${project.git}.`;
    }

    return {
      content: displayContent, // What users see in chat
      embeddingText: enrichedText, // What gets converted to vector
      metadata: {
        type: 'project',
        title: project.title,
        link: project.link || null,
        gitLink: project.git || null,
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
        type: 'technical_skill',
        skill: skill.skill,
      },
    });
  });

  skillsData2.forEach((service) => {
    chunks.push({
      content: `Service: ${service.skill}. ${service.skillDescription}`,
      metadata: {
        type: 'service',
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
      metadata: { type: 'bio', category: 'introduction' },
    },
    {
      content: `Ryan has extensive experience working with HubSpot CMS, creating custom modules, implementing interactive animations, and optimizing websites for performance and SEO.`,
      metadata: { type: 'bio', category: 'expertise' },
    },
    {
      content: `Ryan has built AI-powered applications including ScrubbedIn (learning platform for nursing students) and an AI Finance Analyzer Dashboard using OpenAI APIs, React, and modern backend technologies.`,
      metadata: { type: 'bio', category: 'ai_experience' },
    },
  ];
}

async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

async function storeEmbedding(content, embedding, metadata) {
  const { data, error } = await supabase
    .from('embeddings')
    .insert({ content, embedding, metadata });
  if (error) {
    console.error('Error storing embedding:', error);
  }
  return data;
}

async function prepareAllEmbeddings() {
  console.log('Starting embedding preparation...');

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
      // CHANGED: Use embeddingText if available, otherwise use content
      const textToEmbed = chunk.embeddingText || chunk.content;

      //Generate embedding from enriched text
      const embedding = await generateEmbedding(textToEmbed);

      //Store in Supabase with display content
      await storeEmbedding(chunk.content, embedding, chunk.metadata);

      console.log(
        `  ✅ Stored: ${chunk.metadata.title || chunk.metadata.type}`,
      );
    } catch (error) {
      console.error(`Error processing chunk ${i + 1}:`, error);
    }

    // Add delay to respect rate limits
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.log('Embedding preparation completed.');
}

// Run the preparation script
prepareAllEmbeddings().catch(console.error);
