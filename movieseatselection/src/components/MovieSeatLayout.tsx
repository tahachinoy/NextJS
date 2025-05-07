'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Seat from './Seat';
import { Movie } from '../data/movies';

const occupiedSeats = ['a8','a9','b8','b9','c8','c9','d8','d9'];

type Props = { movie: Movie };

export default function MovieSeatLayout({ movie }: Props) {
  const storageKey = `selectedSeats_${movie.title}`;


  const [selectedSeats, setSelectedSeats] = useState<string[]>(() => {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved).seats : [];
  });

  const toggleSeat = (id: string) => {
    setSelectedSeats((prev) => {
      const next = prev.includes(id)? prev.filter(s => s !== id): [...prev, id];
      localStorage.setItem(storageKey, JSON.stringify({ title: movie.title, seats: next}));
      return next;
    });
  };

  
  const resetSeats = () => {
    setSelectedSeats([]);
    localStorage.removeItem(storageKey);
  };

  const totalPrice = movie.price * selectedSeats.length;

  return (
    <div className="container mx-auto p-6">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Movies
      </Link>

      <h1 className="text-2xl font-bold text-center">{movie.name}</h1>
      <p className="mb-2 text-center">Price: ${movie.price}</p>
      <div className="flex justify-center mb-6">
        <img src={movie.image} alt={movie.name} className="max-w-xs rounded" />
      </div>
      <p className="mb-6 text-center">{movie.description}</p>

      <div className="space-y-2">
        {(['a','b','c','d'] as const).map(row => (
          <div key={row} className="flex justify-center">
            {Array.from({ length: 16 }).map((_, i) => {
              const id = `${row}${i + 1}`;
              return (
                <Seat
                  key={id}
                  id={id}
                  occupied={occupiedSeats.includes(id)}
                  selected={selectedSeats.includes(id)}
                  onToggle={toggleSeat}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        You have selected <strong>{selectedSeats.length}</strong> seat
        {selectedSeats.length !== 1 && 's'} for <strong>{movie.name}</strong>.<br/>
        <strong>Total:</strong> ${totalPrice}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={resetSeats}
        >
          Reset Seats
        </button>
      </div>
    </div>
  );
}
