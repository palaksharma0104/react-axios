import React, { useState } from 'react';
import axios from 'axios';

const UserFetcher = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    if (!userId) {
      setError('Please enter a user ID.');
      setUserData(null);
      return;
    }

    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const { id, name, email, address } = response.data;
      setUserData({ id, name, email, city: address.city });
      setError('');
    } catch (err) {
      setError('User not found or invalid ID.');
      setUserData(null);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Fetch User Details</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID"
        style={{ padding: '8px', width: '80%', marginBottom: '10px' }}
      />
      <br />
      <button onClick={fetchUser} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Fetch User
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {userData && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3>User Details:</h3>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>City:</strong> {userData.city}</p>
        </div>
      )}
    </div>
  );
};

export default UserFetcher;
