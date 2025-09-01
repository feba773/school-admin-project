import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper: Convert file to base64
async function fileToBase64(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString("base64");
}

// POST: Add a new school
export async function POST(req) {
  try {
    const data = await req.formData();

    const name = data.get("name");
    const address = data.get("address");
    const city = data.get("city");
    const state = data.get("state");
    const contact = data.get("contact");
    const email_id = data.get("email_id");
    const image = data.get("image");

    if (!image) {
      return NextResponse.json({ error: "Image is required." }, { status: 400 });
    }

    // Convert image to base64 string
    const base64String = await fileToBase64(image);

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:${image.type};base64,${base64String}`,
      { folder: "schools" }
    );

    // Save school info in MySQL
    const sqlQuery = `
      INSERT INTO schools (name, address, city, state, contact, email_id, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const resultDb = await query({
      query: sqlQuery,
      values: [name, address, city, state, contact, email_id, uploadResult.secure_url],
    });

    return NextResponse.json({
      success: true,
      message: "School added successfully!",
      id: resultDb.insertId,
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("POST /api/schools error:", error);
    return NextResponse.json(
      { error: "Failed to add school", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Fetch all schools
export async function GET() {
  try {
    const sqlQuery = "SELECT id, name, address, city, image FROM schools";
    const schools = await query({ query: sqlQuery, values: [] });
    return NextResponse.json({ schools });
  } catch (error) {
    console.error("GET /api/schools error:", error);
    return NextResponse.json(
      { error: "Failed to fetch schools", details: error.message },
      { status: 500 }
    );
  }
}
