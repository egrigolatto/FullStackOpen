import React from "react";
import { NavBar } from "./Navbar";

const Header = ({ user }) => {
  return (
    <header className="mb-4">
      <NavBar user={user} />
    </header>
  );
};

export { Header };
