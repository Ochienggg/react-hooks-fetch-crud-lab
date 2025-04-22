import React from "react";

function QuestionItem({ question, setQuestions, questions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleCorrectAnswerChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value, 10); // Explicit conversion to int

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setQuestions((prevQuestions) => {
          const newQuestions = prevQuestions.map((questSus) => {
            if (questSus.id === id) {
              return { ...questSus, correctIndex: newCorrectIndex };
            } else {
              return questSus;
            }
          });
          return newQuestions;
        });
        console.log(data); // Log server response if needed
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setQuestions((prevQuestions) => {
          const remainingQuestions = prevQuestions.filter((quest) => quest.id !== id);
          return remainingQuestions;
        });
        console.log(data); // Log server response if needed
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

