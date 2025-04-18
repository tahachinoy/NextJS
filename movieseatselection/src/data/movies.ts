export type Movie = {
  title: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const movies: Movie[] = [
  {
    title: 'animal',
    name: 'Animal',
    price: 10,
    description: 'A thrilling wildlife adventure.',
    image: '/images/animal.jpg',
  },
  {
    title: 'zindagi-naa-milegi-dobara',
    name: 'Zindagi Naa Milegi Dobara',
    price: 15,
    description: 'A journey of friendship and self-discovery.',
    image: '/images/znmd.jpg',
  },
  {
    title: 'hera-pheri',
    name: 'Hera Pheri',
    price: 20,
    description: 'Comedy of errors and hilarious capers.',
    image: '/images/hera.jpg',
  },
  {
    title: 'don',
    name: 'Don',
    price: 25,
    description: 'Action-packed crime thriller.',
    image: '/images/don.jpg',
  },
];
