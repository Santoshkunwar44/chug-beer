import React from "react";
import { useUserStore } from "../libs/zustand/auth";
import { methods } from "../libs/methods";
import { api } from "../utils/api";

const useFetchUserData = () => {
  const { setUser } = useUserStore();
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<null | boolean>(
    null
  );

  const initializeUserData = async () => {
    const userId = methods.getUserDataFromLS()?.userId;
    console.log(userId);
    if (userId) {
      try {
        const { data, status } = await api.getUserByIdApi(userId);
        if (status === 200) {
          setUser(data.message);
          setIsUserLoggedIn(true);
        }
      } catch (error) {
        setIsUserLoggedIn(false);
        console.log(error);
      }
    }
  };

  return { isUserLoggedIn, initializeUserData };
};

export default useFetchUserData;
