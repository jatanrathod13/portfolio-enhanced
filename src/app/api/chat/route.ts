import { neon } from '@neondatabase/serverless';
import { pipeline } from '@xenova/transformers';
import type { NextRequest } from 'next/server';

// Define a type for the embedder to avoid 'any'
interface Embedder {
  (text: string, options: { pooling: string; normalize: boolean }): Promise<{ data: number[] }>;
}

// Initialize embedding pipeline
let _embedder: Embedder | null = null;
async function getEmbedder(): Promise<Embedder> {
  if (!_embedder) {
    _embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2') as unknown as Embedder;
  }
  return _embedder;
}

interface DbRow {
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    if (!process.env.DATABASE_URL) {
      throw new Error('Database URL not configured');
    }
    
    // Generate embedding for the user query
    const embedder = await getEmbedder();
    const embedding = await embedder(message, { pooling: 'mean', normalize: true });
    
    // Connect to Neon and run the query
    const sql = neon(process.env.DATABASE_URL);
    
    // Search for relevant resume chunks
    const result = await sql<DbRow[]>(`
      SELECT 
        content, 
        metadata,
        1 - (embedding <=> $1) AS similarity
      FROM resume_chunks
      WHERE 1 - (embedding <=> $1) > 0.7
      ORDER BY similarity DESC
      LIMIT 5;
    `, [embedding.data]);
    
    const contextChunks = (result || []).map((row) => row.content).join('\n\n');
    
    // Generate response
    // For now, we'll use a simple response format without LLM integration
    let response: string;
    
    if (!contextChunks) {
      response = "I don't have specific information about that. Would you like to ask something else about Jatan's experience or skills?";
    } else {
      // In a production version, we would use a proper LLM here, but for the prototype,
      // we'll just return the most relevant chunk for testing
      response = `Based on Jatan's resume: ${contextChunks}`;
    }
    
    return Response.json({ answer: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Failed to process your request' }, { status: 500 });
  }
} 