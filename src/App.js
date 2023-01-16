import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useEffect, useRef, useState } from "react";
import './App.css';
import { areSame, hasArray, randomCell } from "./helper";

function App() {
  const [table, setTable] = useState([[]]);
  const [begin, setBegin] = useState(randomCell());
  const [target, setTarget] = useState(randomCell());
  const [walls, setWalls] = useState([]);
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    var temp = [];
    for (let i = 0; i < Math.floor(window.innerHeight / 25); i++) {
      temp.push([]);
      for (let j = 0; j < Math.floor(window.innerWidth / 25); j++) {
        temp[i][j] = 0;
      }
    }
    setTable(temp);
  }, [begin, target, walls]);

  const setWall = (wall) => {
    setWalls(prev => {
      return [...prev, wall]
    })
  }
  const removeWall = (wall) => {
    setWalls(
      walls.filter(w => !areSame(w, wall))
    );
  }

  const dragStart = (e, position) => {
    dragItem.current = position;
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  }

  const drop = (e) => {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if(areSame(from, begin) && !areSame(to, target)){
      setBegin(to);
    }
    if(areSame(from, target) && !areSame(to, begin)){
      setTarget(to)
    }
  }

  return (
    <div className="App">
      <div className="container-fluid" id="table-container">
        {
        table?.map((row, i) => 
          <div className="d-flex" key={i + Math.random()}>
            {
              row?.map((col, j) =>{
                if(areSame([i, j], begin)){
                  return <div className="cell begin-cell" 
                  onDragStart={(e) => dragStart(e, [i, j])}
                  onDragEnter={(e) => dragEnter(e, [i, j])}
                  onDragEnd={drop}
                  key={i + j} draggable></div>
                }
                else if(areSame([i, j], target)){
                  return <div className="cell target-cell" 
                  onDragStart={(e) => dragStart(e, [i, j])}
                  onDragEnter={(e) => dragEnter(e, [i, j])}
                  onDragEnd={drop}
                  key={i + j} draggable></div>
                }
                else if(hasArray(walls, [i, j])){
                  return <div onClick={() => removeWall([i, j])} className="cell wall-cell" key={i + j}></div>
                }
                else return <div onClick={() => setWall([i, j])}
                onDragEnter={(e) => dragEnter(e, [i, j])}
                onDragEnd={drop}
                className="cell" key={i + j}></div>
              })
            }
          </div>
        )
        }
      </div>
    </div>
  );
}

export default App;
