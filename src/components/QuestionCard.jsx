import React from 'react';

export default function QuestionCard({ question, onAnswer }) {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg text-center space-y-4 mt-10">
      <h2 className="text-2xl font-semibold">{question.artwork_title || "¿Quién es este artista?"}</h2>
      <img src={question.artwork_image_link} alt="Obra" className="w-full rounded-xl border shadow-sm" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option === question.correct_option.name, option)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
