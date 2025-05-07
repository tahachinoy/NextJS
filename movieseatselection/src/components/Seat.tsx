'use client';
import React from 'react';

type SeatProps = {
  id: string;
  occupied: boolean;
  selected: boolean;
  onToggle: (id: string) => void;
  className?: string;
};

export default function Seat({id, occupied, selected, onToggle, className = ''}: SeatProps) {
  const base = 'w-8 h-8 m-1 text-sm rounded flex items-center justify-center cursor-pointer transition';
  const stateClass = occupied? 'bg-red-500 cursor-not-allowed': selected? 'bg-green-500 text-white': 'bg-gray-500 hover:bg-gray-600';

  return (
    <div
      id={id}
      className={`${base} ${stateClass} ${className}`.trim()}
      onClick={() => !occupied && onToggle(id)}
    >
      {id.toUpperCase()}
    </div>
  );
}
