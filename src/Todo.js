import { useState } from "react";
import style from "./Todo.module.css";
function Todo({ name }) {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);
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
  const todoDelte = (event) => {
    const { parentNode } = event.target.parentNode;
    parentNode.remove();
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
          <button>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
