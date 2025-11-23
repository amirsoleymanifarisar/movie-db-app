"use client";

export default function FilterBar() {
  return (
    <div className="mt-10 w-full max-w-5xl mx-auto bg-white/90 dark:bg-night-900/60 backdrop-blur-lg border border-gray-200 dark:border-night-600 rounded-2xl p-8 shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Top Rated Movies</h2>

      <form className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Release year */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Release Year
          </label>
          <input
            type="number"
            name="year"
            placeholder="e.g. 2020"
            className="px-4 py-3 rounded-xl bg-white dark:bg-night-800 border border-imdb-500 dark:border-night-600 text-black dark:text-gray-100 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-imdb-500 focus:border-imdb-500"
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Min Rating
          </label>
          <select
            name="rating"
            className="px-4 py-3 rounded-xl bg-white dark:bg-night-800 border border-imdb-500 dark:border-night-600 text-black dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-imdb-500 focus:border-imdb-500"
          >
            {[0, 2, 4, 6, 8].map((r) => (
              <option key={r} value={r}>
                {r}+
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-imdb-600 hover:bg-imdb-500 transition-colors rounded-xl font-semibold text-black shadow-md shadow-imdb-600/30"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}
