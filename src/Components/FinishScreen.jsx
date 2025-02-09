function FinishScreen({ points, totalPoints, highestScore, dispatch }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints}(
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">Highest Score: {highestScore}</p>
      <button className="btn btn-ui" onClick={()=>dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
