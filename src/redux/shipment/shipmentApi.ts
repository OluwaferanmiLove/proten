import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithTokenCheck} from '../redux.util';
import {ShipmentParms, ShipmentResponse} from './Shipment';

//Reminder for types
//<ResponseType, BodyType>

export const shipmentApi = createApi({
  reducerPath: 'shipmentApi',
  baseQuery: baseQueryWithTokenCheck,
  endpoints: builder => ({
    getShipment: builder.query<ShipmentResponse, ShipmentParms>({
      query: data => {
        return {
          url: '/frappe.client.get_list',
          // method: 'GET',
          params: data,
        };
      },
    }),
  }),
});

export const {useGetShipmentQuery, useLazyGetShipmentQuery} = shipmentApi;
