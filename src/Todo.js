import { useState, useEffect } from "react";
import style from "./Todo.module.css";
import axios from "axios";
function Todo() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/todo");
        const { dataTodo } = response.data;
        setTodo(dataTodo);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const onChange = (event) => setValue(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (value === "") {
      return;
    }
    setTodo((current) => [value, ...todo]);
    setValue("");
  };
  const onClick = (event) => {
    const li = event.target.parentNode;
    if (li.className === style.itemList) {
      li.className = style.checked;
    } else {
      li.className = style.itemList;
    }
  };
  const todoDelte = async (event) => {
    const { parentNode } = event.target.parentNode;
    const noTodo = parentNode.innerText;
    setTodo((current) => current.filter((word) => word !== noTodo));
    try {
      await axios.delete(`/api/todo/delete?text=${noTodo}`);
      console.log("todo remove successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const onSave = async () => {
    try {
      await axios.post("/api/todos", { todo: todo });
      console.log("Todo created successfully");
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className={style.container}>
      <h1 className={style.title}>Today todo</h1>
      <div className={style.todobox}>
        <form onSubmit={onSubmit}>
          <input
            value={value}
            onChange={onChange}
            type='text'
            placeholder='Today work add'
            className={style.todoAdd}
          ></input>
        </form>
        <div className={style.itemSelect}>
          <ul>
            {todo.map((value, index) => (
              <li key={index} className={style.itemList}>
                <input onClick={onClick} type='checkbox' />
                {value}
                <button className={style.todoCanceled} onClick={todoDelte}>
                  <i className='fa-solid fa-trash'></i>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
