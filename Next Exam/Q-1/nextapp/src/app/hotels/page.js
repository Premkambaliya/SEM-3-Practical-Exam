import Link from "next/link";

const hotels = [
  { id: "1", name: "Ocean View Resort", location: "Miami Beach" },
  { id: "2", name: "Mountain Lodge", location: "Aspen" },
  { id: "3", name: "City Central Hotel", location: "New York" },
];

export default function HotelsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        🏨 Available Hotels
      </h1>

      <ul className="space-y-4">
        {hotels.map((hotel) => (
          <li
            key={hotel.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-transform hover:-translate-y-1 bg-white"
          >
            <Link
              href={`/hotels/${hotel.id}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              {hotel.name}
            </Link>
            <p className="text-gray-600">{hotel.location}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
