import Option from "./Option";

function Question({ question, dispatch, answer, index, numQuestions }) {
  return (
    <div>
      <h4>{question.question}</h4>

      <Option question={question} dispatch={dispatch} answer={answer} />
      {index > 0 && (
        <button
          className="btn btn-ui2"
          onClick={() => dispatch({ type: "prevQuestion" })}
        >
          Prev
        </button>
      )}
      {index < numQuestions - 1 ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      )}
    </div>
  );
}

export default Question;
