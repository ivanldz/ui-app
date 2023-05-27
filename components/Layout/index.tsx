import React, { PropsWithChildren } from "react";
import Sidebar from "../Sidebar";
import Head from "next/head";

const Layout = (props: PropsWithChildren) => {
  return (
    <div>
      <Head>
        <title>Alegra Challenge</title>
        <meta name="description" content="Alegra Challenge by Ivan Dominguez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      {props.children}
    </div>
  );
};

export default Layout;
