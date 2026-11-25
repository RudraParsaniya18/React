
import { useState } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import MyAccount from "./components/MyAccount";

function App() {

    const [page, setPage] = useState("login");
    const [loggedUser, setLoggedUser] = useState(null);

    function handleLogin(user) {
        setLoggedUser(user);
        setPage("account");
    }

    function handleLogout() {
        setLoggedUser(null);
        setPage("login");
    }

    return (
        <div>

            {page === "login" && (
                <Login onLogin={handleLogin} />
            )}

            {page === "signup" && (
                <Signup />
            )}

            {page === "account" && loggedUser && (
                <MyAccount
                    user={loggedUser}
                    onLogout={handleLogout}
                />
            )}

            {page === "login" && (
                <p>
                    Don't have an account?
                    <button onClick={() => setPage("signup")}>
                        Signup
                    </button>
                </p>
            )}

            {page === "signup" && (
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
