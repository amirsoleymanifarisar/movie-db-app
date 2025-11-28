import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();

  await db.favorite.create({
    data: {
      user: { connect: { email: session.user.email } },
      movie: {
        connectOrCreate: {
          where: { id: body.id },
          create: {
            id: body.id,
            title: body.title,
            posterUrl: body.posterUrl ?? "",
            overview: body.overview ?? "",
            releaseDate: body.releaseDate
              ? new Date(body.releaseDate)
              : new Date(),
          },
        },
      },
    },
  });

  return NextResponse.json({ success: true });
}
