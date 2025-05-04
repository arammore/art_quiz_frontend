import React from 'react';

export default function ResultsSummary({ total, correct, questions }) {
  const failed = questions.filter(q => q.user_answer !== q.correct_option.name);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl text-center">
      <h2 className="text-2xl font-semibold mb-2">Resumen</h2>
      <p className="text-lg">Acertaste {correct} de {total}</p>
      <p className="text-green-600 font-bold text-xl mb-4">{((correct / total) * 100).toFixed(1)}%</p>

      {failed.length > 0 && (
        <div className="text-left mt-6">
          <h3 className="text-xl font-semibold mb-2 text-red-600">Respuestas incorrectas:</h3>
          <ul className="space-y-3">
            {failed.map((q, idx) => (
              <li key={idx} className="p-4 border rounded bg-gray-50">
                <p><strong>Obra:</strong> {q.artwork_title}</p>
                <p><strong>Tu respuesta:</strong> {q.user_answer}</p>
                <p><strong>Correcta:</strong> {q.correct_option.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Volver a jugar
      </button>
    </div>
  );
}
