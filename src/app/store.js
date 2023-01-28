// This is a construct required to interact with the rapid api constructs which are using the axios library. Axios needs a kind of 'endpoint' which is nicknamed a 'store' to interact with the api fetch function and intermediate(i.e midleware) the data request/response http objects incoming via APi

import { configureStore } from "@reduxjs/toolkit";

// we now import our customised RTK Query package-configured crypto api containervar instance into our api storage (which is a redux toolkit shorhand container-var instance of the usually much more verbose redux syntax for creating a middleware store class/namespace.)
import { coinGeckoApi } from "../services/coinGeckoApi";
//import { coinRankingApi } from "../services/coinRankingApi"; 
import { newsApi } from "../services/newsAPI";

export default configureStore({
    reducer: {
        // this is essentially aligning our RTK Query defined middleware into this redux reducer function which 'absorbs' the various specifics of defining the api middleware into one property of this store. Note that because this is an array, the reducer property actually takes an array of different 'abstracted' middlewares and then reduces them at a further level of abstraction. saving code essentially. Presumably reducer doesn't only take 'already abstracted' middleware constructs liek the one below, we can even write a function directly into this reducer object as an destructure object of this reducer object array.
        // regarding this, it is similar to an operating system environemtn like Linux or microssoft... we have a 'symbolic link' with a 'hard' file/directory being assigned to that symbolic linbk - in this case, our coinGeckoApi.js (rtk-query package abstracted in its own right) is being assigned a kind of 'prefixed namespace' as coinGeckoApi.reducer -- and same of others like coinRnakingApi or newsApi
        [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
        //[coinRankingApi.reducerPath]: coinRankingApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
    },
    // note that i had an error relating to the reduced apis encapsulated var not being added to the RTK encapsulated store var in the console... I searched and found that I must list the rtk query middleware explicitly into the rtk store encapsulated var object's properties (as below)
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware).concat(coinGeckoApi.middleware)/*.concat(coinRankingApi.middleware),*/
    // he didnt do this in the tutorial without issues but it did cause a problem for me but took a minute to solve. NOTE, the reason why he didn't have to do it was because he made a separate callback function for the whole of the RTK QUERY fetching, whereas my construct is trying to keep to the schema set out by RTK Query's creator --- since there should not be aneed for creating a custom callback funct whtn the RTK Query class already has all that's required for packaging the api data into a RTK reducer for sending over to the React App namespace (which is what we are doing right now in this store.js class) RTK Query documentation is clear on this issue.
});