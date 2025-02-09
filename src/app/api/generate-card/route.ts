import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    // Read API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      // No need for dangerouslyAllowBrowser since this is server-side
    });

    const body = await req.json();
    console.log('Received request body:', body);

    const {
      playerName,
      team,
      position,
      season,
      jerseyNumber,
      achievement,
      cardStyle
    } = body;

    // Validate required fields
    if (!playerName || !team) {
      return NextResponse.json(
        { error: 'Player name and team are required' },
        { status: 400 }
      );
    }

    // Construct the prompt
    const prompt = constructTradingCardPrompt({
      playerName,
      team,
      position,
      season,
      jerseyNumber,
      achievement,
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

      // Handle specific error types
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

interface TradingCardParams {
  playerName: string;
  team: string;
  position?: string;
  season?: string;
  jerseyNumber?: string;
  achievement?: string;
  cardStyle?: string;
}

function constructTradingCardPrompt(params: TradingCardParams): string {
  const {
    playerName,
    team,
    position,
    season,
    jerseyNumber,
    achievement,
    cardStyle
  } = params;

  // Base style descriptions
  const styleDescriptions: { [key: string]: string } = {
    modern: "modern, sleek design with dynamic lighting, metallic accents, and high-tech visual effects",
    vintage: "vintage style from the 1960s-70s, slightly worn edges, retro color palette, classic card layout",
    chrome: "chrome finish with reflective surfaces, prismatic effects, and modern geometric patterns",
    prizm: "prizm style with rainbow refractor patterns, holographic elements, and dynamic light effects",
    "super bowl special": "luxury gold and silver elements, Super Bowl trophy imagery, championship ring details, and celebratory design",
    "hall of fame": "prestigious gold-themed design with Hall of Fame bust styling, legacy elements, and classic football imagery",
    "rookie card": "rookie card styling with dynamic action pose, 'ROOKIE' designation, and fresh, energetic design elements"
  };

  // Build the base prompt with clear instructions for DALL-E 3
  let prompt = `I NEED to create a professional football trading card. DO NOT add any detail beyond what I specify: `;
  
  // Add core elements
  prompt += `Create a football trading card for ${playerName} of the ${team}. `;
  
  // Add position and number if provided
  if (position && jerseyNumber) {
    prompt += `Player is wearing jersey number ${jerseyNumber} as a ${position}. `;
  }

  // Add season context if provided
  if (season) {
    prompt += `Card represents the ${season} season. `;
  }

  // Add achievements if provided
  if (achievement) {
    prompt += `Include the achievement: ${achievement}. `;
  }

  // Add style-specific elements
  const selectedStyle = styleDescriptions[cardStyle?.toLowerCase() || 'modern'];
  prompt += `The card should feature ${selectedStyle}. `;

  // Add common trading card elements
  prompt += `Include player name, team, and number in a clear, professional typography layout. `;
  prompt += `The image should be photorealistic with sharp details. `;
  prompt += `Ensure the card has proper borders and team colors. `;

  console.log('Generated prompt:', prompt);
  return prompt;
}
