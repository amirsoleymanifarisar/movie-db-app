import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();

  await prisma.favorite.create({
    data: {
      user: { connect: { email: session.user.email } },
      movie: {
        connectOrCreate: {
          where: { id: body.id },
          create: {
            id: body.id,
            title: body.title,
            posterUrl: body.posterUrl || "",
            overview: body.overview || "",
            releaseDate: body.releaseDate || "",
          },
        },
      },
    },
  });

  return NextResponse.json({ success: true });
}
