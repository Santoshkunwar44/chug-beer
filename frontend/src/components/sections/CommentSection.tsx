import React from "react";
import { TComment } from "../../utils/types";
import EntryComment from "../comment";
import { Button, Textarea } from "@nextui-org/react";
import { Send } from "lucide-react";
import { api } from "../../utils/api";
import { useParams } from "react-router-dom";
import { useUserStore } from "../../libs/zustand/auth";

const CommentSection = ({
  comments,
  refetch,
}: {
  comments: TComment[];
  refetch: () => void;
}) => {
  const [newComment, setNewComment] = React.useState("");
  const { user } = useUserStore();
  const params = useParams();

  const handleSubmitComment = async () => {
    const userId = user?._id;

    if (!userId) {
      alert("Please login to create an entry");
      return;
    }
    try {
      const { status } = await api.createCommentApi({
        userId: userId,
        text: newComment,
        entryId: params.id as string,
      });

      if (status === 201) {
        setNewComment("");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5 text-white">Comments</h2>
      <Textarea
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button
        className="mt-2 w-full bg-[#7242f5] h-14"
        onClick={handleSubmitComment}
      >
        <Send size={20} className="mr-2 text-white" />
        <span className="text-white font-semibold">Send</span>
      </Button>
      <div className="flex flex-col gap-3 my-4">
        {comments.map((comment) => (
          <EntryComment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
