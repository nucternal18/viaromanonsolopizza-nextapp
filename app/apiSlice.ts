import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { NEXT_URL } from "@config/index";

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError,
  Record<string, unknown>,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: `${NEXT_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, api) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// const baseQueryWithReAuth: BaseQueryFn = async (
//   args: string | FetchArgs,
//   api,
//   extraOptions
// ) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result?.error?.status === 400) {
//     api.dispatch(resetUserState());
//     result = await baseQuery(args, api, extraOptions);
//   }
//   if (result?.error?.status === 401 || result?.error?.status === 403) {
//     // send refresh token to get new token
//     const refreshResult: RefreshResult = await baseQuery(
//       "/refresh/",
//       api,
//       extraOptions
//     );
//     if (refreshResult?.data) {
//       const { auth } = api.getState() as RootState;
//       const user = auth.currentUser as UserInfoProps;
//       // store new token
//       api.dispatch(
//         setUserState({
//           currentUser: user,
//         })
//       );
//       // retry original request
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       if (refreshResult?.error?.status === 403) {
//         if (checkIsError(refreshResult?.error?.data)) {
//           refreshResult.error.data.message =
//             "You Session has expired. Please login again. ";
//         }
//       }
//     }
//   }
//   return result;
// };

export const userApiSlice = createApi({
  reducerPath: "User",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  keepUnusedDataFor: 500,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
export const menuApiSlice = createApi({
  reducerPath: "Menu",
  baseQuery: baseQuery,
  tagTypes: ["Menu"],
  keepUnusedDataFor: 500,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});

export const galleryApiSlice = createApi({
  reducerPath: "Gallery",
  baseQuery: baseQuery,
  tagTypes: ["Gallery"],
  keepUnusedDataFor: 500,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
