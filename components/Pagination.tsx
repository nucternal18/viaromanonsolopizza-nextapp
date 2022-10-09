import React from "react";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";

// redux
import { useAppSelector, useAppDispatch } from "@app/hooks";
import {
  useDeleteImageMutation,
  useGetImagesQuery,
} from "@features/gallery/galleryApiSlice";
import { gallerySelector, setPage } from "@features/gallery/gallerySlice";

const PageBtnContainer = ({ numberOfPages }) => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector(gallerySelector);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  const changePage = (page) => {
    dispatch(setPage(page));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numberOfPages;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numberOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  return (
    <div className="font-mono flex flex-row items-center gap-2 ">
      <button
        className="flex flex-row p-2 items-center text-white gap-2 bg-rose-500 active:bg-rose-500 hover:bg-rose-600 rounded-l-md shadow-md"
        onClick={prevPage}
      >
        <HiChevronDoubleLeft fontSize={21} />
        prev
      </button>
      <div className="flex flex-row items-center gap-1 bg-rose-300 rounded-md">
        {pages?.map((pageNumber) => {
          return (
            <button
              type="button"
              className={`${
                pageNumber === page
                  ? "bg-rose-800 text-white rounded-md"
                  : "bg-rose-300 text-white"
              } py-2 px-4 gap-2  hover:bg-rose-400 shadow-md`}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="flex flex-row p-2 items-center text-white gap-2 bg-rose-500 hover:bg-rose-600 rounded-r-md shadow-md"
        onClick={nextPage}
      >
        next
        <HiChevronDoubleRight fontSize={21} />
      </button>
    </div>
  );
};

export default PageBtnContainer;
