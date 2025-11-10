// src/app/page.tsx

const BASE_URL = "https://api.themoviedb.org/3";

export default async function Home() {
  const url = `${BASE_URL}/trending/all/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

  // Fetch the data from TMDB
  const res = await fetch(url, { next: { revalidate: 10000 } });

  if (!res.ok) {
    // Log the response status for debugging
    console.error("Fetch failed with status:", res.status);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const results = data.results;

  // 8. Display a list of movie titles
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trending This Week</h1>
      {/* Ensure results is an array before mapping */}
      {Array.isArray(results) &&
        results.map((result: any) => (
          <div key={result.id} className="border-b py-2">
            <p className="text-lg">{result.title || result.name}</p>
          </div>
        ))}
    </div>
  );
}
