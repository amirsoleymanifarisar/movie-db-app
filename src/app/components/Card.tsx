import Image from "next/image";
import Link from "next/link";

interface CardProps {
  result: any; // can be typed better later
}

export default function Card({ result }: CardProps) {
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const posterPath = result.backdrop_path ?? result.poster_path;

  return (
    <Link href={`/movie/${result.id}`}>
      <article
        className="
          group relative cursor-pointer
          rounded-xl overflow-hidden
          bg-[#1a1a1d] dark:bg-[#1a1a1d]
          border border-[#2a2a2d]
          shadow-lg shadow-black/40
          hover:shadow-2xl hover:shadow-black/70
          transform hover:scale-[1.03]
          transition-all duration-300
        "
      >
        {/* Poster */}
        <div className="relative w-full aspect-[2/3] bg-black">
          {posterPath ? (
            <Image
              src={`${imageUrl}${posterPath}`}
              alt={result.title || result.name || "Movie poster"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}

          {/* Subtle gradient & hover overlay */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t from-black/70 via-black/10 to-transparent
              opacity-80
            "
          />
        </div>

        {/* Info */}
        <div className="relative z-10 p-3">
          <h2
            className="
              text-sm sm:text-base font-semibold
              text-gray-100 dark:text-gray-100
              line-clamp-2
            "
          >
            {result.title || result.name}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            {result.release_date || result.first_air_date || "Unknown date"}
          </p>
        </div>
      </article>
    </Link>
  );
}
