import { UserContext } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useReducer } from "react";

const initialState = {
  user: null,
  isUserLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    //
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        isUserLoading: false,
      };
    //
    case "SET_LOADING":
      return {
        ...state,
        isUserLoading: action.payload,
      };
    //
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    //
    case "INCREMENT_STREAK":
      return {
        ...state,
        user: {
          ...state.user,
          streak: {
            currentStreak: state.user.streak.currentStreak + 1,
          },
        },
      };
    //
    case "CLEAR_USER":
      return initialState;
    //
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(reducer, initialState);
  const { isLoggedIn, isAuthLoading, authFetch } = useAuth();

  //
  async function fetchUser() {
    try {
      const res = await authFetch({
        url: "user",
        method: "GET",
      });

      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        userDispatch({
          type: "SET_LOADING",
          payload: false,
        });

        throw Error(data.message);
      }

      userDispatch({
        type: "SET_USER",
        payload: {
          user: data.user,
        },
      });

      return data;
    } catch (err) {
      throw Error(err);
    }
  }

  useEffect(() => {
    if (isAuthLoading) return;

    if (!isLoggedIn) {
      userDispatch({
        type: "SET_LOADING",
        payload: false,
      });
      return;
    }

    fetchUser();
    //
  }, [authFetch, isLoggedIn, isAuthLoading]);

  //
  //
  //

  async function updateUser(updatedUserProp) {
    try {
      //
      const res = await authFetch({
        url: "user",
        method: "PATCH",
        body: { ...updatedUserProp },
      });

      const data = await res.json();

      if (!res.ok) {
        // return data;
        throw Error(data.message);
      }

      userDispatch({
        type: "UPDATE_USER",
        payload: {
          ...updatedUserProp,
        },
      });

      return data;

      //
    } catch (err) {
      throw Error(err);
    }
  }

  const incrementStreak = () => {
    try {
      // 
      userDispatch({
        type: "INCREMENT_STREAK",
      });
      // 
    } catch (err) {
      throw Error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: userState.user,
        isUserLoading: userState.isUserLoading,
        updateUser,
        incrementStreak,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
