// src/app/api/bookings/route.js
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src", "data", "bookings.json");

async function readBookings() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeBookings(bookings) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(bookings, null, 2), "utf-8");
}

// GET /api/bookings → list all bookings
export async function GET() {
  const bookings = await readBookings();
  return NextResponse.json({ bookings });
}

// POST /api/bookings → create a new booking
export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.hotel || !data.guest || !data.nights) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bookings = await readBookings();

    const newBooking = {
      id: String(Date.now()), // simple ID
      ...data,
    };

    bookings.push(newBooking);
    await writeBookings(bookings);

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
