import { notFound } from 'next/navigation';
import MovieSeatLayout from '../../components/MovieSeatLayout';
import { movies } from '../../data/movies';

export async function generateStaticParams() {
  return movies.map((movie) => ({ slug: movie.title }));
}

type Params = { slug: string };

export default function MoviePage({ params }: { params: Params }) {
  const movie = movies.find((movie) => movie.title === params.slug);
  if (!movie) return notFound();
  return <MovieSeatLayout movie={movie} />;
}
