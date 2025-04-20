"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "../login/actions";
import { useMqtt } from "@/app/hooks/useMqtt";

function Spinner() {
  return (
    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin inline-block" />
  );
}

export default function Dashboard() {
  const [airQuality, setAirQuality] = useState<string | null>(null);
  const [ppmValue, setPPMValue] = useState<string | null>(null);
  const [humidity, setHumidity] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<string | null>(null);
  const [ledStatus, setLEDStatus] = useState(false);
  const router = useRouter();

  useMqtt("ESP/sensor/AirQuality", (msg) => setAirQuality(msg));
  useMqtt("ESP/sensor/PPMValue", (msg) => setPPMValue(msg));
  useMqtt("ESP/sensor/Humidity", (msg) => setHumidity(msg));
  useMqtt("ESP/sensor/Temperature", (msg) => setTemperature(msg));
  useMqtt("ESP/sensor/Intensitas", (msg) => setIntensity(msg));

  const { publish } = useMqtt("ESP/sensor/LEDstatus", (msg) =>
    setLEDStatus(msg === "1")
  );
  console.log("LED Status:", ledStatus);

  const toggle = () => {
    const newState = !ledStatus;
    setLEDStatus(newState);
    publish("ESP/sensor/control", newState ? "1" : "0");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cce4f6] to-[#91b9cf] flex flex-col items-center justify-center text-black font-serif px-4 py-8">
      <h1 className="text-6xl mb-10 font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-8 mb-8 w-full max-w-5xl">
        {/* Air Quality Box */}
        <div className="bg-slate-200 p-6 rounded-md border border-black w-full shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Kondisi Udara</h2>
          <div className="mb-4">
            <p className="text-lg">Kualitas Udara</p>
            <div className="bg-white p-2 rounded-md border border-black text-center">
              {ppmValue !== null ? ppmValue : <Spinner />}
            </div>
          </div>
          <div>
            <p className="text-lg">Status</p>
            <div className="bg-white p-2 rounded-md border border-black text-center">
              {airQuality !== null ? airQuality : <Spinner />}
            </div>
          </div>
        </div>

        {/* Environmental Conditions Box */}
        <div className="bg-slate-200 p-6 rounded-md border border-black w-full shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Kondisi Lingkungan</h2>
          <div className="mb-4">
            <p className="text-lg">Kelembaban</p>
            <div className="bg-white p-2 rounded-md border border-black text-center">
              {humidity !== null ? humidity : <Spinner />}
            </div>
          </div>
          <div>
            <p className="text-lg">Suhu</p>
            <div className="bg-white p-2 rounded-md border border-black text-center">
              {temperature !== null ? temperature : <Spinner />}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-5xl mt-8">
        {/* LED Status Box */}
        <div className="bg-slate-300 p-6 rounded-md border border-black w-full shadow-lg">
          <p className="text-xl font-bold mb-2">Status LED</p>
          <div className="text-sm italic mb-4 flex items-center gap-2">
            <span>intensitas cahaya:</span>
            {intensity !== null ? <span>{intensity}</span> : <Spinner />}
          </div>
          <div className="flex items-center justify-between">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={ledStatus}
                onChange={toggle}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition duration-300"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {ledStatus ? "ON" : "OFF"}
              </span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-10 pl-40 justify-start items-start">
          <button
            onClick={() => router.push("/riwayat")}
            className="bg-gray-500 text-black px-6 py-2 rounded-md hover:bg-gray-600 w-40 border border-black"
          >
            Riwayat
          </button>
          <button
            onClick={() => logout()}
            className="bg-gray-700 text-black px-6 py-2 rounded-md hover:bg-gray-800 w-40 border border-black"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
