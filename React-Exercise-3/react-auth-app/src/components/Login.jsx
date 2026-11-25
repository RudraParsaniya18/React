
import { useState } from "react";

function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {

        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        // Get registered users
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Find matching user
        let loggedUser = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (loggedUser) {

            alert("Login successful!");

            onLogin(loggedUser);

        } else {

            alert("Invalid email or password");

        }
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">Login</button>

            </form>
        </div>
    );
}

export default Login;
