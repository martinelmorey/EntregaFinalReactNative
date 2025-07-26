import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseRTDBURL = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseRTDBURL }),
    endpoints: (builder) => ({
        getCategories: builder.query({
        query: () => "categories.json",
        transformResponse: (response) => Object.values(response ?? {}),
        }),
        getProductsByCategory: builder.query({
        query: (categorySlug) =>
            `products.json?orderBy="categorySlug"&equalTo="${categorySlug}"`,
        transformResponse: (response) => Object.values(response ?? {}),
        }),
        getProductsBySubcategory: builder.query({
        query: (subcategorySlug) =>
            `products.json?orderBy="subcategorySlug"&equalTo="${subcategorySlug}"`,
        transformResponse: (response) => Object.values(response ?? {}),
        }),
        getAllProducts: builder.query({
        query: () => "products.json",
        transformResponse: (response) => Object.values(response ?? {}),
        }),
    }),
});

export const { 
    useGetCategoriesQuery, 
    useGetProductsByCategoryQuery,
    useGetProductsBySubcategoryQuery,
    useGetAllProductsQuery
} = shopApi