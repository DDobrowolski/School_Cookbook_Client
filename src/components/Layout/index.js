import React from 'react';
import { useLocation } from 'react-router-dom';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname.includes('print') ? null : <Topbar />}
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
