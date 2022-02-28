import { configureStore } from "@reduxjs/toolkit";
import routesReducer from "../features/router/routerSlice";

export default configureStore({
  reducer: {
    router: routesReducer,
  },
});
