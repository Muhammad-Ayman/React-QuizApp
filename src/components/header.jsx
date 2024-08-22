import quizlogo from "../assets/quiz-logo.png";
export default function Header() {
  return (
    <header>
      <img src={quizlogo} />
      <h1>My Blog</h1>
    </header>
  );
}
