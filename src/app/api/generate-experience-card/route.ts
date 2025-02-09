import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
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

    const body = await req.json();
    console.log('Received request body:', body);

    const {
      title,
      company,
      duration,
      description,
      skills,
      cardStyle
    } = body;

    // Validate required fields
    if (!title || !company || !description) {
      return NextResponse.json(
        { error: 'Title, company, and description are required' },
        { status: 400 }
      );
    }

    // Construct the prompt
    const prompt = constructExperienceCardPrompt({
      title,
      company,
      duration,
      description,
      skills,
      cardStyle
    });

    console.log('Generating image with prompt:', prompt);

    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "vivid",
      });

      console.log('OpenAI API Response:', {
        url: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt
      });

      if (!response.data?.[0]?.url) {
        throw new Error('No image URL in OpenAI response');
      }

      return NextResponse.json({
        imageUrl: response.data[0].url,
        revisedPrompt: response.data[0].revised_prompt
      });

    } catch (error: any) {
      console.error('OpenAI API Error:', error);

      if (error.status === 401) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key' },
          { status: 401 }
        );
      }

      if (error.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }

      if (error.status === 400) {
        return NextResponse.json(
          { 
            error: 'Bad request',
            details: error.message
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error: 'OpenAI API Error',
          message: error.message,
          type: error.type
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json(
      {
        error: 'Server Error',
        message: error.message
      },
      { status: 500 }
    );
  }
}

interface ExperienceCardParams {
  title: string;
  company: string;
  duration?: string;
  description: string;
  skills?: string[];
  cardStyle?: string;
}

function constructExperienceCardPrompt(params: ExperienceCardParams): string {
  const {
    title,
    company,
    duration,
    description,
    skills,
    cardStyle
  } = params;

  // Base style descriptions
  const styleDescriptions: { [key: string]: string } = {
    modern: "modern, sleek design with dynamic lighting, metallic accents, and high-tech visual effects",
    corporate: "professional corporate style with clean lines, business-appropriate imagery, and subtle gradients",
    creative: "creative and artistic design with vibrant colors, unique patterns, and innovative visual elements",
    minimal: "minimalist design with ample white space, simple typography, and essential elements only",
    tech: "technology-focused design with circuit patterns, digital elements, and futuristic aesthetics",
    startup: "energetic startup style with bold colors, modern illustrations, and dynamic compositions"
  };

  // Build the base prompt
  let prompt = `Create a professional experience card that showcases a work experience. DO NOT add any text or details beyond what I specify: `;
  
  // Add core elements
  prompt += `Create an experience card for the role of ${title} at ${company}. `;
  
  // Add duration if provided
  if (duration) {
    prompt += `The duration of this role was ${duration}. `;
  }

  // Add description
  prompt += `The experience involves: ${description}. `;

  // Add skills if provided
  if (skills && skills.length > 0) {
    prompt += `Key skills utilized: ${skills.join(', ')}. `;
  }

  // Add style-specific elements
  const selectedStyle = styleDescriptions[cardStyle?.toLowerCase() || 'modern'];
  prompt += `The card should feature ${selectedStyle}. `;

  // Add common card elements
  prompt += `Include visual elements that represent the role and industry. `;
  prompt += `The image should be professional and business-appropriate. `;
  prompt += `Ensure the design has proper hierarchy and visual balance. `;

  console.log('Generated prompt:', prompt);
  return prompt;
}
