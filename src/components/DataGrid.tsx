import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  productName: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { productName, calories, fat, carbs, protein };
}

interface Column {
  headerName: string,
  field: string,
  render?: (index: number, row: any) => React.ReactElement,
}

interface DataGridProps {
  rows: any[],
  columns: Column[]
}

export default function DataGrid({ rows, columns }: DataGridProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columns.map((item) => (
                <TableCell key={item.field}>{item.headerName}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row: any, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {
                columns.map((item) => (
                  <TableCell key={item.field}>
                    {item.render ? item.render(index, row) : row[item.field]}
                  </TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
