import React,{ useRef, useState } from "react";

export default function Home() {
  interface IData {
    hasCompleted: boolean ,
    text: string
  }

  const [data, setData] = useState<IData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const finishTask = (id: number) => {
    setData(
      data.map((value, index) => {
        if (id === index) {
          return {
            text: value.text,
            hasCompleted: !value.hasCompleted,
          };
        } else return value;
      })
    );
  };

  const removeTask = (id: number) => {
    setData(
      data.filter((value, index) => {
        if (id === index) return false;
        else return true;
      })
    );
  };

  return (
    <>
      <head>
        <title>Hello World - Aleph.js</title>
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
          Add
          </button>
          {data.length > 0 &&
            data.map((value, index) => (
              <div className="Item" key={index}>
                <input className="CheckBox" type="checkbox" onClick={() => finishTask(index)} />
                <p className="Text" style={{
                  textDecoration: data[index].hasCompleted ? "line-through":"none"
                }}>{value.text}</p>
                <button className="IconButton" onClick={() => removeTask(index)}>
                Remove
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
