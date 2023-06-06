import { useState } from "react"
function Todo() {
  const [value, setValue] = useState("")
  const [todo, setTodo] = useState([])
  const onChange = (event) => setValue(event.target.value)
  const onSubmit = (event) => {
    event.preventDefault()
    if (todo === "") {
      return
    }
    setTodo((current) => [value, ...todo])
    setValue("")
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
