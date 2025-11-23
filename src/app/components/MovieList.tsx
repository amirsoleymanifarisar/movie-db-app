"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "./Card";

export default function MovieList({ genre }: { genre: string }) {
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const year = searchParams.get("year") || "";
  const rating = searchParams.get("rating") || "";

  async function loadMovies(pageNumber: number) {
    setLoading(true);

    const BASE_URL = "https://api.themoviedb.org/3";
    const genrePath = "/discover/movie";

    const sortBy =
      genre === "topRated" ? "vote_average.desc" : "popularity.desc";

    const params = new URLSearchParams({
      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY!,
      language: "en-US",
      page: pageNumber.toString(),
      sort_by: sortBy,
    });

    if (genre === "topRated") params.set("vote_count.gte", "500");
    if (year) params.set("primary_release_year", year);
    if (rating && rating !== "0") params.set("vote_average.gte", rating);

    const res = await fetch(`${BASE_URL}${genrePath}?${params.toString()}`);
    const data = await res.json();

    setResults((prev) => [...prev, ...(data.results || [])]);
    setLoading(false);
  }

  useEffect(() => {
    setResults([]);
    setPage(1);
    loadMovies(1);
  }, [genre, year, rating]);

  function handleLoadMore() {
    const next = page + 1;
    setPage(next);
    loadMovies(next);
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {results.map((movie) => (
          <Card key={movie.id} result={movie} />
        ))}
      </div>

      <div className="flex justify-center my-8">
        <button
          onClick={handleLoadMore}
          className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
