import { useState } from "react";
import Todo from "./Todo.js";
import Login from "./Login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  return (
    <Router>
      <Routes>
        <div>
          {isLogin ? (
            <Route path='/todo' element={<Todo />}></Route>
          ) : (
            <Route
              path='/'
              element={
                <Login setIsLogin={setIsLogin} name={name} setName={setName} />
              }
            ></Route>
          )}
          <footer>
            &copy; {new Date().getFullYear()} Todo All right reserved
          </footer>
        </div>
      </Routes>
    </Router>
  );
}

export default App;
