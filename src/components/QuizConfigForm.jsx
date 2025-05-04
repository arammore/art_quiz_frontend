import React, { useState } from 'react';

export default function QuizConfigForm({ onStart }) {
  const [mode, setMode] = useState("recognize_the_artist");
  const [numQuestions, setNumQuestions] = useState(5);
  const [numOptions, setNumOptions] = useState(4);
  const [artMovements, setArtMovements] = useState("Cubism,Impressionism");

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({
      mode,
      art_movements: artMovements.split(',').map(m => m.trim()),
      num_questions: parseInt(numQuestions),
      num_options: parseInt(numOptions)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-4 mt-10">
      <h2 className="text-2xl font-semibold text-center">Configura tu Quiz</h2>
      <label className="block">
        Modo:
        <select value={mode} onChange={(e) => setMode(e.target.value)} className="block w-full mt-1 p-2 border rounded">
          <option value="recognize_the_artist">¿Quién es el autor?</option>
          <option value="guess_the_artist_name">¿Cómo se llama este artista?</option>
        </select>
      </label>
      <label className="block">
        Número de preguntas:
        <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} className="block w-full mt-1 p-2 border rounded"/>
      </label>
      <label className="block">
        Opciones por pregunta:
        <input type="number" value={numOptions} onChange={(e) => setNumOptions(e.target.value)} className="block w-full mt-1 p-2 border rounded"/>
      </label>
      <label className="block">
        Movimientos artísticos:
        <input type="text" value={artMovements} onChange={(e) => setArtMovements(e.target.value)} className="block w-full mt-1 p-2 border rounded"/>
      </label>
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Empezar</button>
    </form>
  );
}
