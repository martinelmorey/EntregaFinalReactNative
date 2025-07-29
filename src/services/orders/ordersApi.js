import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (localId) => `orders/${localId}.json`,
            providesTags: ['Orders'],
            transformResponse: (response) => {
                if (!response) return [];
                return Object.keys(response).map(key => ({
                    id: key,
                    ...response[key]
                }));
            }
        }),
        addOrder: builder.mutation({
            query: ({localId, cartItems}) => ({
                url: `orders/${localId}.json`,
                method: 'POST',
                body: {
                    items: cartItems,
                    total: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
                    date: new Date().toLocaleString(),
                    status: 'Confirmado',
                    orderedAt: Date.now()
                }
            }),
            invalidatesTags: ['Orders']  
        }),
        removeFromOrders: builder.mutation({
            query: ({localId, cartItems}) => ({
                url: `orders/${localId}/${cartItems.id}.json`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Orders']
        }),
        clearOrders: builder.mutation({
            query: (localId) => ({
                url: `orders/${localId}.json`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Orders']
        })
    })
})

export const { useGetOrdersQuery, useAddOrderMutation, useRemoveFromOrdersMutation, useClearOrdersMutation } = ordersApi