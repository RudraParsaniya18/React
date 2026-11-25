
function MyAccount({ user, onLogout }) {

    return (
        <div>

            <h2>My Account</h2>

            <p><strong>Username:</strong> {user.username}</p>

            <p><strong>Email:</strong> {user.email}</p>

            <button onClick={onLogout}>
                Logout
            </button>

        </div>
    );

}

export default MyAccount;
