import { useEffect } from "react";
import Header from "./Header.jsx";
import Mainn from "./Mainn.jsx";
import { useReducer } from "react";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";
import Progress from "./Progress.jsx";
import FinishScreen from "./FinishScreen.jsx";
import Timer from "./Timer.jsx";

const initialState = {
  questions: [],
  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highestScore: 0,
  secondsRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 60,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index:
          state.index + 1 > state.questions.length
            ? (state.index = state.questions.length)
            : state.index + 1,
        answer: null,
      };
    case "prevQuestion":
      return {
        ...state,
        index: state.index - 1 < 0 ? (state.index = 0) : state.index - 1,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highestScore:
          state.points > state.highestScore ? state.points : state.highestScore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highestScore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => curr.points + acc, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Mainn>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen length={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highestScore={highestScore}
            dispatch={dispatch}
          />
        )}
      </Mainn>
    </div>
  );
}
