import { h } from 'preact';
import { useRef, useState } from "preact/hooks";
import {FaCheck,FaTrash} from 'react-icons/fa'

export default function Home() {
  const [data, setData] = useState([]);
  const inputRef = useRef(null);

  const addNewTask = () => {
    setData([
      ...data,
      {
        hasCompleted: false,
        text: inputRef.current.value,
      },
    ]);
    inputRef.current.value = "";
  };

  const finishTask = (id) => {
    setData(
      data.map((value, index) => {
        if (id === index) {
          return {
            text: value.text,
            hasCompleted: !value.hasCompleted,
          };
        } return value;
      })
    );
  };

  const removeTask = (id) => {
    setData(
      data.filter((value, index) => {
        if (id === index) return false;
        return true
      })
    );
  };

  return (
    <>
      <head>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <div className="Container" >
        <h1 className="Title">
          to.<span className="FormatTitle">do</span>
        </h1>
        <div className="CardContainer">
          <h1 className="CardTitle">Minhas tasks</h1>
          <input className="Input" placeholder="Adicionar novo todo" ref={inputRef} />
          <button className="Button" onClick={addNewTask}>
          <FaCheck />
          </button>
          {data.length > 0 &&
            data.map((value, index) => (
              <div className="Item" key={index}>
                <input className="CheckBox" type="checkbox" onClick={() => finishTask(index)} />
                <p className="Text" style={{
                  textDecoration: data[index].hasCompleted ? "line-through":"none"
                }}>{value.text}</p>
                <button className="IconButton" onClick={() => removeTask(index)}>
                <FaTrash />
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
