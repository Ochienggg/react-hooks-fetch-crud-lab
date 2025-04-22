import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  const questionActual = questions.map((question, index) => (
    <QuestionItem
      key={index}
      question={question}
      setQuestions={setQuestions}
      questions={questions}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionActual}</ul>
    </section>
  );
}

export default QuestionList;
