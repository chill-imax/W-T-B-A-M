import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    { id: 1, question: "¿De qué se alimentan los koalas?", answers: [{ text: "Bambú", correct: false }, { text: "Hojas de eucalipto", correct: true }, { text: "Carne", correct: false }, { text: "Pescado", correct: false }] },
    { id: 2, question: "¿Cuál fue la primera película de Walt Disney?", answers: [{ text: "Blancanieves y los siete enanitos", correct: true }, { text: "La Sirenita", correct: false }, { text: "Cenicienta", correct: false }, { text: "Moana", correct: false }] },
    { id: 3, question: "¿Cuál es la ciudad más poblada del mundo?", answers: [{ text: "Tokio - Japón", correct: true }, { text: "Shanghái - China", correct: false }, { text: "Nueva York - USA", correct: false }, { text: "Madrid - España", correct: false }] },
    { id: 4, question: "¿Cuántos huesos tiene el cuerpo humano?", answers: [{ text: "311", correct: false }, { text: "211", correct: false }, { text: "206", correct: true }, { text: "301", correct: false }] },
    { id: 5, question: "¿Cuál es el río más largo del mundo?", answers: [{ text: "Amazonas", correct: false}, { text: "Nilo", correct: true }, { text: "Misisipi", correct: false }, { text: "Caroní", correct: false }] },
    { id: 6, question: "¿Quién pintó la Mona Lisa?", answers: [{ text: "Vincent van Gogh", correct: false }, { text: "Leonardo da Vinci", correct: true }, { text: "Pablo Picasso", correct: false }, { text: "Claude Monet", correct: false }] },
    { id: 7, question: "¿Cuál es el planeta más grande del sistema solar?", answers: [{ text: "Saturno", correct: false }, { text: "Júpiter", correct: true }, { text: "Urano", correct: false }, { text: "Neptuno", correct: false }] },
    { id: 8, question: "¿En qué año llegó el hombre a la Luna?", answers: [{ text: "1969", correct: true }, { text: "1972", correct: false }, { text: "1965", correct: false }, { text: "1970", correct: false }] },
    { id: 9, question: "¿Cuál es el animal terrestre más rápido?", answers: [{ text: "Guepardo", correct: true }, { text: "León", correct: false }, { text: "Antílope", correct: false }, { text: "Tigre", correct: false }] },
    { id: 10, question: "¿Qué gas respiramos principalmente?", answers: [{ text: "Oxígeno", correct: true }, { text: "Nitrógeno", correct: false }, { text: "Dióxido de carbono", correct: false }, { text: "Hidrógeno", correct: false }] },
    { id: 11, question: "¿Cuál es el océano más grande del mundo?", answers: [{ text: "Atlántico", correct: false }, { text: "Pacífico", correct: true }, { text: "Índico", correct: false }, { text: "Ártico", correct: false }] },
    { id: 12, question: "¿Qué país es famoso por el sushi?", answers: [{ text: "China", correct: false }, { text: "Japón", correct: true }, { text: "Corea del Sur", correct: false }, { text: "Tailandia", correct: false }] },
    { id: 13, question: "¿Quién escribió Don Quijote de la Mancha?", answers: [{ text: "Gabriel García Márquez", correct: false }, { text: "Miguel de Cervantes", correct: true }, { text: "Mario Vargas Llosa", correct: false }, { text: "Pablo Neruda", correct: false }] },
    { id: 14, question: "¿Cuál es la capital de Australia?", answers: [{ text: "Sídney", correct: false }, { text: "Canberra", correct: true }, { text: "Melbourne", correct: false }, { text: "Brisbane", correct: false }] },
    { id: 15, question: "¿Qué instrumento tocaba Ludwig van Beethoven?", answers: [{ text: "Guitarra", correct: false }, { text: "Piano", correct: true }, { text: "Violín", correct: false }, { text: "Flauta", correct: false }] },
  ];

  // Seleccionar 20 preguntas aleatorias y desordenar sus respuestas
  const randomQuestions = useMemo(() => {
    return data
      .sort(() => Math.random() - 0.5)
      .slice(0, 20)
      .map(q => ({
        ...q,
        answers: q.answers.sort(() => Math.random() - 0.5),
      }));
  }, []);

  const moneyPyramid = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        amount: `$ ${Math.pow(2, i) * 100}`,
      })).reverse(),
    []
  );

  useEffect(() => {
    if (questionNumber > 1) {
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
    }
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={randomQuestions}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
