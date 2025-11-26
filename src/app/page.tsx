import Link from "next/link";
import rooms from "./lib/quiz_schema_V2.json";

export default function Home() {
  const availableSteps = rooms.quiz_room;
  return (
    <>
      <section className="welcome">
        <h1>Welcome to Dam I.T.</h1>
        <h2>Choose the step you are on :</h2>
        <article className="box_choice">
          {availableSteps.map((step) => (
            <Link href={`/quiz/${step.room_nd}`} key={step.id}>
              <button type="button" className="step_box">
                {step.room_nd}
              </button>
            </Link>
          ))}
        </article>
      </section>
    </>
  );
}
