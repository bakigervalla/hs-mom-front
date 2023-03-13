import {
  SET_LOADING,
  FETCH_APPS,
  FETCH_PAGES,
  FETCH_INSIGHTS,
  FETCH_SUBSCRIPTIONS,
  BUY_SUBSCRIPTIONS,
  SET_SUBSCRIPTION,
  SET_ERROR,
  GET_CLIENTS,
  
  SAVE_PAGES,
  SOCIAL_PAGES,
  SET_INSIGHTS,
  EMPTY_RESPONSE,
  SET_AUTH,
} from "./types";

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        alertsState: null,
        error: null
      };
    case EMPTY_RESPONSE:
      return {
        ...state,
        loading: false,
      };
    case FETCH_APPS:
      return {
        ...state,
        apps: payload.apps,
        activeApp: payload.activeApp,
        loading: false,
      };
    case FETCH_PAGES:
      return {
        ...state,
        pages: payload.pages,
        activePage: payload.activePage,
        pagesOptions: payload?.pages.map((p, i) => {
          return {
            value: p.page_token,
            label: p.page_name,
            default: p.default,
            app_id: p.app_id,
            id: p.id,
            page_id: p.page_id,
          };
        }),
        loading: false,
      };
    case SAVE_PAGES:
      return {
        ...state,
        pages: payload,
        loading: false,
      };
    case SOCIAL_PAGES:
      return {
        ...state,
        socialPages: payload,
        loading: false,
      };
    case FETCH_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: payload,
        loading: false,
      };
    case BUY_SUBSCRIPTIONS:
      return {
        ...state,
        isOrderSucessfull: payload.isSuccess,
        order: payload.order,
        loading: false,
      };
    case GET_CLIENTS:
      return {
        ...state,
        clients: payload,
        loading: false,
      };
    case FETCH_INSIGHTS:
      return {
        ...state,
        insights: payload,
        loading: false,
      };
    case SET_SUBSCRIPTION:
      return {
        ...state,
        subscriptionId: payload,
      };
    case SET_AUTH:
      return {
        ...state,
        loading: false,
        socialAccount: { title: payload.title, desc: payload.desc, accountToken: payload.accountToken }
      };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        alertsState: {
          type: "error",
          message: payload,
        },
        error: payload,
      };
    default:
      return state;
  }
};
