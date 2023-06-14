import { useState } from "react";
import Todo from "./Todo.js";
import Login from "./Login.js";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  return (
    <div>
      {isLogin ? (
        <Todo />
      ) : (
        <Login setIsLogin={setIsLogin} name={name} setName={setName} />
      )}
    </div>
  );
}

export default App;
