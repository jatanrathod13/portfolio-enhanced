import { neon } from '@neondatabase/serverless';
import { pipeline } from '@xenova/transformers';
import { DATA } from '../src/data/resume.tsx';

async function main() {
  try {
    console.log('Initializing embedding model...');
    // Initialize embedding model
    const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    console.log('Connecting to Neon database...');
    // Connect to Neon
    const sql = neon(process.env.DATABASE_URL);

    // Create the resume_chunks table if it doesn't exist
    await sql(`
      CREATE TABLE IF NOT EXISTS resume_chunks (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        metadata JSONB,
        embedding vector(384)
      );
      
      -- Create vector index for faster similarity search if it doesn't exist
      CREATE INDEX IF NOT EXISTS resume_chunks_embedding_idx 
      ON resume_chunks 
      USING ivfflat (embedding vector_cosine_ops);
    `);

    // Clear existing data
    await sql('DELETE FROM resume_chunks');

    // Process resume into chunks
    const chunks = [];

    console.log('Processing resume data...');
    
    // Add summary
    chunks.push({
      content: DATA.summary,
      metadata: { type: 'summary' }
    });

    // Add personal info
    chunks.push({
      content: `${DATA.name} is located in ${DATA.location} and can be contacted at ${DATA.contact.email}.`,
      metadata: { type: 'contact' }
    });

    // Add work experience
    for (const job of DATA.work) {
      chunks.push({
        content: `${job.title} at ${job.company} (${job.start} - ${job.end}): ${job.description}`,
        metadata: { type: 'work', company: job.company, title: job.title }
      });
    }

    // Add projects
    for (const project of DATA.projects) {
      chunks.push({
        content: `Project: ${project.title}. ${project.description}. Technologies: ${project.technologies.join(', ')}`,
        metadata: { type: 'project', title: project.title }
      });
    }

    // Add education
    for (const edu of DATA.education) {
      chunks.push({
        content: `Education: ${edu.degree} from ${edu.school} (${edu.start} - ${edu.end})`,
        metadata: { type: 'education', school: edu.school }
      });
    }

    // Add skills - process by category for better context
    for (const category of DATA.skillCategories) {
      chunks.push({
        content: `${category.title} skills: ${category.skills.join(', ')}`,
        metadata: { type: 'skills', category: category.title }
      });
    }

    console.log(`Generated ${chunks.length} chunks. Generating embeddings and storing in database...`);

    // Generate embeddings and store in Neon
    for (const chunk of chunks) {
      const embedding = await embedder(chunk.content, { pooling: 'mean', normalize: true });
      await sql(
        'INSERT INTO resume_chunks (content, metadata, embedding) VALUES ($1, $2, $3)',
        [chunk.content, JSON.stringify(chunk.metadata), embedding.data]
      );
      console.log(`Processed chunk: ${chunk.content.substring(0, 50)}...`);
    }

    console.log('Resume processed and stored successfully!');
  } catch (error) {
    console.error('Error processing resume:', error);
    process.exit(1);
  }
}

main(); 