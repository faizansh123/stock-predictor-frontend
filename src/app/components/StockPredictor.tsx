"use client";
import React, { useState } from "react";

export default function StockPredictor() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load backend URL from .env.local
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handlePredict = async () => {
    if (!symbol.trim()) {
      alert("Please enter a stock ticker (e.g., AAPL)");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/predict/${symbol}`);
      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Stock Predictor</h1>
      <input
        type="text"
        placeholder="Enter stock symbol (e.g. AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        className="border rounded-lg p-3 w-full text-center mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={handlePredict}
        disabled={loading}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition w-full font-semibold"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && (
        <div className="mt-8 w-full bg-gray-50 p-4 rounded-lg border border-gray-300 text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            {result.symbol} Prediction
          </h2>
          <p className="text-gray-600">Prediction: <b>{result.prediction}</b></p>
          <p>Accuracy: {Math.round(result.accuracy * 100)}%</p>
          <p>Precision: {Math.round(result.precision * 100)}%</p>
          <p>Chance Up: {result.prob_up}%</p>
          <p>Chance Down: {result.prob_down}%</p>
        </div>
      )}
    </div>
  );
}
