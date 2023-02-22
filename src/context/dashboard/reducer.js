import {
  SET_LOADING,
  FETCH_APPS,
  FETCH_METRICS,
  FETCH_SUBSCRIPTIONS,
  BUY_SUBSCRIPTIONS,
  SET_SUBSCRIPTION,
  SET_ERROR,
  GET_CLIENTS,
  GET_PAGES,
  SAVE_PAGES,
  SOCIAL_PAGES,
  GET_INSIGHTS,
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
        error: null,
        auth_message: null
      };
    case EMPTY_RESPONSE:
      return {
        ...state,
        loading: false,
      };
    case FETCH_APPS:
      return {
        ...state,
        apps: payload,
        activeApp: payload.filter((a) => a.is_default),
        loading: false,
      };
    case GET_PAGES:
      let _activePage = payload?.filter((el) => el.default);
      return {
        ...state,
        pages: payload,
        pagesOptions: payload?.map((p, i) => {
          return {
            value: p.page_token,
            label: p.page_name,
            default: p.default,
            app_id: p.app_id,
            page_id: p.id,
          };
        }),
        activePage: _activePage ? _activePage[0] : null,
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
    case FETCH_METRICS:
      return {
        ...state,
        insights: payload,
        loading: false,
      };
    case GET_INSIGHTS:
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
          auth_message: payload
        };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        alertsState: {
          type: "error",
          message: payload,
        },
        error: payload
      };
    default:
      return state;
  }
};
