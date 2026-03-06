import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

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
      'https://ryan-portfolio-lilac.vercel.app',
      'http://localhost:5173',
    ],
  }),
);
app.use(express.json());

async function findRelevantContext(query, limit = 5) {
  try {
    console.log('🔍 Searching for:', query);

    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    const { data, error } = await supabase.rpc('match_embeddings', {
      query_embedding: queryEmbedding,
      match_threshold: 0.3, // CHANGED: Lowered from 0.5 to 0.2
      match_count: limit,
    });

    if (error) {
      console.error('❌ Supabase RPC error:', error);
      return [];
    }

    console.log('✅ Found contexts:', data?.length || 0);
    console.log(
      '📝 Similarity scores:',
      data?.map((d) => d.similarity),
    );

    if (data && data.length > 0) {
      console.log('📄 First result:', {
        content: data[0].content.substring(0, 100),
        similarity: data[0].similarity,
      });
    }

    return data || []; // CHANGED: Return full data objects, not just content
  } catch (error) {
    console.error('❌ Error creating embedding:', error);
    return [];
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    const lastMessage = messages.filter((msg) => msg.role === 'user').pop();

    // CHANGED: Initialize contextPrompt outside the if block
    let contextPrompt = 'No specific context available.';

    if (lastMessage) {
      const relevantContext = await findRelevantContext(lastMessage.content);

      console.log('📊 Context found:', relevantContext.length);

      if (relevantContext.length > 0) {
        // CHANGED: Build context from the full data objects
        const contextTexts = relevantContext.map((ctx) => {
          const metadata = ctx.metadata || {};
          let text = ctx.content;

          // Add links if available
          if (metadata.link) {
            text += ` | View: ${metadata.link}`;
          }
          if (metadata.gitLink) {
            text += ` | GitHub: ${metadata.gitLink}`;
          }

          return text;
        });

        contextPrompt = contextTexts.join('\n\n');
        console.log(
          '📝 Context being sent to AI:',
          contextPrompt.substring(0, 200) + '...',
        );
      } else {
        console.log('⚠️ No context found for query:', lastMessage.content);
      }
    }

    // CHANGED: Better system prompt with explicit instructions
    const systemMessage = {
      role: 'system',
      content: `You are a helpful AI assistant representing Ryan Rodriguez, a Frontend Developer.

If anyone ask for contact information responnd with my email officialryanrod@gmail.com and include this link to download my resume <a href="https://ryan-portfolio-lilac.vercel.app/Ryan%20Rodriguez%20Frontend%20Developer%20Resume.pdf" target="_blank" rel="noopener noreferrer">here</a>.

CRITICAL RULE: You MUST use ONLY the information provided in the CONTEXT section below. Do NOT make up or invent any information.

When discussing projects:
1. Use the EXACT project title from the context (wrap it in <strong> tags)
2. Use the EXACT description from the context
3. Include the actual links if provided in the context
4. If no relevant projects exist in the context, say "I don't have information about that specific project."
5. When the word Project is mentioned, refer to the project title and description from the context.

When discussing skills or experience:
1. Skills will be referred as technical skills such as JavaScript, React, Next.js, CSS, Tailwind CSS, HubSpot CMS, Supabase, OpenAI API, Firebase, MongoDB, Express.js, Node.js, and other relevant technologies.
2. Make sure to mention the specific technologies used in each project when discussing skills or experience.
3. When ask about skills include all the skills given in the context in your response.

Formatting rules:
- Return HTML only
- Use <strong> for project titles
- Use <a href="URL" target="_blank" rel="noopener noreferrer"> for links
- Keep responses conversational and concise
- Do NOT use headings (<h1>, <h2>, etc.)
- Do NOT use lists (<ul>, <li>)

Example response format:
<strong>Interactive Scroll Animations Report Page</strong> - Developed a visually engaging report page within HubSpot CMS, leveraging custom modules, JavaScript, and CSS to implement scroll-based animations. <a href="https://www.dsstpublicschools.org/2025-impact-report" target="_blank" rel="noopener noreferrer">View project</a>



CONTEXT:
${contextPrompt}

If the context doesn't contain relevant information, respond with: "I don't have specific information about that. Feel free to ask me about Ryan's skills, projects, or experience!"
`,
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log(
      '🤖 AI Response:',
      completion.choices[0].message.content.substring(0, 200),
    );

    res.json({
      response: completion.choices[0].message.content,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('❌ Error handling chat request:', error);
    res
      .status(500)
      .json({ error: 'Internal server error', details: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
