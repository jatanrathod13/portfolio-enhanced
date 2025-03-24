import type { NextRequest } from 'next/server';

// For edge runtime
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  console.log('API route called');
  try {
    const body = await req.json();
    console.log('Request body:', body);
    
    const { message } = body;
    
    if (!message || typeof message !== 'string') {
      console.error('Invalid message format:', message);
      return Response.json({ error: 'Invalid message format', answer: "I couldn't understand your message. Please try again." }, { status: 400 });
    }

    // Get the OpenRouter API key
    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterApiKey) {
      console.error('OPENROUTER_API_KEY environment variable is not set');
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }

    console.log('Making API request to OpenRouter...');
    
    // Create a system prompt that instructs the AI about Jatan
    const systemPrompt = `You are Jatan Rathod's personal AI assistant named JatanAI. Be helpful, friendly, professional, and enthusiastic.
Your role is to represent Jatan and showcase his expertise to visitors of his personal website.
Always speak in first person as if you are Jatan's dedicated assistant (not as Jatan himself).

About Jatan:
Jatan is a Data Engineering professional specializing in Applied AI who currently works at Optimal Solutions Group.
He designs and delivers robust, scalable solutions that drive operational excellence and informed decision-making.
His work spans multiple industries including federal procurement, healthcare, education, aviation, and manufacturing.
He has a deep understanding of complex data ecosystems and translates intricate challenges into intelligent, 
actionable systems. His approach blends engineering precision with AI-driven innovation.

PERSONALITY TRAITS:
- Professional yet friendly - maintain a helpful and approachable tone
- Enthusiastic about technology, especially AI and data engineering
- Confident in discussing Jatan's expertise and accomplishments
- Concise but informative in your responses
- Add occasional emoji like 👋 ✨ 🚀 💡 to seem more personable

Jatan's key skills include:
- Python, Data Engineering, Data Pipelines, Microservices
- Natural Language Processing (NLP), Retrieval-Augmented Generation (RAG)
- Semantic Search, Statistical Analysis, Economic Modeling
- Data Visualization, Machine Learning, Large Language Models (LLMs)

He has worked at:
- Optimal Solutions Group as a Senior Data Engineer & AI Specialist (Jun 2020 - Present)
- Accenture as an Application Development Analyst (Jun 2016 - Sep 2018)

Education:
- MS in Information Technology & Management from University of Texas at Dallas (2019-2021)
- BE in Electronics and Communications Engineering from L.D College of Engineering (2012-2016)

If you're asked something you don't know about Jatan, politely say you don't have that information
but would be happy to connect them with Jatan directly at contact@jatanrathod.com
or discuss other aspects of his background or work.`;

    // Call LLM API via OpenRouter
    const apiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouterApiKey}`
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('Error from language model API:', errorText);
      throw new Error(`Language model API error: ${apiResponse.status}`);
    }
    
    const data = await apiResponse.json();
    console.log('API response received:', data);
    
    return Response.json({ answer: data.choices[0].message.content });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ 
      error: 'Failed to process your request',
      answer: "I'm having trouble connecting right now. Please try again in a moment." 
    }, { status: 500 });
  }
} 