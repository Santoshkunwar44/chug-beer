import { Button, Input } from "@nextui-org/react";
import ReusableModal from "../../shared/Modal";
import { api } from "../../utils/api";
import React, { ChangeEvent, useEffect, useState } from "react";
import { TEntry } from "../../utils/types";
import EntryCard from "../EntryCard";
import { useUserStore } from "../../libs/zustand/auth";
import AppPagination from "../Pagination";

const MyEntries = () => {
  const [createEntriesPayload, setCreateEntriesPayload] = useState<
    Pick<TEntry, "description" | "title">
  >({
    title: "",
    description: "",
  });

  const { user: loggedInUser } = useUserStore();
  const [entries, setEntries] = React.useState<TEntry[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [pageDetails, setPageDetails] = useState({
    perPage: 6,
    currentPage: 1,
    total: 0,
  });

  useEffect(() => {
    getEntriesOfAuser();
  }, [searchInput, pageDetails.currentPage]);

  const handleCreateEntry = async () => {
    if (!loggedInUser) {
      alert("Please login to create an entry");
      return;
    }
    try {
      const { status, data } = await api.createEntryApi({
        description: createEntriesPayload.description,
        title: createEntriesPayload.title,
        userId: loggedInUser._id,
      });

      if (status === 201) {
        await getEntriesOfAuser();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEntriesOfAuser = async () => {
    const userId = loggedInUser?._id;
    if (!userId) {
      return;
    }
    try {
      const { data, status } = await api.getEntriesOfUserApi(
        userId,
        searchInput,
        pageDetails.currentPage,
        pageDetails.perPage
      );
      if (status === 200) {
        setEntries(data.message);
        setPageDetails(data.pageDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEntryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateEntriesPayload((prev) => ({
      ...prev,
      [e.target.name as "title" | "description" | "userId"]: e.target.value,
    }));
  };

  console.log("my entries", pageDetails.currentPage);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold ">My Entries</h2>
        <div className="flex items-center gap-x-6">
          <Input
            label="Search"
            onChange={(e) => setSearchInput(e.target.value)}
            labelPlacement={"outside"}
            description={"Search your entries"}
          />
          <ReusableModal
            actionButtonClick={handleCreateEntry}
            button={
              <Button className="bg-[#7242f5] pointer-events-none">
                Create New Entry
              </Button>
            }
            title="Add a new entry"
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {entries.map((entry) => (
          <EntryCard entry={entry} key={entry._id} />
        ))}
      </div>
      <div className=" my-8 items-end w-full ">
        <AppPagination
          setPageChange={(page) => {
            setPageDetails((prev) => ({
              ...prev,
              currentPage: page,
            }));
          }}
          total={Math.ceil(pageDetails.total / pageDetails.perPage)}
          initialPage={pageDetails.currentPage || 1}
        />
      </div>
    </div>
  );
};

export default MyEntries;
