import React, { PropsWithChildren } from "react";
import Sidebar from "../Sidebar";

const Layout = (props: PropsWithChildren) => {
  return (
    <div>
      <Sidebar />
      {props.children}
    </div>
  );
};

export default Layout;
