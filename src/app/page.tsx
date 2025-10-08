import StockPredictor from "./components/StockPredictor";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <StockPredictor />
      <footer className="mt-10 text-gray-700 text-sm">
        Powered by FastAPI + Next.js 💻
      </footer>
    </main>
  );
}
