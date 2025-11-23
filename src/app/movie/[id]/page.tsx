import Image from "next/image";
import Card from "@/app/components/Card";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movieId = params.id;

  // Movie details
  const movieRes = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 10000 } }
  );
  if (!movieRes.ok) throw new Error("Failed to fetch movie details");
  const movie = await movieRes.json();

  // Cast
  const creditsRes = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const creditsData = await creditsRes.json();
  const cast = creditsData.cast || [];

  // Videos (trailer)
  const videoRes = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const videoData = await videoRes.json();
  const trailer = videoData.results?.find(
    (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  // Similar movies
  const similarRes = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const similarData = await similarRes.json();
  const similarMovies = similarData.results || [];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-night-900 text-gray-900 dark:text-gray-100 pb-16">
      {/* HERO SECTION */}
      <section className="relative max-w-6xl mx-auto mt-6 px-4">
        {/* Background blur image */}
        {movie.backdrop_path && (
          <div className="absolute inset-0 -z-10 opacity-30 blur-3xl">
            <Image
              src={`${IMAGE_BASE}${movie.backdrop_path}`}
              alt={movie.title || "Background"}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 bg-white/90 dark:bg-night-900/60 rounded-2xl p-5 md:p-8 border border-gray-200 dark:border-night-600 shadow-xl shadow-black/10">
          {/* Poster */}
          <div className="relative w-full md:w-1/3 max-w-xs mx-auto md:mx-0 aspect-[2/3] overflow-hidden rounded-2xl border border-gray-200 dark:border-night-600 bg-white dark:bg-black">
            <Image
              src={`${IMAGE_BASE}${movie.poster_path || movie.backdrop_path}`}
              alt={movie.title || "Movie poster"}
              fill
              className="object-cover"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {movie.title || movie.name}
              </h1>

              <p className="text-sm text-gray-400 mb-4">
                {movie.release_date} • {movie.runtime} min
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres?.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-night-700 border border-gray-200 dark:border-night-600 text-gray-800 dark:text-gray-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                {movie.overview}
              </p>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-night-800 border border-gray-200 dark:border-night-600 px-4 py-1.5">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Rating
                </span>
                <span className="text-lg font-bold text-imdb-500">
                  {movie.vote_average?.toFixed(1)}/10
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {movie.vote_count} votes on TMDB
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAST SECTION */}
      {cast.length > 0 && (
        <section className="mt-10 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {cast.slice(0, 10).map((actor: any) => (
              <div
                key={actor.cast_id}
                className="bg-[#0b0b10] border border-[#2a2a2d] rounded-xl p-3 flex flex-col items-center shadow-md shadow-black/40"
              >
                <div className="w-24 h-24 relative bg-black rounded-full overflow-hidden">
                  {actor.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                      alt={actor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      No Image
                    </span>
                  )}
                </div>

                <p className="mt-3 font-semibold text-center text-gray-100 text-sm">
                  {actor.name}
                </p>
                <p className="text-xs text-gray-400 text-center">
                  as {actor.character}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TRAILER SECTION */}
      {trailer && (
        <section className="mt-10 max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
          <div className="rounded-2xl overflow-hidden border border-[#2a2a2d] shadow-xl shadow-black/60 bg-black">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* SIMILAR MOVIES SECTION */}
      {similarMovies.length > 0 && (
        <section className="mt-12 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarMovies.slice(0, 8).map((m: any) => (
              <Card key={m.id} result={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
