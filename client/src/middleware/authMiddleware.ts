import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/auth";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listtenerApi) => {
    listtenerApi.cancelActiveListeners();

    const token = action.payload.accessToken;
console.log('1',action);

    if (token) {
      console.log('2',action);
      localStorage.setItem('token', token);
    }
  }
})