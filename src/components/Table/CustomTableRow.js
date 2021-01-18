import { Checkbox, lighten, makeStyles, TableCell, TableRow } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  tableRow: {
    "&$hover, &$hover:hover": {
      cursor: 'pointer'
    },
    "&$selected, &$selected:hover": {
      backgroundColor: lighten('#737373', 0.85)
    }
  },
  tableCell: {
    "$selected &": {
      color: "#000"
    }
  },
  checkbox: {
    "&:hover, &$checked:hover": {
      backgroundColor: "#e6e6e6"
    },
    "&$checked, &$checked:hover": {
      color: "#737373"
    }
  },
  hover: {},
  selected: {},
  checked: {}
}));

const CustomTableRow = ({ row, index, isSelected, handleClick }) => {
  const isItemSelected = isSelected(row.id);
  const labelId = `enhanced-table-checkbox-${index}`;
  const classes = useStyles();

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      classes={{ hover: classes.hover, selected: classes.selected }}
      className={classes.tableRow}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
          classes={{ checked: classes.checked }}
          className={classes.checkbox}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        className={classes.tableCell}
      >
        {row.name}
      </TableCell>
    </TableRow>
  );
};

export default CustomTableRow;
