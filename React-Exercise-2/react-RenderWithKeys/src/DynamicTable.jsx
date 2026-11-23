import { Component } from "react";

class DynamicTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            users: [],
            editIndex: null
        };
    }


    addUser() {

        const { firstName, lastName, users } = this.state;

        // Check if both fields have values
        if (!firstName.trim() || !lastName.trim()) {
            alert("Please enter both First Name and Last Name");
            return;
        }

        // Create a new user object
        const newUser = {
            firstName: firstName,
            lastName: lastName
        };

        // Add new user to existing array
        this.setState({
            users: [...users, newUser],
            firstName: "",
            lastName: ""
        });

    }


    deleteUser(index) {

        const updatedUsers = this.state.users.filter(
            (user, i) => i !== index
        );

        this.setState({
            users: updatedUsers
        });

    }


    editUser(index) {

        const selectedUser = this.state.users[index];

        this.setState({
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            editIndex: index
        });

    }

    render() {
        return (
            <div>
                <h1>Dynamic Table</h1>

                <input
                    type="text"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={(e) => this.setState({ firstName: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={(e) => this.setState({ lastName: e.target.value })}
                />

                <button onClick={() => this.state.editIndex === null ? this.addUser() : this.updateUser()}>
                    {this.state.editIndex === null ? "Add" : "Update"}
                </button>

                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>
                                    <button onClick={() => this.editUser(index)}>Edit</button>
                                    <button onClick={() => this.deleteUser(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default DynamicTable;