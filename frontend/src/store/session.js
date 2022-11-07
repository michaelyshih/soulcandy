import csrfFetch,{ storeCSRFToken } from "./csrf";
import { fetchItems } from "./cartItemsReducer";

export const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
  }

  export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    if (data.user){
      dispatch(fetchItems(data.user.id));
    }
    return response;
  };

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password
      })
    });
    const data = await response.json();
    if (data?.errors) return data.errors;
    dispatch(setCurrentUser(data.user));
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password
      })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    if (data?.errors) return data.errors;
    dispatch(setCurrentUser(data.user));
  };



  const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
  };

  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        return { ...state, user: action.payload };
      case REMOVE_CURRENT_USER:
        return { ...state, user: null };
      default:
        return state;
    }
  };

// export const logoutUser = userId => async (dispatch) =>{
//     let res = await csrfFetch("api/session",{ method: "DELETE"});
//     sessionStorage.setItem("currentUser",null)
//     dispatch(removeCurrentUser(userId));
// }
export default sessionReducer;
