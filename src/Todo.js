import { useState } from "react"
import axios from "axios"
function Todo() {
  const [value, setValue] = useState("")
  const [todo, setTodo] = useState([])
  const onChange = (event) => setValue(event.target.value)
  const onSubmit = async (event) => {
    event.preventDefault()
    if (todo === "") {
      return
    }
    setTodo((current) => [value, ...todo])
    setValue("")
    // 백엔드로 데이터 전송
    try {
      await axios.post("/api/todos", { todo: value, todoList: todo })
      console.log("Todo added successfully")
    } catch (error) {
      // 에러문을 바로 던져줘서 확인하기위해서.
      throw new Error(error)
    }
  }
  const onClick = (event) => {
    const li = event.target.parentNode
    li.remove()
  }
  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type='text'
          placeholder='Today work add'
        ></input>
        <button>Add</button>
      </form>
      <ul>
        {todo.map((value, index) => (
          <li key={index}>
            <input onClick={onClick} type='checkbox' />
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
