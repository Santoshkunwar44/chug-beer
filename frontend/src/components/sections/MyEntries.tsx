import { Input } from "@nextui-org/react";
import { api } from "../../utils/api";
import React, { useEffect, useState } from "react";
import { TEntry } from "../../utils/types";
import EntryCard from "../EntryCard";
import { useUserStore } from "../../libs/zustand/auth";
import AppPagination from "../Pagination";
import CreateEntry from "../CreateEntry";

const MyEntries = () => {
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
          <CreateEntry getEntriesOfAuser={getEntriesOfAuser} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {entries.map((entry) => (
          <EntryCard entry={entry} key={entry._id} />
        ))}
      </div>
      <div className=" my-8 items-end w-full ">
        {pageDetails.total < pageDetails.perPage ? null : (
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
        )}
      </div>
    </div>
  );
};

export default MyEntries;
