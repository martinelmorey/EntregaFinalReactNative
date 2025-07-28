import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const listaApi = createApi({
    reducerPath: "listaApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['Lista'],
    endpoints: (builder) => ({
        getLista: builder.query({
            query: (localId) => `lista/${localId}.json`,
            providesTags: ['Lista'],
            transformResponse: (response) => {
                if (!response) return [];
                return Object.keys(response).map(key => ({
                    id: key,
                    ...response[key]
                }));
            }
        }),
        addToLista: builder.mutation({
            query: ({localId, product}) => ({
                url: `lista/${localId}/${product.id}.json`,
                method: 'PUT',
                body: {
                    title: product.title,
                    price: product.price,
                    mainImage: product.mainImage,
                    brand: product.brand,
                    addedAt: Date.now()
                }
            }),
            invalidatesTags: ['Lista']  
        }),
        removeFromLista: builder.mutation({
            query: ({localId, productId}) => ({
                url: `lista/${localId}/${productId}.json`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Lista']
        }),
        clearLista: builder.mutation({
            query: (localId) => ({
                url: `lista/${localId}.json`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Lista']
        })
    })
})

export const { useGetListaQuery, useAddToListaMutation, useRemoveFromListaMutation, useClearListaMutation } = listaApi