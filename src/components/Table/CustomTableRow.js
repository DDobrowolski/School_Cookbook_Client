import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
const CustomTableRow = ({ row, index, isSelected, handleClick }) => {
  const isItemSelected = isSelected(row.name);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.name)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.name}
      </TableCell>
    </TableRow>
  );
};

export default CustomTableRow;
