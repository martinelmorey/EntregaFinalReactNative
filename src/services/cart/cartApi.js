import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: (localId) => `cart/${localId}.json`,
            providesTags: ['Cart'],
            transformResponse: (response) => {
                if (!response) return [];
                return Object.keys(response).map(key => ({
                    id: key,
                    ...response[key]
                }));
            }
        }),
        addToCart: builder.mutation({
            query: ({localId, product}) => ({
                url: `cart/${localId}/${product.id}.json`,
                method: 'PUT',
                body: {
                    title: product.title,
                    price: product.price,
                    mainImage: product.mainImage,
                    brand: product.brand,
                    addedAt: Date.now()
                }
            }),
            invalidatesTags: ['Cart']  
        }),
        removeFromCart: builder.mutation({
            query: ({localId, productId}) => ({
                url: `cart/${localId}/${productId}.json`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        }),
        clearCart: builder.mutation({
            query: (localId) => ({
                url: `cart/${localId}.json`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        })
    })
})

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation } = cartApi