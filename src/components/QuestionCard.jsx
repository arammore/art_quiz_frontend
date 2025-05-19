import React, { useEffect, useState } from 'react';

export default function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(10);

  // Temporizador
  useEffect(() => {
    setSecondsLeft(5); 
    setSelected(null);

    const interval = setInterval(() => {
      setSecondsLeft((sec) => {
        if (sec === 1) {
          clearInterval(interval);
          if (!selected) {
            // Timeout: Marca como no respondida a tiempo
            onAnswer(false, "No respondiste a tiempo");
          }
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [question]);

  const handleSelect = (option) => {
    setSelected(option);
    onAnswer(option === question.correct_option.name, option);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="mb-2 text-right text-lg text-blue-700 font-bold">
        Tiempo restante: {secondsLeft > 0 ? secondsLeft : 0}s
      </div>
      <h2 className="text-2xl font-semibold mb-4">{question.artwork_title}</h2>
      <img
        src={question.artwork_image_link}
        alt={question.artwork_title}
        className="w-full mb-6 rounded-xl"
        style={{ maxHeight: 350, objectFit: "contain" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            disabled={selected !== null}  // Deshabilita tras elegir o timeout
            onClick={() => handleSelect(option)}
            className={`py-2 px-4 rounded transition-all ${
              selected === option
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
