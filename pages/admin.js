import React, { Fragment, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

import Header from '../components/Header';
import Reset from '../components/Reset';
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
      <Header />
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

      <Reset />
      <style global jsx>{`
        * {
          box-sizing: border-box;
        }

        body {
          color: #505050;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          line-height: 1.3;
        }

        .wrapper {
          margin: 0 auto;
          max-width: 1000px;
        }
      `}</style>
      <style jsx>{``}</style>
    </div>
  );
};

export default Admin;
