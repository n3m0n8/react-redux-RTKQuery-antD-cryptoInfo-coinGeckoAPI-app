import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURIQuery = fetchBaseQuery({
    mode: "cors", 
    baseUrl: `https://bing-news-search1.p.rapidapi.com`,
    prepareHeaders: (headers) => {
        headers.set('Access-Control-Allow-Origin','*');
        headers.set('X-BingApis-SDK', 'true');
        headers.set('X-RapidAPI-Key', '**************');
        headers.set('X-RapidAPI-Host', 'bing-news-search1.p.rapidapi.com');
        return headers;
    },
  });
  export const newsApi = createApi({
    reducerPath: 'newsApi', 
    baseQuery: baseURIQuery,
    endpoints: (builder)=> ({ 
        getNewsInfo: builder.query({
            query: (newsCategory, count)=>({url: `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&${count}`}),
          }),
        }),
    });

    export const { useGetNewsInfoQuery } = newsApi;