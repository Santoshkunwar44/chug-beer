import { Pagination } from "@nextui-org/react";

type PaginationProps = {
  total: number;
  initialPage: number;
  setPageChange: (page: number) => void;
};
export default function AppPagination({
  total,
  initialPage,
  setPageChange,
}: PaginationProps) {
  return (
    <Pagination
      className="w-full"
      showControls
      total={total}
      initialPage={initialPage}
      defaultValue={initialPage}
      onChange={(page) => setPageChange(page)}
    />
  );
}
