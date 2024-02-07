"use client";
import { setCurrentUser } from "@/lib/features/users/currentUserSlice";
import { useAppDispatch } from "@/lib/hooks";
import { DecodedToken } from "@/types/decodedToken";
import jwtDecode from "@/utils/jwtDecode";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const PopulateUserState = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const validateToken = (decodedToken: DecodedToken) => {
    let currentDate = new Date();

    if (!decodedToken.exp || !decodedToken.sub) {
      removeTokenFromLocalStorage();
      router.push("/auth/login");
      return;
    }

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      removeTokenFromLocalStorage();
      router.push("/auth/login");
      return;
    }

    return true;
  };

  const dispatchUser = (decodedToken: DecodedToken) => {
    if (!decodedToken.sub || !decodedToken.username) {
      removeTokenFromLocalStorage();
      router.push("/auth/login");
      return;
    }

    dispatch(
      setCurrentUser({
        id: decodedToken.sub,
        username: decodedToken.username,
      })
    );
  };

  // On load of app, use token from storage to set current user
  // If token is not present, redirect to login page
  // If token is present, but is expired, redirect to login page
  // Else, set current user
  useEffect(() => {
    let token = getTokenFromLocalStorage();

    if (!token) {
      router.push("/auth/login");
      return;
    } else {
      let decodedToken = jwtDecode(token);

      if (validateToken(decodedToken)) {
        dispatchUser(decodedToken);
      }
    }
  }, []);

  return <></>;
};

export default PopulateUserState;
