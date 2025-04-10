import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 text-center">
      <Film className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-xl mb-6">Oops, la película que buscás no está en cartelera...</p>
      <Link 
        to="/" 
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all"
      >
        Volver al inicio
      </Link>
    </div>
  );
}