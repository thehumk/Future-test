import React from 'react';
import UsersSelection from './components/users-selection';
import Users from './components/users';

function App() {
  return (
    <div className="app">
      <UsersSelection />
      <Users />
    </div>
  );
}

export default App;
