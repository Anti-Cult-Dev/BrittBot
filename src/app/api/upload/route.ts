import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With real cloud storage, you'd upload to S3/Cloudinary here
  const path = join(process.cwd(), 'public/uploads', file.name)
  await writeFile(path, buffer)

  return NextResponse.json({ 
    success: true,
    url: `/uploads/${file.name}`,
    filename: file.name
  })
}
