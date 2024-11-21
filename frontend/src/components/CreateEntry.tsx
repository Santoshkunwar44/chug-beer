import { ChangeEvent, useState } from "react";
import ReusableModal from "../shared/Modal";
import { Button, Input } from "@nextui-org/react";
import { TEntry } from "../utils/types";
import { useUserStore } from "../libs/zustand/auth";
import { api } from "../utils/api";
import useToast from "../hooks/useToast";

const CreateEntry = ({
  getEntriesOfAuser,
}: {
  getEntriesOfAuser: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  const [createEntriesPayload, setCreateEntriesPayload] = useState<
    Pick<TEntry, "description" | "title">
  >({
    title: "",
    description: "",
  });
  const { user: loggedInUser } = useUserStore();

  const handleEntryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateEntriesPayload((prev) => ({
      ...prev,
      [e.target.name as "title" | "description" | "userId"]: e.target.value,
    }));
  };
  const handleCreateEntry = async () => {
    if (!loggedInUser) {
      showToast("Please login first", "error");
      return;
    }
    if (!createEntriesPayload.title || !createEntriesPayload.description) {
      showToast("Please enter title and description", "error");

      return;
    }
    try {
      const { status } = await api.createEntryApi({
        description: createEntriesPayload.description,
        title: createEntriesPayload.title,
        userId: loggedInUser._id,
      });

      if (status === 201) {
        await getEntriesOfAuser();
        setIsOpen(false);
        showToast("Entry created successfully", "success");
      }
    } catch (error) {
      console.log(error);
      showToast("Failed to create entry", "error");
    }
  };
  return (
    <ReusableModal
      actionButtonClick={handleCreateEntry}
      button={
        <Button className="bg-[#7242f5] " onClick={() => setIsOpen(true)}>
          Create New Entry
        </Button>
      }
      title="Add a new entry"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      bodyContent={
        <>
          <form className="flex w-full flex-col flex-wrap md:flex-nowrap gap-4">
            <Input
              type="text"
              label="Title"
              name="title"
              required
              placeholder="Enter title"
              onChange={handleEntryInputChange}
            />
            <Input
              required
              type="text"
              label="Description"
              name="description"
              placeholder="Enter description"
              onChange={handleEntryInputChange}
            />
          </form>
        </>
      }
      backdrop={"blur"}
      actionButtonText="Create Entry"
    />
  );
};

export default CreateEntry;
