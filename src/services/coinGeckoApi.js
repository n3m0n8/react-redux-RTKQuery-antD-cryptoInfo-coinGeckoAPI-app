//import redux middleware  classes for instantiating an api object and fetching from query. This uses the RTK query library to encapsulate.
// note, important to add /query/react on this filepath otherwise you recieve exported function "is not a function" error in console.
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
///IMPORTANT THIS PATH IS DEPRECTATED:  @reduxjs/toolkit/dist/query

//set Api headers using the copypasted api info headers object from coinranking api:
/* const coinRankingApiHeaders = {
    'X-RapidAPI-Key': '**********',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
}
no need for a separae var /function to ffeed in headers, we just feed them directly into the RTK's fetchBaseQuery meth
*/ 

// no need for this since we pass that in our custom baseQuery const baseURL = 'https://coinranking1.p.rapidapi.com/coins';

// official documentationl boilerplate for building a custom baseQuery with optional parameters like prepareHeaders: ...

const baseURIQuery = fetchBaseQuery({
    mode: "cors", //emable CORS response from server
    // NOTE There is a cors issue with coinranking and now coinranking are asking devs to sign up for the paid subscription to be able to get a cors header from them... so i switched to coingecko which provides rate-limited but no api key api req.
    //baseUrl: `https://api.coinranking.com/v2`,
    baseUrl: `https://api.coingecko.com/api/v3`,
    prepareHeaders: (headers /*, { getState }*/) => {
    // the getState destructured object is an optional arg2 alongside headersarg1. This get state will fetch the session state in local memory to see if an authorisation token has been granted and is still in force in the current session/ not expired... the point here is to reduce multiple api calls, since if we have auth already, there is no need. I've left it as is for educational purposes , but there is no need for this optional arg2 for our purposes of getting crypto prices -no authentication.
      //const token = getState().auth.token
      // If we have a token set in state, let's assume that we should be passing it.
      //if (token) {
        //headers.set('authorization', `Bearer ${token}`)
        // now we set our relevant headers to be encapuslated into out baseQuery object var.
        // we take headers from the copy-pasted rapid api dump. (arg1HeaderName, arg2 value)
        //coingecko doesnt need a key
        //this is the key previously used for coinranking
        //headers.set('X-RapidAPI-Key', '***************');
        headers.set('Access-Control-Request-Method','*');
        headers.set('accept','application/json');//set cors to llow all but note that this cors flag is initialised by the server's api data response, not by the client's http request object
        //headers.set('X-RapidAPI-Host', 'coinranking1.p.rapidapi.com');
      // return headers to main memory so that we can now deploy the baseRequest RTK Query class-based formulated object variable into another of RTK Query class/namespace object instances, in this case via the createApi() method.
      return headers;
    },
  });
// encapsulate at a further level now, the api container var which will hold all of the various endpoints to be attached to the prefixed baseURIQuery (which we just encapsulated with the baseurl and headers in the global scope const just above). Note also i made sure to name it baseURIQuery in order to distinguish from baseQuery which is a builtin property of the TRK Query packages' meths.

// note the EXPORT statement here, it is saying we are exporting the encapuslated coinGeckoApi object out of this namespace... and we will important at one level up of abstraction in our store.js redux toolkit related namespace.
export const coinGeckoApi = createApi({
    reducerPath: 'coinGeckoApi', // property 1 of the encapsulated object being generated via RTK Query's createApi() method is a symbolic pathway that this RTK Query method allows to assign a pathname (similar to a symbolic link in a computer OS assigns a 'symbolic' path to a 'hard or direct' path pointing to a file or folder). This will be used when we go 'up one level' of abstraction to the store.js namespace/class (where we leave the 'field' of the RTK Query package's encapsulations and go instead to the Redux Toolkit (RTK) level of encapsulations - and which, remmeber, is itself abstracting at a further level up, to redux's store construct and other abstractions -- which, yet again, abstracts one more time from react/virtualDOM's handling of apis and other state/data management as an overlay of Javascript/DOM)
    baseQuery: baseURIQuery, // assign the aforecoded baseURIQuery to the inbuilt baseQuery property.
    // note, we can actually define baseQuery right here, but i think having it as a separate pre-compiled const is neater for us to read.
    // the createApi meth can take many properties as its destructured Arg1 object (which is encapsulateing an API definition in a shorthand way for us). one that we need is this endpoint property, this is simploy outlining an array of potential endpoints. The reason is, since we now have a sorted out basequery that we have enacpsulated into our api container var (coinGecko) which we will export for thur, higher up, encapsulation at teh redux toolkit level as a stored api pathway we might as well also have in this endpoint destructured property object an array holding multiple endpoints of our URI, in the case that we need to hit up the api for different parts of its data/resource (in this case we do, we need the coinranking api for cryptocurrency prices but also for exchanges, so those are the endpoints will we stick into this encapsulated endpoints property, to be bagged up into our coinGeckoApi object and exported from this namespace/class (or whatever this is called in javascript - namespace in python, class in java))
    endpoints: (builder)=> ({ // builder is inbuilt method (we can rename it as we like build, builder, bobthebuilder) 
        //here we are assigning a particular endpoint and 'building or moulding' it into the left-hand sign endpoint property sub-property (i.e. endpoints.getCoinInfo will spit out /coins from the coinranking api and so on)
        /*
        getCoinInfo: builder.query({
            query: (coinsToShow)=> ({url: `/coins?limit=${coinsToShow}`}),
        }),
        */
        getGlobalInfo: builder.query({
          query: ()=>({url: `/global`}),
        }),
        getCoinsInfo: builder.query({
          query: (coinsToShow)=> ({url: `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsToShow}&page=1`}),
        }),
        getCoinInfo: builder.query({
          query: (coinName)=> ({url: `/coins/${coinName}`}),
        }),
        getExchangeInfo: builder.query({
            query: ()=> ({url: `/exchanges?&per_page=20&page=1`}),
        }),
        // chain on any further endpoints that will all be prefixed by our baseURIQuery const from abov.
    }),
});

// export getCoinInfo and getExchangeInfo query that has now been built, so we can deploy in on our RTK reducer property of our instance object of the Redux store component and rememebr that the redux store component is wrapping around our entire app and app router , meaning tha these condensed and multi-level abstracted api queries are being provided to our app for deployment.
// note the syntax where we export the useQuery from the RTK query createApi class but we insert the particular name of the query that we created for our customised RTK query middleware within the use...Query:
// note also that the query execution is done particularly to allow multiple queries. So in the condensed coinGeckoApi instance object created via the RTK query's createApi method, we compiled the basequery using the baseuri and headers and then we also assigned it another object 'endpoints' whose properties make use of another RTK Query method (builder) which builds an endpoint i.e. /finaldestinationOfUri 
export const { useGetGlobalInfoQuery, useGetCoinInfoQuery,useGetCoinsInfoQuery, useGetExchangeInfoQuery, } = coinGeckoApi;




/* THis is all old construct as I was following tutorial. But you might find it interesting as there is more information as I was working through this issue. 
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    // note in the tutorial example, he creates a separate variable holding the headers from the rapidapi copy-paste job. And then he create a function to fetch them. But the creator of RTK Query @phryneas pointed out that this was uneccessry since the baseQuery namespace already abstracts the headers, just as it does base url etc... so we can pass the headers directly into the RTK Query packages' baseQuery class that is being 'reduced' into the cryptoApi instance object container var using the createApi() method. The fetchbasequery has a baserUrl: property which is here being fed in automatically since the value/name is the same (baseUrl: baseUrl) but we can also now input the copy-pasted coinranking api header variable directly here under the fetchBaseQuery's header: property.
    

    //presumably endpoints is another of rtk's namespace/classes which has a builder method that builds the sent api query with all of the contained base uri and headers iunfor above.  SO the above section, basequery, deals with compiling the base api request, while the endpoints deals executing the fetch on the endpoint. We pass to the createRequest() method which executes this endpoint fetching a particular final section of the api URI addres (i.e. the endpoint on the api provider) which will dictate where/which data we are fetching. coinranking website where Jason holds these api data objects... in his initial example he put our /exchanges page now we put /coins to get the coin prices into that endpoint
    endpoints: (builder)=> ({
        getCryptos: builder.query({
            query: ()=> '/coins',
        }),
    }),
});




//this is rapid API copy-paste job for coinranking API- this is a lot easier that figuring out vanilla js api calls/fetching constructs via individual documetation...

//const axios = require("axios");
/*
const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'X-RapidAPI-Key': '*************',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};
*/

/*
axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
}); */