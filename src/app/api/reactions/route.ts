import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { messageId, emoji } = await request.json()

    const reaction = await prisma.reaction.create({
      data: {
        emoji,
        messageId
      }
    })

    return NextResponse.json({ success: true, reaction })
  } catch (error) {
    console.error('Error adding reaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add reaction' },
      { status: 500 }
    )
  }
}
