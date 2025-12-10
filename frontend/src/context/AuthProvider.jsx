import { useReducer } from "react";
import { AuthContext } from "@/context/AuthContext";
import { loginRequest } from "@/api/authAPI";

const initialState = {
  user: null,
  accessToken: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function login(email, password) {
    const res = await loginRequest(email, password);
    const data = await res.json();

    if (!res.ok) throw Error(data.message);

    dispatch({ type: "SET_TOKEN", payload: data.accessToken });

    return true;
  }

  return (
    <AuthContext.Provider
      value={{ state, accessToken: state.accessToken, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
