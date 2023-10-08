import React, { useState, useEffect } from 'react';
/* eslint-disable */
import { getUsers } from '../../api';


function Feeds() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('getUsers started')
    getUsers().then(response => {
      console.log('response', response)
      setUsers(response.data.data)
    });
  }, []);

  return (
    <>
        <h1>Feeds</h1>

        {users.map(user => <h1 key={user.id}>{user?.email}</h1>)}
    </>
  );
}

export default Feeds;
