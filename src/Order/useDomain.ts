import moment, { Moment } from 'moment';
import React, { useMemo, useState } from 'react';
import data from './data.json';

function useDomain() {
  const [orderDate, setOrderDate] = useState(moment());
  const [orders, setOrders] = useState(data.map(item => ({ ...item, holiday: 0}))); 

  function getBusinessDays(startDate: Date, endDate: Date) {
    const firstDay = moment(startDate);
    const lastDay = moment(endDate);
    let calcBusinessDays = 1 + (lastDay.diff(firstDay, 'days') * 5 -
      (firstDay.day() - lastDay.day()) * 2) / 7;

    if (lastDay.day() == 6) calcBusinessDays--;//sat
    if (firstDay.day() == 0) calcBusinessDays--;//sun

    return calcBusinessDays;
  }

  const getShipDate = (
    {
      maxBusinessDaysToShip,
      shipOnWeekends,
      date,
      holiday
    }: {
      maxBusinessDaysToShip: number,
      shipOnWeekends: boolean,
      date: Moment,
      holiday: number,
    }) => {
    let add = maxBusinessDaysToShip - 1;
    const startDate = moment(date).toDate();
    const endDate = moment(date).add(add, 'days').toDate();

    if (!shipOnWeekends) {
      const businessDays = getBusinessDays(startDate, endDate);
      add = businessDays;
    }

    if (holiday) {
      add -= holiday
    }

    return moment(startDate).add(add, 'days').format('LL')
  }

  const rows = useMemo(() => {
    return orders.map(item => {

      const shipDate = getShipDate({
        maxBusinessDaysToShip: item.maxBusinessDaysToShip,
        shipOnWeekends: item.shipOnWeekends,
        date: orderDate,
        holiday: item.holiday,
      });

      return {
        ...item,
        row: 0,
        shipDate
      };
    });
  }, [orderDate, orders]);

  const handleChangeHoliday = (index: number, value: number) => {
    const newValue = [...orders];
    newValue[index].holiday = value;
    setOrders(newValue);
  }

  return {
    rows,
    orderDate,
    setOrderDate,
    handleChangeHoliday
  };
}

export default useDomain;