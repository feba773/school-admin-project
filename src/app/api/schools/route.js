import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET handler (no changes)
export async function GET() {
  try {
    const sqlQuery = 'SELECT id, name, address, city, image FROM schools';
    const schools = await query({ query: sqlQuery, values: [] });
    return NextResponse.json({ schools: schools });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

// POST handler with Cloudinary upload
export async function POST(req) {
  try {
    const data = await req.formData();

    const name = data.get('name');
    const address = data.get('address');
    const city = data.get('city');
    const state = data.get('state');
    const contact = data.get('contact');
    const email_id = data.get('email_id');

    const image = data.get('image');

    if (!image) {
      return NextResponse.json({ error: 'Image is required.' }, { status: 400 });
    }

    // Convert image file to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream(
      { folder: 'schools' },
      async (error, result) => {
        if (error) {
          console.error(error);
          return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        // Save school data in MySQL
        const sqlQuery = `
          INSERT INTO schools (name, address, city, state, contact, email_id, image)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const resultDb = await query({
          query: sqlQuery,
          values: [name, address, city, state, contact, email_id, result.secure_url],
        });

        return NextResponse.json({
          success: true,
          message: 'School added successfully!',
          id: resultDb.insertId,
          imageUrl: result.secure_url,
        });
      }
    );

    // Pipe buffer to Cloudinary
    const stream = uploadResult;
    stream.end(buffer);

    // Note: Next.js Edge Functions may need an alternative upload method
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add school' }, { status: 500 });
  }
}
