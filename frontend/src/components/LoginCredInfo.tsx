import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import moment from "moment";
import { TUser } from "../utils/types";

const LoginCredInfo = ({ user }: { user: TUser }) => {
  return (
    <div className="flex  gap-x-3">
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <Button className="bg-transparent flex gap-x-4  overflow-visible">
            <Avatar
              isBordered
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
            <div className="flex flex-col items-start">
              <p className="text-md">{user.username}</p>
              <p className="text-small text-default-500">
                {moment(user.lastLoggedIn).fromNow()}
              </p>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-[#18181B] p-0">
          <Menu>
            <MenuItem className="bg-red-500 ">LOGOUT</MenuItem>
          </Menu>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LoginCredInfo;
