import { useState } from "react";
import Todo from "./Todo.js";
import Login from "./Login.js";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => {
    setIsLogin((current) => !current);
  };
  return <div>{isLogin ? <Todo /> : <Login onLogin={handleLogin} />}</div>;
}

export default App;
