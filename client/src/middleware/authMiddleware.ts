import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listtenerApi) => {
    listtenerApi.cancelActiveListeners();

    const token = action.payload.accessToken;

    if (token) {
      localStorage.setItem('token', token);
    }
  }
})