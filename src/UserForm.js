import React, { useState, useEffect } from "react";
import UserService from "./UserService";
import "./styles.css";

const UserForm = ({ currentUser, setCurrentUser, refreshUsers }) => {
  const [user, setUser] = useState(
    currentUser || {
      first_name: "",
      last_name: "",
      age: "",
      gender: "",
      city: "",
    }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUser(
      currentUser || {
        first_name: "",
        last_name: "",
        age: "",
        gender: "",
        city: "",
      }
    );
  }, [currentUser]);

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.first_name = user.first_name ? "" : "Le prénom est requis.";
    tempErrors.last_name = user.last_name ? "" : "Le nom est requis.";
    tempErrors.age = user.age ? "" : "L'âge est requis.";
    tempErrors.gender = user.gender ? "" : "Le genre est requis.";
    tempErrors.city = user.city ? "" : "La ville est requise.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (currentUser) {
        await UserService.updateUser(currentUser.id, user);
      } else {
        await UserService.createUser(user);
      }

      if (typeof refreshUsers === "function") {
        refreshUsers();
      }

      setUser({ first_name: "", last_name: "", age: "", gender: "", city: "" });
      setCurrentUser(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2 style={{ color: "#2dc3c4" }}>Add/Edit User</h2>
      <input
        type="text"
        name="first_name"
        value={user.first_name}
        onChange={handleChange}
        placeholder="Prénom"
      />
      {errors.first_name && <div>{errors.first_name}</div>}
      <input
        type="text"
        name="last_name"
        value={user.last_name}
        onChange={handleChange}
        placeholder="Nom"
      />
      {errors.last_name && <div>{errors.last_name}</div>}
      <input
        type="number"
        name="age"
        value={user.age}
        onChange={handleChange}
        placeholder="Âge"
      />
      {errors.age && <div>{errors.age}</div>}
      <select name="gender" value={user.gender} onChange={handleChange}>
        <option value="">Sélectionnez le genre</option>
        <option value="Male">Homme</option>
        <option value="Female">Femme</option>
        <option value="Other">Autre</option>
      </select>
      {errors.gender && <div>{errors.gender}</div>}
      <input
        type="text"
        name="city"
        value={user.city}
        onChange={handleChange}
        placeholder="Ville"
      />
      {errors.city && <div>{errors.city}</div>}
      <button type="submit" className="edit-btn">
        Sauvegarder
      </button>
    </form>
  );
};

export default UserForm;
