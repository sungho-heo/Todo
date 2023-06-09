import { useState } from "react";
import axios from "axios";
import style from "./Todo.module.css";
function Todo() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [dbTodo, setDbTodo] = useState([]);
  const onChange = (event) => setValue(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (value === "") {
      return;
    }
    setTodo((current) => [value, ...todo]);
    setValue("");
    // 백엔드로 데이터 전송
    try {
      if (todo.length > 0) {
        await axios.post("/api/todos", { todoList: todo });
        console.log("Todo added successfully");
      }
    } catch (error) {
      // 에러문을 바로 던져줘서 확인하기위해서.
      throw new Error(error);
    }
  };
  const onClick = (event) => {
    const li = event.target.parentNode;
    if (li.className === style.itemList) {
      li.className = style.checked;
    } else {
      li.className = style.itemList;
    }
  };
  const todoDelte = (event) => {
    const { parentNode } = event.target.parentNode;
    parentNode.remove();
  };
  const getData = async () => {
    try {
      const response = await axios.get("api/todo");
      setDbTodo(response.data);
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
                  <i className='fa-regular fa-trash-can'></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
