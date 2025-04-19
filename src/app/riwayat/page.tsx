import Table from "@/app/components/Table";
import clientPromise from "@/app/lib/mongodb";
import Link from "next/link";

export default async function SensorsPage() {
  const client = await clientPromise;
  const db = client.db("test"); // your DB name
  const collection = db.collection("sensors");

  // Fetch the last 20 entries sorted by insertion (_id)
  const raw = await collection
    .find({})
    .sort({ _id: -1 }) // newest first
    .limit(20)
    .toArray();

  // Optional: reverse to show oldest at top of the table
  const data = raw.reverse().map((item: any, index: number) => ({
    id: index + 1,
    temperature: item.Temperature ?? "N/A",
    humidity: item.Humidity ?? "N/A",
    ppmValue: item.PPMValue ?? "N/A",
    intensity: item.Intensitas ?? "N/A",
    airQuality: item.AirQuality ?? "N/A",
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#cce4f6] to-[#91b9cf] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-black font-bold">Riwayat Sensor</h1>
        <Link
          href="/dashboard"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          Kembali ke Dashboard
        </Link>
      </div>
      <Table data={data} />
    </main>
  );
}
