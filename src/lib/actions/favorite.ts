"use server";

export async function addFavorite(movie: any) {
  await fetch("/api/favorite/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
}
