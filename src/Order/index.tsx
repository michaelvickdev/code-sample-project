import { Box, Container, IconButton, Typography } from '@mui/material';
import React from 'react';
import DataGrid from '../components/DataGrid';
import DatePicker from '../components/DatePicker';
import useDomain from './useDomain';

function Order() {
  const { rows, orderDate, setOrderDate, handleChangeHoliday } = useDomain();

  const columns = [
    {
      headerName: 'Name',
      field: 'productName'
    },
    {
      headerName: 'Available',
      field: 'inventoryQuantity'
    },
    {
      headerName: 'Holiday',
      field: 'holiday',
      render: (index: number, row: any) => {

        return (
          <Box
            display="flex"
            alignItems="center"
          >
            <IconButton
              disabled={row.holiday === 0}
              onClick={() => {
                handleChangeHoliday(index, row.holiday - 1)
              }}
            >
              -
            </IconButton>
            <Typography>{row.holiday}</Typography>
            <IconButton
              onClick={() => {
                handleChangeHoliday(index, row.holiday + 1)
              }}
            >
              +
            </IconButton>
          </Box>
        )
      }
    },
    {
      headerName: 'Ship Date',
      field: 'shipDate'
    },
  ]

  return (
    <Container>
      <Box mt={2}>
        <DatePicker
          onChange={(v) => {
            if (v) {
              setOrderDate(v);
            }
          }}
          value={orderDate}
          label="Order Date"
        />
      </Box>
      <Box mt={2}>
        <DataGrid
          rows={rows}
          columns={columns}
        />
      </Box>
    </Container>
  );
}

export default Order;