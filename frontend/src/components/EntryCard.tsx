import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Avatar,
} from "@nextui-org/react";
import { TEntry } from "../utils/types";
import moment from "moment";

export default function EntryCard({ entry }: { entry: TEntry }) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Avatar
          isBordered
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <div className="flex flex-col">
          <p className="text-md">{entry.userId?.username}</p>
          <p className="text-small text-default-500">
            {moment(entry.createdAt).fromNow()}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{entry.title}</p>
        <p className="text-small mt-2 text-gray-400">{entry.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          showAnchorIcon
          href={`/entry/${entry._id}`}
        >
          View entry details
        </Link>
      </CardFooter>
    </Card>
  );
}
