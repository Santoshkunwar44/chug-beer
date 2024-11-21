import React, { useEffect } from "react";
import {
  NextUIProvider,
  Button,
  Avatar,
  Divider,
  Input,
} from "@nextui-org/react";
import { MessageCircle, Share2 } from "lucide-react";
import AppNavbar from "../shared/Navbar";
import { api } from "../utils/api";
import { useParams } from "react-router-dom";
import { TComment, TEntry } from "../utils/types";
import moment from "moment";
import CommentSection from "../components/sections/CommentSection";
import ReusableModal from "../shared/Modal";
import { useUserStore } from "../libs/zustand/auth";
import UploadVideo from "../components/sections/UploadVideo";

export default function EntryDetail() {
  const params = useParams();
  const [entry, setEntry] = React.useState<TEntry | null>(null);
  const { user } = useUserStore();
  const [comments, setComments] = React.useState<TComment[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchEntryById();
      fetchCommentsOfEntry();
    }
  }, [params.id]);

  const fetchEntryById = async () => {
    try {
      const { data, status } = await api.getEntryByIdApi(params.id as string);
      if (status === 200) {
        setEntry(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCommentsOfEntry = async () => {
    try {
      const { data, status } = await api.getCommentsOfEntryApi(
        params.id as string
      );
      if (status === 200) {
        setComments(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!entry) {
    return <>loading...</>;
  }

  return (
    <NextUIProvider>
      <AppNavbar />
      <div className="min-h-screen  text-gray-100 p-6">
        <div className="container mx-auto ">
          <div className=" rounded-2xl overflow-hidden transition-transform transform  duration-300">
            <div className="p-8">
              {entry.videoUrl ? (
                <div className="aspect-video rounded-lg flex items-center justify-center mb-8">
                  <video
                    src={entry?.videoUrl}
                    className="w-full"
                    autoPlay
                    controls
                  />
                </div>
              ) : (
                <div className=" gap-x-3 my-6">
                  <Input
                    color="warning"
                    disabled
                    size="lg"
                    className="my-2"
                    placeholder="No video uploaded"
                  />
                </div>
                // <NoVideos />
              )}
              <div className="flex items-center gap-x-4 mb-8">
                <Avatar
                  isBordered
                  src={
                    entry.userId?.avatar ||
                    "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  }
                />
                <div className="flex flex-col">
                  <p className="text-md">{entry.userId?.username}</p>
                  <p className="text-small text-default-500">
                    {moment(entry.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 mb-6">
                <p className="text-gray-300 capitalize text-lg leading-relaxed">
                  {entry.title}
                </p>
                <p className="text-gray-300 text-md leading-relaxed ">
                  {entry.description}
                </p>
              </div>
              <div className="my-6">
                {entry.userId?._id === user?._id && !entry.videoUrl && (
                  <ReusableModal
                    hideActionButton={true}
                    backdrop="blur"
                    actionButtonClick={() => {}}
                    bodyContent={
                      <>
                        <UploadVideo
                          success={fetchEntryById}
                          entryId={entry._id}
                        />
                      </>
                    }
                    title="Upload video for this entry"
                    actionButtonText="upload video"
                    button={
                      <Button className="bg-[#7C3AED] pointer-events-none">
                        Upload video
                      </Button>
                    }
                  ></ReusableModal>
                )}
              </div>

              <div className="flex  items-center mb-8 space-x-4">
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<MessageCircle size={16} />}
                  className="text-indigo-500 font-semibold flex"
                >
                  {comments.length} Comments
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Share2 size={16} />}
                  className="text-indigo-500 font-semibold flex"
                >
                  Share
                </Button>
              </div>

              <Divider className="my-8 bg-gray-700" />
              <CommentSection
                comments={comments}
                refetch={fetchCommentsOfEntry}
              />
            </div>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}
