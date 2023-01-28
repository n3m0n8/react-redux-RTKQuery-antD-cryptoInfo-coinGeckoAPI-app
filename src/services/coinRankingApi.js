import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseURIQuery = fetchBaseQuery({
    mode: "cors", 
    baseUrl: `https://api.coinranking.com/v2`,
    prepareHeaders: (headers /*, { getState }*/) => {
          //coinranking does need a key, unlike coingecko...
          /// NOTE that originally used coinRanking as per the JavascriptMastery tutorial ... but the exchanges are hidden behind paywall and there was trouble with other issues... so I switched to the coinGecko.... only to find that at the end of the tutorial, when it comes to historical prices chart, the coinGecko API data doesn't have straightforward historical prices data... it has a large data sets of daily price changes - this allows for some maths operations to calculate the change in price over a period of time in days (which is what coinGecko api takes as a parameter for historical prices)... i tried a quick construct that can be seen in the Coin.jsx namespace, but I gave up because 1) it's extra effort when I can just deploy the coinRanking Api reducer alongside coinGeck for the sole purpose of getting this more manageable, pre-prepare historical data from coinRanking (as JSmastery does at the end of his tutorial) and 2) frankly can't be bothered, prefer laravel projects to this react psychodrama!
          // so this coinranking Api is only here to fetch that historical data  (and as usual, as with newsApi and coinGeckoApi, its encapsulated exported var will be assigned the reducer path /name in the RTK store.js for redux to then encapsulate and inject into our React <App />)
        headers.set('X-RapidAPI-Key', /*NOTE that the tutorial didn't use a .env file  */'************');
        headers.set('Access-Control-Allow-Origin','*');
        headers.set('accept','application/json');
        headers.set('X-RapidAPI-Host', 'coinranking1.p.rapidapi.com');
      return headers;
    },
  });
export const coinRankingApi = createApi({
    reducerPath: 'coinRankingApi', 
    baseQuery: baseURIQuery, 
    endpoints: (builder)=> ({ 
      getCoinData: builder.query({
        query: (coinName)=> ({url: `/coins?search=${coinName}`}),
      }),
      getCoinHistory: builder.query({
          query: (coinId, timePeriod)=> ({url: `/coin/${coinId}/history?timePeriod=${timePeriod}`}),
        }),
    }),
});

export const { useGetCoinHistoryQuery, useGetCoinDataQuery} = coinRankingApi;
