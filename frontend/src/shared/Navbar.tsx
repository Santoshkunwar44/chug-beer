"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Input,
} from "@nextui-org/react";
import { Beer } from "lucide-react";
import ReusableModal from "./Modal";
import { api } from "../utils/api";
import { useUserStore } from "../libs/zustand/auth";
import LoginCredInfo from "../components/LoginCredInfo";
import { methods } from "../libs/methods";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user: currentUser, setUser } = useUserStore();
  const [loginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
  });

  const menuItems = [
    "Home",
    "Challenges",
    "Leaderboard",
    "Community",
    "How to Use",
  ];

  const handleLogin = async () => {
    try {
      const { data, status } = await api.loginUserApi({
        password: loginDetails.password,
        username: loginDetails.username,
      });
      if (status === 200) {
        console.log(data);
        setUser(data.message);
        methods.addUserDataToLS({ userId: data.message?._id || "" });
      }
    } catch (error: unknown | Error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className=" h-16 text-white container mx-auto bg-transparent "
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <Beer className="mr-2 text-[#7242f5]" />
          <p className="font-bold text-inherit">Beer Chug Challenge</p>
        </NavbarBrand>
      </NavbarContent>

      {currentUser ? (
        <LoginCredInfo user={currentUser} />
      ) : (
        <ReusableModal
          actionButtonClick={handleLogin}
          bodyContent={
            <>
              <div className="flex flex-col gap-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  label="Username"
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      username: e.target.value,
                    })
                  }
                />
                <Input
                  type="text"
                  placeholder="Password"
                  label="Password"
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </>
          }
          button={
            <Button className="bg-[#7242f5] pointer-events-none">Login</Button>
          }
          backdrop="blur"
          title="Login to your account"
          actionButtonText="Login"
        ></ReusableModal>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="foreground" className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
