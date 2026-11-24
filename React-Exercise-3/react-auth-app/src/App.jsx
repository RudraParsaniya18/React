
import { useState } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {

  const [page, setPage] = useState("login");

  return (
    <div>

      {page === "login" ? (
        <Login />
      ) : (
        <Signup />
      )}

      <br />

      {page === "login" ? (
        <p>
          Don't have an account?
          <button onClick={() => setPage("signup")}>
            Signup
          </button>
        </p>
      ) : (
        <p>
          Already have an account?
          <button onClick={() => setPage("login")}>
            Login
          </button>
        </p>
      )}

    </div>
  );
}

export default App;
