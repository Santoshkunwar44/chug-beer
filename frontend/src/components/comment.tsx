import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { TComment } from "../utils/types";
import moment from "moment";

export default function EntryComment({ comment }: { comment: TComment }) {

  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://nextui.org/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {comment.userId.username}
            </h4>
            <div className="flex gap-1">
              <p className=" text-default-400 text-sm">
                {moment(comment.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{comment.text}</p>
      </CardBody>
      <CardFooter className="gap-3"></CardFooter>
    </Card>
  );
}
