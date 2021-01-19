import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Topbar = () => {
  const history = useHistory();
  return (
    <nav className="navbar navbar-light bg-light">
      <a href="/" className="navbar-brand">
        Cookbook
      </a>
      <Button variant="contained" onClick={() => history.push('/new')}>
        Dodaj nowy przepis
      </Button>
    </nav>
  );
};

export default Topbar;
