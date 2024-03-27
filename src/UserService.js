import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/users/';

class UserService {
  getAllUsers() {
    return axios.get(API_URL);
  }

  createUser(data) {
    return axios.post(API_URL, data);
  }

  updateUser(id, data) {
    return axios.put(`${API_URL}${id}/`, data);
  }

  deleteUser(id) {
    return axios.delete(`${API_URL}${id}/`);
  }
}

const userService = new UserService(); 
export default userService; 
