import React from 'react';

const TableAction = ({ label, onClick }) => (
  <span className='tableAction' onClick={onClick}>{label}</span>
);

export default TableAction;