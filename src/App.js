import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
function App() {
  const [level, setLevel] = useState(1);
  const [columns, setColumns] = useState("");
  const [data, setData] = useState([]);
  const [bgColor, setBgColor] = useState([]);
  const [points, setPoints] = useState(0);
  const [bomb, setBomb] = useState(false);
  const [removeBomb, setRemoveBomb] = useState(null);
  const [winArray, setWinArray] = useState([]);
  const [win, setWin] = useState(false);

  const random = (num) => Math.floor(Math.random() * num + 1);
  
     useEffect(() => {
    gameLevelPossibilities(1);
  }, []);

  const getArray = (arrLength) => {
    let arr = [];
    while (arr.length < arrLength) {
      let x = random(2);
      arr.push(x);
    }
    return arr;
  };
  const gameLevelPossibilities = (level) => {
    let newArray = [],
      arr = [],
      winningArray = [];
    let arrLength = Math.pow(level + 1, 2);
    let newArrayLength = Math.floor(arrLength / 2);
    while (newArray.length < newArrayLength) {
      let y = random(arrLength - 1);
      if (!newArray.includes(y)) {
        newArray.push(y);
      }
    }
    console.log("arr", arr);
    console.log("newArray", newArray);
    arr = getArray(arrLength);
    console.log("arr", arr);
    newArray.map((item, key) => (arr[item] = -1));
    // console.log("arr",arr);
    arr.map((item, key) => item !== -1 && winningArray.push(key));
    // console.log("winningArray", winningArray);
    let newLevel = level + 1;
    let columns = "";
    while (newLevel) {
      let update = `${columns} auto`;
      console.log("update",update);
      columns = update;
      newLevel = newLevel - 1;
    }

    setData(arr);
    setWinArray(winningArray);
    setBgColor([]);
    setPoints(0);
    setBomb(false);
    setWin(false);
    setLevel(level);
    setRemoveBomb(null);
    setColumns(columns);
  };
  
  const changeBackground = (key) => {
    console.log("key",key);
    let backgroundColor = bgColor;
    let winningArray = winArray;
    let arrayElement = data;
    let win = false;
    let scorePoints = points;

    if (!backgroundColor.includes(key)) {
      if (arrayElement[key] === -1) {
        backgroundColor.push(key);
        setRemoveBomb(key);
        setBgColor(backgroundColor);
        setBomb(true);
      } else {
        scorePoints += arrayElement[key];
        backgroundColor.push(key);
        if (backgroundColor.length === winningArray.length) {
          win = true;
        }
        setBgColor(backgroundColor);
        setPoints(scorePoints);
        setWin(win);
      }
    }
  };
  
  const handleChange = () => {
    gameLevelPossibilities(1);
  };
  const handleClick = () => {
    gameLevelPossibilities(level + 1);
  };

  let backgroundColor = bgColor;
  // console.log("bgColor", bgColor);
  return (
    <div>
      <div className="points">Your points : {points}</div>
      {bomb ? (
        <div className="gameOver">
          Game Over :
          <button className="btn" onClick={handleChange}>
            NewGame
          </button>
        </div>
      ) : (
        <></>
      )}
      {win ? (
        <div className="gameOver">
          You Win :
          <button className="btn" onClick={handleClick}>
            NextLevel
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className=" grid-container" style={{ gridTemplateColumns: columns }}>
        {data.map((item, key) => {
          // console.log("item", item);
          // console.log("key", key);
          return (
            <div
              key={key}
              className="grid-item"
              style={{
                background:
                  removeBomb === key || (win && item === -1)
                    ? "red"
                    : backgroundColor.includes(key)
                    ? "white"
                    : "black",
              }}
              onClick={!bomb && !win ? () => changeBackground(key) : null}
            >
              {removeBomb === key || (win && item === -1) ? "💣" : item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
