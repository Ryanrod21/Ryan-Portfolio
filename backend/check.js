import dotenv from 'dotenv';

import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEmbeddings() {
  console.log('🔍 Checking embeddings in database...\n');

  // Check if table exists and has data
  const { data, error } = await supabase
    .from('embeddings')
    .select('id, content, metadata')
    .limit(5);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`✅ Found ${data.length} embeddings`);
  console.log('\n📄 Sample data:');
  data.forEach((row, i) => {
    console.log(`\n${i + 1}. Content: ${row.content.substring(0, 100)}...`);
    console.log(`   Metadata:`, row.metadata);
  });

  // Check if embedding column exists
  const { data: embData, error: embError } = await supabase
    .from('embeddings')
    .select('embedding')
    .limit(1);

  if (embError) {
    console.error('\n❌ Embedding column error:', embError);
  } else {
    console.log('\n✅ Embedding column exists');
    console.log('   Embedding length:', embData[0]?.embedding?.length);
  }
}

checkEmbeddings();
