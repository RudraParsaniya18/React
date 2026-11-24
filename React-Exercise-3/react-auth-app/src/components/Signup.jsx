
import { useState } from "react";

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSignup(e) {

        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let existingUser = users.find((user) => user.email === email);

        if (existingUser) {
            alert("Email already registered");
            return;
        }

        let newUser = {
            username: username,
            email: email,
            password: password
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful!");

        console.log(newUser);
    }

    return (
        <div>
            <h2>Signup</h2>

            <form onSubmit={handleSignup}>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">Signup</button>

            </form>
        </div>
    );
}

export default Signup;
