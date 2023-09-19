import React from "react";
import Box from "./Box";
import Timer from "./Timer";
import Confetti from "react-confetti";
import { getLocal, saveLocal } from "../localstorage";

//TODO:
// Save the best time to localStorage

// NOTE: 
// Time and Best time is not the same when the best time is defined

function App() {
  const [numbers, setNumbers] = React.useState(boxesArr(1, 6));
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  const localStorageStats = getLocal("stats");

  // Winning condition
  React.useEffect(() => {
    const allHeld = numbers.every((obj) => obj.isHeld == true);
    const allSame = numbers.every((obj) => obj.value == numbers[0].value);
    if (allHeld && allSame) {
      setTenzies(true);
      
      //Stop timer
      setIsRunning(false);
    }
  }, [numbers]);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function createNewBox(min, max, index) {
    return {
      value: getRandomIntInclusive(min, max),
      isHeld: false,
      id: index,
    };
  }

  function boxesArr(min, max) {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(createNewBox(min, max, i));
    }
    return arr;
  }

  function rollBoxesArr(min, max) {
    setIsRunning(true);
    if (tenzies) {
      setTenzies(false);
      setNumbers(boxesArr(1, 6));
      setRolls(0);
    } else {
      setNumbers((prevNumbers) => {
        return prevNumbers.map((obj, index) => {
          return obj.isHeld ? obj : createNewBox(min, max, index);
        });
      });
      setRolls((prevRolls) => {
        return prevRolls + 1;
      });
    }
  }

  function handleClick(id) {
    setIsRunning(true);
    setNumbers((prevNumbers) => {
      return prevNumbers.map((obj) => {
        return obj.id === id ? { ...obj, isHeld: !obj.isHeld } : obj;
      });
    });
  }

  // Create elements
  const elements = numbers.map((obj) => {
    return (
      <Box key={obj.id} props={obj} handleClick={() => handleClick(obj.id)} />
    );
  });

  return (
    <main>
      {tenzies ? <Confetti /> : null}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="play-area">{elements}</div>
      <button type="button" onClick={() => rollBoxesArr(1, 6)}>
        {tenzies ? "New game" : "Roll"}
      </button>
      <div className="stats">
        <p>Rolls: {rolls}</p>
        <Timer
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          tenzies={tenzies}
        />
      </div>
    </main>
  );
}

export default App;
