import React from 'react';

export const Home = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1540655037529-dec987208707?auto=format&fit=crop&w=1920&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">ASSOCIATION</h1>
        <h2 className="text-8xl md:text-9xl font-bold mb-8">SQTE</h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Créativité, Innovation et Passion
        </p>
      </div>
    </div>
  );
}