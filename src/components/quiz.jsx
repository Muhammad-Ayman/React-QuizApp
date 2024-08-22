import { useState, useCallback } from "react";
import questions from "../questions";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./timer";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const questionIndex = userAnswer.length;
  const isQuizCompleted = questionIndex === questions.length;

  const TIMER = 3000;
  const updateAnswer = useCallback((answer) => {
    setUserAnswer((prev) => [...prev, answer]);
  }, []);

  const handleSkip = useCallback(() => {
    updateAnswer("");
  }, [updateAnswer]);

  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompletedImg} />
        <h2>Congratulations! You have completed the quiz.</h2>
        <p>
          You have answered{" "}
          {
            userAnswer.filter(
              (answer, index) => answer === questions[index].answers[0]
            ).length
          }{" "}
          out of {questions.length} questions correctly.
        </p>
      </div>
    );
  }

  const shuffledAnswers = questions[questionIndex].answers.sort(
    () => Math.random() - 0.5
  );
  return (
    <div id="quiz">
      <div id="question">
        <p>{questions[questionIndex].text}</p>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => updateAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
      <QuestionTimer key={questionIndex} timer={TIMER} onTimeUp={handleSkip} />
    </div>
  );
}
