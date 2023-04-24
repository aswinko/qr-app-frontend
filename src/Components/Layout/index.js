import React from "react";
import Header from "../Header";
import Tab from "../Tab";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Tab />
      {children}
    </>
  );
}

export default Layout;
