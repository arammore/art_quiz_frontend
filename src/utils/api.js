export async function fetchQuiz({ mode, art_movements, num_questions, num_options }) {
  const response = await fetch("http://localhost:5000/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode,
      art_movements,
      num_questions,
      num_options
    })
  });

  if (!response.ok) throw new Error("Error al obtener preguntas");
  return await response.json();
}
