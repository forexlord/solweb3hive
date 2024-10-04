import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// API route handler
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json(); 

    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Make request to OpenAI API
    const completion = await openai.completions.create({
      model: 'gpt-4o-mini', 
      prompt,
      max_tokens: 100, 
    });

   
    return NextResponse.json({ result: completion.choices[0].text });
  } catch (error) {
    console.error('Error with OpenAI request:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
