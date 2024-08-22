import { useState } from "react";
import questions from "../questions";
export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  const qustionIndex = userAnswer.length;

  return (
    <div id="quiz">
      <div id="question">
        <p>{questions[qustionIndex].text}</p>
        <ul id="answers">
          {questions[qustionIndex].answers.map((answer) => (
            <li key={answer} className="answer">
              <button
                onClick={() => setUserAnswer((prev) => [...prev, answer])}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
