"use server";

import { NextResponse, type NextRequest } from "next/server";
import sql from "@/app/lib/database";
import type {
  quizRoom,
  roomQuestions,
  objectToQuiz,
} from "./../../types/quizType";

export async function getRooms(req: NextRequest) {
  try {
    const result: quizRoom[] = await sql`SELECT * from quiz_room`;
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function getQuestions(req: NextRequest) {
  const request: quizRoom = await req.json();
  try {
    const result: quizRoom[] =
      await sql`SELECT * questions_to_ask where quiz_room_id = ${request.id}`;
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  const request = await req.json();
  try {
    const result =
      await sql`INSERT into pokemon_to_exchange (id_pokemon, name_pokemon, age_pokemon) values (${request.id_pokemon}, ${request.name_pokemon}, ${request.age_pokemon}) RETURNING id`;
    return NextResponse.json(result[0].id, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
