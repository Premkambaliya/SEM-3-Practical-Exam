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

// GET /api/bookings/[bookingid]
export async function GET(request, { params }) {
  const { bookingid } = await params;
  const bookings = await readBookings();
  const booking = bookings.find((b) => b.id === bookingid);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

// DELETE /api/bookings/[bookingid]
export async function DELETE(request, { params }) {
  const { bookingid } = await params;
  const bookings = await readBookings();
  const index = bookings.findIndex((b) => b.id === bookingid);

  if (index === -1) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const [deleted] = bookings.splice(index, 1);
  await writeBookings(bookings);

  return NextResponse.json({ message: "Booking cancelled", deleted });
}
