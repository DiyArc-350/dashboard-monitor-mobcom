"use client";
import { useRouter } from 'next/navigation';

type Sensor = {
  id: number;
  temperature: string | number;
  humidity: string | number;
  ppmValue: number | string;
  intensity: number | string;
  airQuality: string;
};


export default function Table({ data }: { data: Sensor[] }) {
  const router = useRouter();
  return (
    <div className="overflow-x-auto p-4">
      <div className='mb-4 flex justify-between items-between'>
        <h1 className="text-3xl text-black mx-6 font-bold">Riwayat Sensor</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-500 text-black px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          Kembali ke Dashboard
        </button>
      </div>
      <table className="min-w-full bg-slate-500 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 dark:bg-slate-700 text-left text-slate-900 dark:text-gray-100">
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Temperature (°C)</th>
            <th className="py-2 px-4">Humidity (%)</th>
            <th className="py-2 px-4">PPM Value</th>
            <th className="py-2 px-4">Intensity</th>
            <th className="py-2 px-4">Air Quality</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sensor) => (
            <tr
              key={sensor.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                {sensor.id}
              </td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                {sensor.temperature}
              </td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                {sensor.humidity}
              </td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                {sensor.ppmValue}
              </td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                {sensor.intensity}
              </td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                {sensor.airQuality}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
