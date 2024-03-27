import React from 'react';
import UserList from './UserList';
import logo from './logo.svg'; 

function App() {
  return (
    <div className="App">
      <img src={logo} alt="logo" className='logo' />
      <UserList />
    </div>
  );
}

export default App;
