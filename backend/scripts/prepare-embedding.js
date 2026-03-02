import dotenv from 'dotenv';
import { OpenAi } from 'openai';
import { createClient } from '@supabase/supabase-js';
import Resume from '../../public/Ryan Rodriguez Frontend Developer Resume.pdf';
import { skillsData, skillsData2 } from '../../src/data/SkillsData';
import portfolioData from '../../src/data/PortfolioData';

dotenv.config();

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);
