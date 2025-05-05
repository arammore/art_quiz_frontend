export async function fetchQuiz(config) {
  const response = await fetch("http://localhost:5000/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config)
  });

  if (!response.ok) throw new Error("Error al obtener preguntas");
  return await response.json();
}

export async function fetchArtMovements() {
  const response = await fetch("http://localhost:5000/art-movements");
  if (!response.ok) throw new Error("No se pudo cargar la lista de movimientos artísticos");
  return await response.json();
}
