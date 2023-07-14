import { useState, useEffect } from "react";
import style from "./Todo.module.css";
import axios from "axios";
function Todo() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);
  const BASE_URL = "https://testtodo-4iip.onrender.com";
  /* 
  Todo data db에 존재하는경우 데이터를 받아온후 setTodo에 먼저 변경을 함 없을경우에는
  빈 배열을 출력 새로운 todo를 생성해야함.
  */
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/todo`);
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
    // 빈 value를 제출할경우 아무것도 반환 하지 않음.
    if (value === "") {
      return;
    }
    /* 
    ... Spread 문법으로 각 배열 안의 값들을 처음부터 한개씩 나열한다고 생각하면된다. 
    그것을 사용해서 새로운 value가 맨앞으로 오도록 새로운 생성된 value는 처음 그다음 todo가
    차례로 오도록 나열한다.
    */
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
      await axios.delete(`${BASE_URL}/api/todo/delete?text=${noTodo}`);
      console.log("todo remove successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const onSave = async () => {
    try {
      await axios.post(`${BASE_URL}/api/todos`, { todo: todo });
      console.log("Todo created successfully");
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div>
      <section className={style.container}>
        <h1>Today todo</h1>
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
          <div>
            <ul>
              {todo.map((value, index) => (
                <li key={index} className={style.itemList}>
                  <input onClick={onClick} type='checkbox' />
                  {value.trim()}
                  <button className={style.todoCanceled} onClick={todoDelte}>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </li>
              ))}
            </ul>
            <div className={style.save_button}>
              <button onClick={onSave}>Save</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Todo;
