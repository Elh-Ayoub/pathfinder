import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useEffect, useRef, useState } from "react";
import './App.css';
import { areSame, generateEnvArray, hasArray, randomCell, replaceBtnContainer } from "./helper";
import { findOptimalPath } from "./Pathfinder";

function App() {
  const [table, setTable] = useState([[]]);
  const [begin, setBegin] = useState(randomCell());
  const [target, setTarget] = useState(randomCell());
  const [walls, setWalls] = useState([]);
  const [path, setPath] = useState([]);
  const [opened, setOpened] = useState([]);
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
  }, [begin, target, walls, path]);

  const setWall = (wall) => {
    setPath([]);
    setOpened([]);
    setWalls(prev => {
      return [...prev, wall]
    })
  }
  const removeWall = (wall) => {
    setPath([]);
    setOpened([]);
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

  const start = () => {
    const grid = generateEnvArray(table, begin, target, walls);
    const [path_n, explored] = findOptimalPath(grid, begin, target);
    setPath(path_n);
    setOpened(explored);
  }

  const restart = async () => {
    setPath([]);
    setOpened([]);
    await new Promise(r => setTimeout(r, 1000));
    start();
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
                  key={i + j} id={i + j} draggable></div>
                }
                else if(areSame([i, j], target)){
                  return <div className="cell target-cell" 
                  onDragStart={(e) => dragStart(e, [i, j])}
                  onDragEnter={(e) => dragEnter(e, [i, j])}
                  onDragEnd={drop}
                  key={i + j} id={i + j} draggable></div>
                }
                else if(hasArray(walls, [i, j])){
                  return <div onClick={() => removeWall([i, j])} id={i + j} className="cell wall-cell" key={i + j}></div>
                }
                else if(hasArray(path, [i, j])){
                  return <div onClick={() => {setPath([]); setOpened([])}} id={i + j} className="cell path-cell" key={i + j}></div>
                }
                else if(hasArray(opened, [i, j])){
                  return <div onClick={() => {setPath([]); setOpened([])}} id={i + j} className="cell opened-cell" key={i + j}></div>
                }
                else return <div onClick={() => setWall([i, j])}
                onDragEnter={(e) => dragEnter(e, [i, j])}
                onDragEnd={drop}
                className="cell" id={i + j} key={i + j}></div>
              })
            }
          </div>
        )
        }
        <div className="buttons-container" onDragEnd={replaceBtnContainer} draggable>
          <div className="d-flex justify-content-around" style={{borderLeft: "5px solid black"}}>
            <button className="btn btn-success rounded" onClick={start}>Start</button>
            <button className="btn btn-warning rounded" onClick={() => restart()} disabled={path.length == 0}>Restart</button>
            <button className="btn btn-danger rounded" onClick={() => {setPath([]); setOpened([])}} disabled={path.length == 0}>Stop</button>
            <button className="btn btn-secondary rounded" onClick={() => setWalls([])}>Remove walls</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
