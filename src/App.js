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
      <hr />
      <footer>&copy; {new Date().getFullYear()} Todo All right reserved</footer>
    </div>
  );
}

export default App;
