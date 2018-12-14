import React, { useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

import Button from '../components/Button';
import CustomerTable from '../components/CustomerTable';
import CollectionsTable from '../components/CollectionsTable';

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
      <center>
        <Button
          onClick={e => {
            e.preventDefault();
            {
              currentUser
                ? netlifyIdentity.logout()
                : netlifyIdentity.open('login');
            }
          }}
          text={currentUser ? 'Log out' : 'Log in'}
        />
      </center>

      {currentUser && <CustomerTable />}
      {currentUser && <CollectionsTable />}

      <style global jsx>{`
        #admin-app {
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Admin;
