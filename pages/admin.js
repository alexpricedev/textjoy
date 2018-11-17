import React, { Fragment, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

// import { collections } from '../constants';

const Admin = () => {
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    // Setup the event handlers for the netlify auth
    netlifyIdentity.on('init', setUser);
    netlifyIdentity.on('login', user => {
      setUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on('logout', () => {
      setUser(null);
      alert('You have been logged out');
    });
    netlifyIdentity.on('error', err => {
      alert('There was an error!');
      console.warn(err);
    });
    netlifyIdentity.init({ container: '#admin-app' });
  }, []);

  return (
    <div id="admin-app">
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          {
            currentUser
              ? netlifyIdentity.logout()
              : netlifyIdentity.open('login');
          }
        }}
      >
        {currentUser ? 'Log out' : 'Log in'}
      </button>

      <style global jsx>{`
        #admin-app {
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        }
      `}</style>
      <style jsx>{``}</style>
    </div>
  );
};

export default Admin;
