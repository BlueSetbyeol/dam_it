"use client";

import type {
  quizRoom,
  roomQuestions,
  objectToQuiz,
} from "../../types/quizType";
import quiz from "../../lib/quiz_schema.json";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Logo from "../../../../public/logo_dam_it.png";
import Sort from "../../../../public/sorting electronic waste.png";
import Repair from "../../../../public/electronic-product-repair.png";
import Image from "next/image";
import Link from "next/link";

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

  const [firstQuestion, setFirstQuestion] = useState<objectToQuiz>();
  const [firstAnswer, setFirstAnswer] = useState<string[]>();
  const [secondQuestion, setSecondQuestion] = useState<objectToQuiz>();
  const [secondAnswer, setSecondAnswer] = useState<string[]>();

  useEffect(() => {
    const random = Math.floor(Math.random() * questionsAvailable.length);
    if (random) {
      const newFirstQuestion = objects_to_sort.find(
        (sort) =>
          sort.id === Number(questionsAvailable[random].object_to_sort_id)
      );
      setFirstQuestion(newFirstQuestion);
      const newSecondQuestion = objects_to_repair.find(
        (sort) =>
          sort.id === Number(questionsAvailable[random].object_to_repair_id)
      );
      setSecondQuestion(newSecondQuestion);
    }
  }, []);
  useEffect(() => {
    if (firstQuestion && secondQuestion) {
      const setOfFirstAnswer: string[] = [];
      firstQuestion.good_answer.forEach((goodAnswer) => {
        const findAnswer = firstQuestion.answers.find(
          (answer) => answer.name === goodAnswer
        );
        if (findAnswer) {
          setOfFirstAnswer.push(findAnswer.value);
        }
      });
      setFirstAnswer(setOfFirstAnswer);

      const setOfSecondAnswer: string[] = [];
      secondQuestion.good_answer.forEach((goodAnswer) => {
        const findAnswer = secondQuestion.answers.find(
          (answer) => answer.name === goodAnswer
        );
        if (findAnswer) {
          setOfSecondAnswer.push(findAnswer.value);
        }
      });
      setSecondAnswer(setOfSecondAnswer);
    }
  }, [firstQuestion]);

  const [finalScore, setFinalScore] = useState<number>(0);

  const handleCheckingAnswer = (num: number, answerToCheck: string) => {
    let score = finalScore;
    if (num === 1 && firstQuestion) {
      const rigthAnswer = firstQuestion.good_answer.includes(answerToCheck);
      if (rigthAnswer) {
        score++;
      }
    }
    if (num === 2 && secondQuestion) {
      const rigthAnswer = secondQuestion.good_answer.includes(answerToCheck);
      if (rigthAnswer) {
        score++;
      }
    }
    setFinalScore(score);
  };

  const [popUpClose, setPopUpClose] = useState(false);
  const [beginToFinish, setBeginToFinish] = useState(true);
  const [endGame, setEndGame] = useState(false);

  if (firstQuestion) {
    console.log(firstQuestion.image.length > 24);
  }

  return (
    <>
      {!endGame ? (
        <section className="quizRoom">
          {beginToFinish ? (
            !popUpClose ? (
              <article className="mission_zone">
                <Image src={Sort} alt="logo dam IT" className="logo_icone" />
                <p>{firstQuestion?.mission}</p>
                <button type="button" onClick={() => setPopUpClose(true)}>
                  Choose an answer
                </button>
              </article>
            ) : (
              <article className="answer_zone">
                <p>Question : {firstQuestion?.mission}</p>
                <div>
                  {firstQuestion?.answers.map((object) => (
                    <button
                      type="button"
                      key={object.name}
                      className="solutions"
                      onClick={() => {
                        handleCheckingAnswer(1, object.name);
                        setBeginToFinish(false);
                        setPopUpClose(false);
                      }}
                    >
                      {object.value}
                    </button>
                  ))}
                </div>
              </article>
            )
          ) : !popUpClose ? (
            <article className="mission_zone">
              <Image
                src={Repair}
                alt="logo dam IT"
                className="logo_icone"
              ></Image>
              <p>{secondQuestion?.mission}</p>
              <button type="button" onClick={() => setPopUpClose(true)}>
                Choose an answer
              </button>
            </article>
          ) : (
            <article className="answer_zone">
              <p>
                Question n° {secondQuestion?.id}: {secondQuestion?.mission}
              </p>
              <div>
                {secondQuestion?.answers.map(
                  (object) =>
                    object.value && (
                      <button
                        type="button"
                        key={object.name}
                        className="solutions"
                        onClick={() => {
                          handleCheckingAnswer(2, object.name);
                          setEndGame(true);
                        }}
                      >
                        {object.value}
                      </button>
                    )
                )}
              </div>
            </article>
          )}
        </section>
      ) : (
        <article className="final_result">
          <h3>Your result is : {finalScore}/2</h3>
          <p>
            Step to :{" "}
            {finalScore > 0
              ? `${finalScore} steps forward`
              : "the same step you are on"}
          </p>
          <p id="details">For your information :</p>
          <section>
            <article className="more_information">
              <div className="info_card">
                <p>❓ : {firstQuestion?.mission}</p>
                <p>❗ : {firstAnswer}</p>
              </div>
              <div className="info_card">
                <p>✔️ : {firstQuestion?.precision}</p>
              </div>
            </article>
            <article className="more_information">
              <div className="info_card">
                <p>❓ : {secondQuestion?.mission}</p>
                <p>❗ : {secondAnswer}</p>
              </div>
              <div className="info_card">
                <p>✔️ : {secondQuestion?.precision}</p>
              </div>
            </article>
          </section>
          <Link href="/">Go back Home ↩</Link>
        </article>
      )}
    </>
  );
}
