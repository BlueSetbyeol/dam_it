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
  }, []);

  let firstQuestion;
  let secondQuestion;
  const answersOfQuestions: string[][] = [];

  if (randomQuestion) {
    firstQuestion = objects_to_sort.find(
      (sort) =>
        sort.id === Number(questionsAvailable[randomQuestion].object_to_sort_id)
    );
    if (firstQuestion) {
      answersOfQuestions.push(firstQuestion.good_answer);
    }
  }
  if (randomQuestion) {
    secondQuestion = objects_to_repair.find(
      (sort) =>
        sort.id ===
        Number(questionsAvailable[randomQuestion].object_to_repair_id)
    );
    if (secondQuestion) {
      answersOfQuestions.push(secondQuestion.good_answer);
    }
  }

  console.log(answersOfQuestions);

  const [popUpClose, setPopUpClose] = useState(false);
  const [beginToFinish, setBeginToFinish] = useState(true);
  const [endGame, setEndGame] = useState(false);

  const answerToKeep: string[] = [];
  const [answerToCheck, setAnswerToCheck] = useState<string[]>([]);
  console.log(answerToCheck);

  let score = 0;

  const checkingAnswer = (
    answersOfQuestions: string[][],
    answerToCheck: string[]
  ) => {
    if (answersOfQuestions && answerToCheck) {
      answersOfQuestions.forEach((answer) => {
        answer.forEach((possibilities) => {
          if (answerToCheck.includes(possibilities)) {
            score += 1;
          }
        });
      });
    }
  };

  checkingAnswer(answersOfQuestions, answerToCheck);

  return (
    <>
      <section>
        {beginToFinish ? (
          !popUpClose ? (
            <article>
              <button type="button" onClick={() => setPopUpClose(true)}>
                X
              </button>
              <p>{firstQuestion?.mission}</p>
            </article>
          ) : (
            <article className="answer_zone">
              {firstQuestion?.answers.map((object) => (
                <button
                  type="button"
                  key={object.name}
                  className="solutions"
                  onClick={() => {
                    answerToKeep.push(object.name);
                    setAnswerToCheck(answerToKeep);
                    setBeginToFinish(false);
                    setPopUpClose(false);
                  }}
                >
                  {object.value}
                </button>
              ))}
            </article>
          )
        ) : !popUpClose ? (
          <article>
            <button type="button" onClick={() => setPopUpClose(true)}>
              X
            </button>
            <p>{secondQuestion?.mission}</p>
          </article>
        ) : (
          <article className="answer_zone">
            {secondQuestion?.answers.map((object) => (
              <button
                type="button"
                key={object.name}
                className="solutions"
                onClick={() => {
                  answerToKeep.push(object.name);
                  setAnswerToCheck(answerToKeep);
                  setEndGame(false);
                }}
              >
                {object.value}
              </button>
            ))}
          </article>
        )}
      </section>
      {endGame && <p>Your result is : {score}/2</p>}
    </>
  );
}
