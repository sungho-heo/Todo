import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Todo from "./Todo.js";
import Login from "./Login.js";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  return (
    <div>
      {/* process.env.PUBLIC_URL > package.json homepage url connect default config.. */}
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path='/todo'
            element={isLogin ? <Todo /> : <Navigate to='/' />}
          ></Route>
          <Route
            path='/'
            element={
              isLogin ? (
                <Navigate to='/todo' />
              ) : (
                <Login setIsLogin={setIsLogin} name={name} setName={setName} />
              )
            }
          ></Route>
        </Routes>
      </Router>
      <footer>&copy; {new Date().getFullYear()} Todo All right reserved</footer>
    </div>
  );
}

export default App;
