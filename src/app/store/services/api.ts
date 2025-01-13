import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CountryResponse, OptionsSelectInput } from '@/app/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://restcountries.com/v3.1/',
  }),
  endpoints: (builder) => ({
    // In this case, we use this endpoint exclusively to populate the input options.
    getCountriesForSelect: builder.query<OptionsSelectInput[], void>({
      query: () => 'all',
      transformResponse: (response: CountryResponse[]) =>
        response.map((country) => ({
          id: country.cca3,
          name: country.name.common,
        })),
    }),
  }),
});

export const { useGetCountriesForSelectQuery } = api;
