import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ row, headCells, colors = false }) {
  const classes = useStyles();
  const fields = headCells.map((c) => c.id);

  const findValidHeader = (field) => headCells.find((c) => c.id === field);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {fields.map((f, i) => (
            <TableRow key={f}>
              <TableCell variant="head" className={colors ? i % 2 === 0 ?'table-primary' : 'table-success' : ''}>{findValidHeader(f).label}</TableCell>
              <TableCell className={colors ? i % 2 === 0 ?'table-primary' : 'table-success' : ''}>{row[f]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
