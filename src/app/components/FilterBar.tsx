"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [year, setYear] = useState(searchParams.get("year") || "");
  const [rating, setRating] = useState(searchParams.get("rating") || "0");

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (year) params.set("year", year);
    else params.delete("year");

    if (rating) params.set("rating", rating);
    else params.delete("rating");

    router.push("?" + params.toString());
  }

  return (
    <div className="flex flex-wrap gap-4 items-end bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
      {/* YEAR */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Release Year</label>
        <input
          type="number"
          placeholder="e.g. 2020"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* RATING */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Min Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
        >
          {[0, 5, 6, 7, 8].map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
      >
        Apply
      </button>
    </div>
  );
}
