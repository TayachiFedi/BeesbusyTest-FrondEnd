import React, { useState, useEffect } from "react";
import UserService from "./UserService";
import UserForm from "./UserForm";
import "./styles.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    city: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await UserService.getAllUsers();
    setUsers(response.data.reverse());
  };

  const handleDeleteUser = async (id) => {
    await UserService.deleteUser(id);
    fetchUsers();
  };

  const saveUser = async (user) => {
    if (user.id) {
      await UserService.updateUser(user.id, user);
    } else {
      const newUser = await UserService.createUser(user);
      setUsers((prevUsers) => [newUser, ...prevUsers]);
    }
    fetchUsers();
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      user.last_name.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      user.age.toString().startsWith(filters.age) &&
      user.gender.toLowerCase().includes(filters.gender.toLowerCase()) &&
      user.city.toLowerCase().includes(filters.city.toLowerCase())
  );

  // Pagination ici
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="user-form">
        <UserForm
          currentUser={currentUser}
          saveUser={saveUser}
          setCurrentUser={setCurrentUser}
          refreshUsers={fetchUsers}
        />
      </div>
      <div className="filters">
        <h2 style={{ color: "#2dc3c4" }}>Filtres</h2>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={filters.firstName}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={filters.lastName}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Âge"
          value={filters.age}
          onChange={handleFilterChange}
        />
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">Sélectionnez le genre</option>
          <option value="Male">Homme</option>
          <option value="Female">Femme</option>
          <option value="Other">Autre</option>
        </select>
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={filters.city}
          onChange={handleFilterChange}
        />
      </div>
      <div className="user-list">
        <h2>Users</h2>
        <ul>
          {currentUsers.map((user) => (
            <li key={user.id}>
              {user.first_name} {user.last_name} - Age: {user.age} - Gender:{" "}
              {user.gender} - City: {user.city}
              <div>
                <button
                  onClick={() => setCurrentUser(user)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <nav>
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(filteredUsers.length / usersPerPage) },
              (_, i) => (
                <li key={i} className="page-item">
                  <a
                    onClick={() => paginate(i + 1)}
                    href="javascript:void(0);"
                    className="page-link"
                  >
                    {i + 1}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserList;
