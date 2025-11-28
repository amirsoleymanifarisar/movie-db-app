import React from "react";

export default async function FavoritesPage() {
  const res = await fetch("http://localhost:3000/api/favorite/list", {
    cache: "no-store",
  });
  const favorites = await res.json();

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {favorites.map((fav: any) => (
          <div key={fav.id} className="bg-gray-800 p-4 rounded-xl">
            <img
              src={`https://image.tmdb.org/t/p/w500${fav.movie.posterUrl}`}
              alt={fav.movie.title}
              className="rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-3">{fav.movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
