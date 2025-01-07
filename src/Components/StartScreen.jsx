/* eslint-disable react/prop-types */
import React from "react";

function StartScreen({ length, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to react quiz</h2>
      <h3>{length} Questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
