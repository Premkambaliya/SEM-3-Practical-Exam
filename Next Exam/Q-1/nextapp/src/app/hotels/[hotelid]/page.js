import { notFound } from "next/navigation";

const hotels = [
  {
    id: "1",
    name: "Ocean View Resort",
    location: "Miami Beach",
    description:
      "Relax by the sea with luxury amenities and breathtaking ocean views.",
  },
  {
    id: "2",
    name: "Mountain Lodge",
    location: "Aspen",
    description: "Perfect for ski lovers and mountain adventurers.",
  },
  {
    id: "3",
    name: "City Central Hotel",
    location: "New York",
    description:
      "Stay in the heart of the city with premium dining and nightlife nearby.",
  },
];

export default async function HotelDetailPage({ params }) {
  const { hotelid } = await params;
  const hotel = hotels.find((h) => h.id === hotelid);

  if (!hotel) return notFound();

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {hotel.name}
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">Location:</span> {hotel.location}
        </p>
        <p className="text-gray-600 leading-relaxed">
          <span className="font-semibold">Description:</span> {hotel.description}
        </p>
      </div>
    </main>
  );
}
