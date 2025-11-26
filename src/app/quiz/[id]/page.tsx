"use client";

import type {
  quizRoom,
  roomQuestions,
  objectToQuiz,
} from "../../types/quizType";
import quiz from "../../lib/quiz_schema_V2.json";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Quiz() {
  const { id } = useParams();

  const rooms: quizRoom[] = quiz.quiz_room;
  const room_question: roomQuestions[] = quiz.question_to_ask;
  const objects_to_sort: objectToQuiz[] = quiz.object_to_sort;
  const objects_to_repair: objectToQuiz[] = quiz.object_to_repair;

  let questionsAvailable: roomQuestions[] = [];

  const roomId = rooms.find((room) => room.room_nd === Number(id));

  if (roomId) {
    room_question.forEach((question: roomQuestions) => {
      if (question.quiz_room_id === roomId.id.toString()) {
        questionsAvailable.push(question);
      }
    });
  }

  const [randomQuestion, setRandomQuestion] = useState<number>();

  useEffect(() => {
    const random = Math.floor(Math.random() * questionsAvailable.length);
    setRandomQuestion(random);
    console.log(randomQuestion);
  }, []);
  console.log(randomQuestion);

  let firstQuestion;
  let secondQuestion;

  if (randomQuestion) {
    firstQuestion = objects_to_sort.find(
      (sort) =>
        sort.id === Number(questionsAvailable[randomQuestion].object_to_sort_id)
    );
  }
  if (randomQuestion) {
    secondQuestion = objects_to_repair.find(
      (sort) =>
        sort.id ===
        Number(questionsAvailable[randomQuestion].object_to_repair_id)
    );
  }

  return (
    <section>
      <p>{firstQuestion?.mission}</p>
      {firstQuestion?.answers.map((object) => (
        <button type="button" key={object.name}>
          {object.value}
        </button>
      ))}
    </section>
  );
}
