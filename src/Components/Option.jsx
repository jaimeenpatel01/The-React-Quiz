function Option({ question, dispatch, answer }) {
  return (
    <>
      {question.options.map((opt, index) => (
        <>
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""}  ${
              answer !== null
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={opt}
            disabled={answer !== null}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {opt}
          </button>
          <br />
        </>
      ))}
    </>
  );
}

export default Option;
