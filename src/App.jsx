import React, { useState } from 'react';
import QuizConfigForm from './components/QuizConfigForm';
import QuestionCard from './components/QuestionCard';
import ResultsSummary from './components/ResultsSummary';
import { fetchQuiz } from './utils/api';

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const startQuiz = async (config) => {
    try {
      const data = await fetchQuiz(config);
      console.log("Preguntas recibidas:", data);
      if (!data.questions || data.questions.length === 0 ) {
        alert("No hay preguntas para esos filtros. Por favor, prueba otros valores.");
        return;
      }
      if (data.questions.length < config.num_questions) {
        alert(`Solo se han encontrado ${data.questions.length} preguntas para esos filtros (pediste ${config.num_questions}). Prueba a ampliar los filtros.`);
        return;
    }
      setQuestions(data.questions);
      setCurrentIndex(0);
      setCorrectCount(0);
      setFinished(false);
    } catch (error) {
      alert("Error al obtener preguntas. ¿Está corriendo el backend?");
    }
  };

  const handleAnswer = (isCorrect, selectedOption) => {
    // Guarda la respuesta del usuario en la pregunta actual
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].user_answer = selectedOption;

    setQuestions(updatedQuestions);
    if (isCorrect) setCorrectCount((c) => c + 1);
    if (currentIndex + 1 >= updatedQuestions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  if (finished)
    return (
      <ResultsSummary
        total={questions.length}
        correct={correctCount}
        questions={questions}
      />
    );

  if (questions.length > 0)
    return (
      <QuestionCard
        question={questions[currentIndex]}
        onAnswer={(isCorrect, option) => handleAnswer(isCorrect, option)}
      />
    );

  return <QuizConfigForm onStart={startQuiz} />;
}
