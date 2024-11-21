import React from "react";
import ReusableModal from "../shared/Modal";
import { api } from "../utils/api";
import { useUserStore } from "../libs/zustand/auth";
import { methods } from "../libs/methods";
import { Button, Input } from "@nextui-org/react";
import useToast from "../hooks/useToast";

const Login = () => {
  const [loginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
  });
  const { setUser } = useUserStore();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogin = async () => {
    if (!loginDetails.username || !loginDetails.password) {
      showToast("Please enter username and password", "error");
      return;
    }
    try {
      const { data, status } = await api.loginUserApi({
        password: loginDetails.password,
        username: loginDetails.username,
      });
      if (status === 200) {
        console.log(data);
        setUser(data.message);
        methods.addUserDataToLS({ userId: data.message?._id || "" });
        showToast("Login successful", "success");
      }
    } catch (error: unknown | Error) {
      showToast("Invalid credentails", "error");
      console.log(error);
    }
  };

  return (
    <ReusableModal
      actionButtonClick={handleLogin}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
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
        <Button className="bg-[#7242f5] " onClick={() => setIsOpen(true)}>
          Login
        </Button>
      }
      backdrop="blur"
      title="Login to your account"
      actionButtonText="Login"
    ></ReusableModal>
  );
};

export default Login;
