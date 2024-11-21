"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";
import { Beer } from "lucide-react";
import LoginCredInfo from "../components/LoginCredInfo";
import { useUserStore } from "../libs/zustand/auth";
import Login from "../components/Login";

export default function AppNavbar() {

  const { user: currentUser } = useUserStore();



  return (
    <Navbar
      maxWidth="full"
      className=" h-16 text-white container mx-auto bg-transparent "
    >
      <NavbarContent>
        {/* <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        /> */}
        <RouterLink to={"/"}>
          <NavbarBrand>
            <Beer className="mr-2 text-[#7242f5]" />
            <p className="font-bold text-inherit"> UTSFFL Challenge</p>
          </NavbarBrand>
        </RouterLink>
      </NavbarContent>

      {currentUser ? (
        <LoginCredInfo user={currentUser} />
      ) : (
       <Login/>
      )}
    </Navbar>
  );
}
