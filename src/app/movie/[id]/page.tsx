const BASE_URL = "https://api.themoviedb.org/3";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movieId = params.id;
  const url = `${BASE_URL}/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const res = await fetch(url, { next: { revalidate: 10000 } });

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const movie = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="text-lg">{movie.overview}</p>
    </div>
  );
}
