import { useState, useCallback } from "react";
import questions from "../questions";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./timer";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const questionIndex =
    selectedState === "" ? userAnswer.length : userAnswer.length - 1;

  const isQuizCompleted = questionIndex === questions.length;

  let TIMER = 6000;
  const updateAnswer = useCallback(
    (answer) => {
      setUserAnswer((prev) => [...prev, answer]);
      if (answer !== "") {
        setSelectedState("selected");
        console.log("selected");
        setTimeout(() => {
          TIMER = 1000;
          if (answer === questions[questionIndex].answers[0]) {
            setSelectedState("correct");
            console.log("correct");
          } else {
            setSelectedState("wrong");
            console.log("wrong");
          }
        }, 1000);
        setTimeout(() => {
          TIMER = 2000;
          setSelectedState("");
          console.log("reset");
        }, 2000);
      }
    },
    [questionIndex]
  );

  const handleSkip = useCallback(() => {
    if (selectedState === "") updateAnswer("");
  }, [updateAnswer, selectedState]);

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

  const shuffledAnswers = questions[questionIndex].answers;
  if (selectedState === "") {
    shuffledAnswers.sort(() => Math.random() - 0.5);
  }
  return (
    <div id="quiz">
      <div id="question">
        <p>{questions[questionIndex].text}</p>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button
                className={
                  userAnswer[questionIndex] === answer ? selectedState : ""
                }
                onClick={() => updateAnswer(answer)}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <QuestionTimer key={questionIndex} timer={TIMER} onTimeUp={handleSkip} />
    </div>
  );
}
