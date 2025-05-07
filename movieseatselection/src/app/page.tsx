import Link from 'next/link';
import Image from 'next/image';
import { movies } from '../data/movies';

export default function HomePage() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
      <div className="grid grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.title}
            href={`/${movie.title}`}
            className="block border rounded-lg p-4 hover:shadow-lg transition"
          >
            <Image
              src={movie.image}
              alt={movie.name}
              width={300}
              height={400}
              className="rounded mb-3"
            />
            <h2 className="text-xl font-semibold">{movie.name}</h2>
            <p className="text-gray-400 mb-1">{movie.description}</p>
            <p className="font-bold">${movie.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
