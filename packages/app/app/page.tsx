import React from "react";
import { redirect } from "next/navigation";

type Props = {};

const Home = (props: Props) => {
  redirect("/chats");
};

export default Home;
