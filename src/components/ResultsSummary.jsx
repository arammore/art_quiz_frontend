import React from 'react';

export default function ResultsSummary({ total, correct }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl text-center">
      <h2 className="text-2xl font-semibold mb-2">Resumen</h2>
      <p className="text-lg">Acertaste {correct} de {total}</p>
      <p className="text-green-600 font-bold text-xl">{((correct / total) * 100).toFixed(1)}%</p>
    </div>
  );
}
