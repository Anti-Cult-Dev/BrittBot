import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Try a simple models list request to verify the key
    const response = await openai.models.list();
    
    return NextResponse.json({
      status: 'success',
      message: 'OpenAI API key is valid'
    });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);

    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: 'OpenAI API Error',
        message: error.message
      },
      { status: 500 }
    );
  }
}
