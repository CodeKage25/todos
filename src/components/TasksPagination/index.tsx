import ReactPaginate from "react-paginate";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
export default function TasksPagination({ handlePageClick, pageCount }: any) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm font-semibold">Next</span>
          <HiArrowRight className="text-xl font-semibold" />
        </div>
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      pageCount={pageCount || 1}
      previousLabel={
        <div className="flex items-center gap-2 cursor-pointer">
          <HiArrowLeft className="text-xl font-semibold" />{" "}
          <span className="text-sm font-semibold">Previous</span>
        </div>
      }
      renderOnZeroPageCount={null}
      containerClassName="mt-8 lue-400 border-t border-t-gray-200 py-5 flex items-center justify-between text-gray-600"
      pageLinkClassName="text-sm w-10 h-10 flex items-center rounded-full justify-center hover:bg-gray-200 cursor-pointer"
      activeLinkClassName="bg-gray-50 text-gray-800"
    />
  );
}
