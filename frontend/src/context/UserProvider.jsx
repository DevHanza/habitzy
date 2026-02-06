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
  //
  //

  useEffect(() => {
    if (isAuthLoading) return;

    if (!isLoggedIn) {
      userDispatch({
        type: "SET_LOADING",
        payload: false,
      });
      return;
    }
    //
    const fetchUser = async () => {
      const res = await authFetch({
        url: "user",
        method: "GET",
      });

      if (!res.ok) {
        userDispatch({
          type: "SET_LOADING",
          payload: false,
        });

        return;
      }

      //
      const data = await res.json();
      // console.log(data);
      userDispatch({
        type: "SET_USER",
        payload: {
          user: data.user,
        },
      });
    };

    fetchUser();
    //
  }, [authFetch, isLoggedIn, isAuthLoading]);

  //
  //
  //

  async function updateUser(updatedUserProp) {
    // console.log(updatedUserProp);

    try {
      //

      authFetch({
        url: "user",
        method: "PATCH",
        body: { ...updatedUserProp },
      })
        .then(async () =>
          // response
          {
            // const data = await response.json();
            //
            userDispatch({
              type: "UPDATE_USER",
              payload: {
                ...updatedUserProp,
              },
            });

            //
          },
        )
        .catch((err) => {
          console.log(err);
        });

      //
    } catch (err) {
      throw Error(err);
    }
  }

  const incrementStreak = () => {
    userDispatch({
      type: "INCREMENT_STREAK",
    });
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
