import axios from "axios";
import style from "./Login.module.css";
function Login({ setIsLogin, name, setName }) {
  const onChange = (event) => {
    setName(event.target.value);
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post("/user/login", { name: name });
      const result = response.data[0];
      if (result === name) {
        setName("");
        setIsLogin((current) => !current);
      }
    } catch (error) {
      alert("Please enter a name or First Join button click plz");
      console.log(error.message);
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
      <section className={style.sectionLogin}>
        <div>
          <header>
            <h1>Welcome Todo</h1>
          </header>
          <div className={style.login_container}>
            <input
              type='text'
              value={name}
              onChange={onChange}
              placeholder='Username'
            />
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className={style.join_container}>
            <span>Don't have an account Join click plz</span>
            <button onClick={onJoin}>Join &rarr;</button>
          </div>
          <hr />
          <footer>
            &copy; {new Date().getFullYear()} Todo All right reserved
          </footer>
        </div>
      </section>
    </div>
  );
}

export default Login;
