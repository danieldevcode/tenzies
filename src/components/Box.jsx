import React from "react";
import "../styles/box.css";

function Box({ props, handleClick }) {
  function createDots() {
    const dotsArr = [];
    for (let i = 1; i <= props.value; i++) {
      dotsArr.push(
        <div key={`${props.id}${i}`} className={`dot ${i % 2 == 0 ? "start" : "end"}`}></div>
      );
    }
    return dotsArr;
  }

  const elements = createDots();

  return (
    <div
      id={props.id}
      className={
        (props.isHeld ? "box active" : "box") + (props.value == 1 ? " one" : "")
      }
      onClick={handleClick}
    >
      {elements}
    </div>
  );
}

export default Box;
