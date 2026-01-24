import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get("REACT_APP_API_URL/api/user");
    setUsers(res.data);
  };

  // Add user
  const addUser = async (e) => {
    e.preventDefault();

    await axios.post("REACT_APP_API_URL/api/user", {
      username,
      email
    });

    setUsername("");
    setEmail("");
    fetchUsers(); // refresh list
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ width: "400px", margin: "40px auto" }}>
      <h3>Add User</h3>

      <form onSubmit={addUser}>
        <input
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-control mt-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-dark w-100 mt-3">
          Add User
        </button>
      </form>

      <hr />

      <h4>Users List</h4>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              <strong>{u.username}</strong> — {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
