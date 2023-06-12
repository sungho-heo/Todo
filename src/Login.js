import { useState } from "react";
import axios from "axios";
function Login({ onLogin }) {
  const [name, setName] = useState("");
  const onChange = (event) => {
    setName(event.target.value);
  };
  const onClick = async () => {
    setName("");
    try {
      await axios.get("/user/login", { name: name });
      console.log("User name check");
    } catch (error) {
      throw new Error(error);
    }
  };
  const onJoin = async () => {
    setName("");
    try {
      await axios.post("/user/join", { name: name });
      console.log("User added successfully");
    } catch (error) {
      // 에러문을 바로 던져줘서 확인하기위해서.
      throw new Error(error);
    }
  };
  return (
    <div>
      <h1>Welcome what is your name?</h1>
      <span>
        Username:
        <input
          type='text'
          value={name}
          onChange={onChange}
          placeholder='Nickname'
        />
      </span>
      <div>
        <button onClick={onLogin}>Login</button>
        <br />
        <span>Don't have an account?</span>
        <button onClick={onJoin}>Join &rarr;</button>
      </div>
    </div>
  );
}

export default Login;
