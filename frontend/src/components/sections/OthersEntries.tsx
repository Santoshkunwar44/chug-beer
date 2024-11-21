import { api } from "../../utils/api";
import React, { useEffect, useState } from "react";
import { TEntry } from "../../utils/types";
import EntryCard from "../EntryCard";
import { useUserStore } from "../../libs/zustand/auth";
import AppPagination from "../Pagination";
import { Input } from "@nextui-org/react";

const OthersEntries = () => {
  const [entries, setEntries] = React.useState<TEntry[]>([]);
  const { user } = useUserStore();
  const [searchInput, setSearchInput] = useState("");
  const [pageDetails, setPageDetails] = useState({
    perPage: 6,
    currentPage: 1,
    total: 0,
  });
  useEffect(() => {
    getEntriesOfOthers();
  }, [searchInput, pageDetails.currentPage]);

  const getEntriesOfOthers = async () => {
    if (!user) {
      return;
    }
    try {
      const { data, status } = await api.getOtherEntriesApi(
        user._id,
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

  console.log(
    "other entries",
    Math.ceil(pageDetails.total / pageDetails.perPage)
  );
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold ">Friends Entries</h2>
        <div>
          <Input
            label="Search"
            onChange={(e) => setSearchInput(e.target.value)}
            labelPlacement={"outside"}
            description={"Search your entries"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {entries.slice(0, 3).map((entry) => (
          <EntryCard entry={entry} key={entry._id} />
        ))}
      </div>
      <div className=" my-8 items-end w-full ">
      {  pageDetails.total < pageDetails.perPage ? null :  <AppPagination
          setPageChange={(page) => {
            setPageDetails((prev) => ({
              ...prev,
              currentPage: page,
            }));
          }}
          total={Math.ceil(pageDetails.total / pageDetails.perPage) }
          initialPage={pageDetails.currentPage || 1}
        />}
      </div>
    </div>
  );
};

export default OthersEntries;
