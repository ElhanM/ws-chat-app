"use client";
import jwtDecode from "@/utils/jwtDecode";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "@/utils/localStorage";
import { redirect } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const LoginGuard = (props: Props) => {
  useEffect(() => {
    let token = getTokenFromLocalStorage();

    if (token) {
      let decodedToken = jwtDecode(token);

      let currentDate = new Date();

      if (!decodedToken.exp || !decodedToken.sub) {
        removeTokenFromLocalStorage();
        return;
      }

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        removeTokenFromLocalStorage();
        return;
      }

      redirect("/chats");
    }
  }, []);

  return <></>;
};

export default LoginGuard;
