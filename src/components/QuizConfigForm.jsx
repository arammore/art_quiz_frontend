import React, { useState, useEffect } from 'react';
import { fetchArtMovements } from '../utils/api';

export default function QuizConfigForm({ onStart }) {
  const [mode, setMode] = useState("recognize_the_artist");
  const [numQuestions, setNumQuestions] = useState(5);
  const [numOptions, setNumOptions] = useState(4);
  const [artMovements, setArtMovements] = useState([]);
  const [famousOnly, setFamousOnly] = useState(false);
  const [availableMovements, setAvailableMovements] = useState([]);
  const [yearMin, setYearMin] = useState("1900");
  const [yearMax, setYearMax] = useState("2025");


  useEffect(() => {
    fetchArtMovements()
      .then(setAvailableMovements)
      .catch((err) => {
        console.error(err);
        alert("Error al cargar los movimientos artísticos");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payload enviado:", {
      mode,
      art_movements: artMovements,
      num_questions: parseInt(numQuestions),
      num_options: parseInt(numOptions),
      famous_only: famousOnly,
      year_min: yearMin ? parseInt(yearMin) : null,
      year_max: yearMax ? parseInt(yearMax) : null
    });
    
    onStart({
      mode,
      art_movements: artMovements,
      num_questions: parseInt(numQuestions),
      num_options: parseInt(numOptions),
      famous_only: famousOnly,
      year_min: yearMin ? parseInt(yearMin) : null,
      year_max: yearMax ? parseInt(yearMax) : null
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
        <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} className="block w-full mt-1 p-2 border rounded" />
      </label>

      <label className="block">
        Opciones por pregunta:
        <input type="number" value={numOptions} onChange={(e) => setNumOptions(e.target.value)} className="block w-full mt-1 p-2 border rounded" />
      </label>

      <label className="block">
        Movimientos artísticos:
        <select
          multiple
          value={artMovements}
          onChange={(e) =>
            setArtMovements(Array.from(e.target.selectedOptions, (opt) => opt.value))
          }
          className="block w-full mt-1 p-2 border rounded h-40"
        >
          {availableMovements.map((movement) => (
            <option key={movement} value={movement}>
              {movement}
            </option>
          ))}
        </select>
      </label>

      <label className="block flex items-center space-x-2">
        <input
          type="checkbox"
          checked={famousOnly}
          onChange={(e) => setFamousOnly(e.target.checked)}
        />
        <span>Solo artistas famosos</span>
      </label>

      <label className="block">
        Año mínimo:
        <input
          type="number"
          value={yearMin}
          onChange={(e) => setYearMin(e.target.value)}
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        Año máximo:
        <input
          type="number"
          value={yearMax}
          onChange={(e) => setYearMax(e.target.value)}
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Empezar
      </button>
    </form>
  );
}
