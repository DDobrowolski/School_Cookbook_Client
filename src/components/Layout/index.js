import React from 'react';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
