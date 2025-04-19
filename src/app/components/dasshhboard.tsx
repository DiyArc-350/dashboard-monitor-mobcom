"use client";
import { useState } from "react";

export default function Dashboard() {
  const [airQuality, setAirQuality] = useState("0");
  const [status, setStatus] = useState("-");
  const [humidity, setHumidity] = useState("0");
  const [temperature, setTemperature] = useState("0");
  const [ledIntensity, setLedIntensity] = useState("0");
  const [ledOn, setLedOn] = useState(false);

  const handleToggleLED = () => {
    setLedOn(!ledOn);
    // Tambahkan logika fetch/post ke backend kalau perlu
  };

  const handleLogout = () => {
    // logika logout
  };

  const handleHistory = () => {
    // logika buka halaman riwayat
  };

  return (
  <div className="min-h-screen bg-gradient-to-r from-slate-700 to-sky-200 p-8 font-sans text-black">
      <h1 className="text-5xl text-center font-semibold mb-8">Dashboard</h1>

      <div className="flex justify-center gap-6 mb-6">
        {/* Kondisi Udara */}
        <div className="bg-cyan-100 p-6 rounded-xl shadow border">
          <h2 className="text-2xl font-semibold mb-4">Kondisi Udara</h2>
          <div className="mb-4 flex justify-between">
            <label>Kualitas Udara (ppm) </label>
            <input type="text" readOnly value={airQuality} className="bg-white px-2 py-1 rounded w-24 text-center" />
          </div>
          <div className="flex justify-between">
            <label>Status</label>
            <input type="text" readOnly value={status} className="bg-white px-2 py-1 rounded w-24 text-center" />
          </div>
        </div>

        {/* Kondisi Lingkungan */}
        <div className="bg-cyan-100 p-6 rounded-xl shadow border">
          <h2 className="text-2xl font-semibold mb-4">Kondisi Lingkungan</h2>
          <div className="mb-4 flex justify-between">
            <label>Kelembaban (%)</label>
            <input type="text" readOnly value={humidity} className="bg-white px-2 py-1 rounded w-24 text-center" />
          </div>
          <div className="flex justify-between">
            <label>Suhu (°C) </label>
            <input type="text" readOnly value={temperature} className="bg-white px-2 py-1 rounded w-24 text-center" />
          </div>
        </div>
      </div>

      {/* Status LED */}
      <div className="bg-cyan-100 p-6 rounded-xl shadow border mb-6">
        <h2 className="text-2xl font-semibold mb-4">Status LED</h2>
        <div className="mb-4 flex justify-between">
          <label>Intensitas Cahaya</label>
          <input type="text" readOnly value={ledIntensity} className="bg-white px-4 py-1 rounded w-24 text-center" />
        </div>
          {/* Switch for LED */}
  <label
    htmlFor="ledSwitch"
    className="flex items-center space-x-3 cursor-pointer"
  >
    <span>{ledOn ? "On" : "Off"}</span>
    <input
      type="checkbox"
      id="ledSwitch"
      checked={ledOn}
      onChange={handleToggleLED}
      className="transform scale-150"
    />
    <span
      className={`w-12 h-6 rounded-full ${
        ledOn ? "bg-green-500" : "bg-gray-400"
      } relative transition duration-300`}
    >
      <span
        className={`absolute w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
          ledOn ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </span>
  </label>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end space-x-4">
        <button onClick={handleHistory} className="bg-black-700 text-black-200 px-4 py-2 rounded border-2 border-black-300">
          Riwayat
        </button>
        <button onClick={handleLogout} className="bg-black-700 text-black-200 px-4 py-2 rounded border-2 border-black-300">
          Keluar
        </button>
      </div>
    </div>
  );
}