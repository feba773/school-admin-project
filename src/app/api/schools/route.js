import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import path from 'path';
import { writeFile } from 'fs/promises';

// This function handles GET requests to /api/schools
// It's for fetching all the schools
export async function GET() {
  try {
    // The SQL query to select specific fields from all schools
    const sqlQuery = 'SELECT id, name, address, city, image FROM schools';
    const schools = await query({ query: sqlQuery, values: [] });

    // Send the list of schools back as a JSON response
    return NextResponse.json({ schools: schools });
  } catch (error) {
    // If an error occurs, send back an error response
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

// This function handles POST requests to /api/schools
// It's for adding a new school
export async function POST(req) {
  try {
    // Because the form includes an image, it's sent as "FormData"
    const data = await req.formData();

    // Extract the text fields from the FormData
    const name = data.get('name');
    const address = data.get('address');
    const city = data.get('city');
    const state = data.get('state');
    const contact = data.get('contact');
    const email_id = data.get('email_id');

    // Get the image file
    const image = data.get('image');

    // Check if an image was provided
    if (!image) {
      return NextResponse.json({ error: 'Image is required.' }, { status: 400 });
    }

    // Convert the image file to a buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename for the image
    const imageName = `${Date.now()}_${image.name}`;
    // Define the path where the image will be saved
    const imagePath = path.join(process.cwd(), 'public/schoolImages', imageName);

    // Save the image file to the filesystem
    await writeFile(imagePath, buffer);
    console.log(`Image saved to ${imagePath}`);

    // The public path to be stored in the database
    const dbImagePath = `/schoolImages/${imageName}`;

    // The SQL query to insert the new school data into the database
    const sqlQuery = `
      INSERT INTO schools (name, address, city, state, contact, email_id, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await query({
      query: sqlQuery,
      values: [name, address, city, state, contact, email_id, dbImagePath],
    });

    // Send a success response back
    return NextResponse.json({
      success: true,
      message: 'School added successfully!',
      id: result.insertId,
    });
  } catch (error) {
    // If an error occurs, log it and send back an error response
    console.error(error);
    return NextResponse.json({ error: 'Failed to add school' }, { status: 500 });
  }
}