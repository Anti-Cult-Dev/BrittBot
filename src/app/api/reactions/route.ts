import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const reactionSchema = z.object({
  messageId: z.string(),
  emoji: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messageId, emoji } = reactionSchema.parse(body);

    // Check if message exists
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    const reaction = await prisma.reaction.create({
      data: {
        emoji,
        messageId,
      },
      include: {
        message: true,
      },
    });

    return NextResponse.json({ success: true, reaction });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error adding reaction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add reaction' },
      { status: 500 }
    );
  }
}
