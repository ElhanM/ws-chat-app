"use client";
import { setCurrentUser } from "@/lib/features/users/currentUserSlice";
import { useAppDispatch } from "@/lib/hooks";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const PopulateUserState = (props: Props) => {
  const dispatch = useAppDispatch();

  // On load of app, use token from storage to set current user
  // If token is not present, redirect to login page
  // If token is present, but is expired, redirect to login page
  // Else, set current user
  useEffect(() => {
    let token = localStorage.getItem(
      process.env.NEXT_PUBLIC_TOKEN_KEY || "token"
    );

    if (!token) {
      redirect("/auth/login");
    }

    let decodedToken: JwtPayload & {
      username: string;
    } = jwtDecode(token);

    let currentDate = new Date();

    if (!decodedToken.exp || !decodedToken.sub) {
      localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "token");
      redirect("/auth/login");
    }

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "token");
      redirect("/auth/login");
    } else {
      dispatch(
        setCurrentUser({
          id: decodedToken.sub,
          username: decodedToken.username,
        })
      );
    }
  }, []);

  return <></>;
};

export default PopulateUserState;
