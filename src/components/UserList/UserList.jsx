import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/api";
import { Fragment } from "react";
import Button from "../utils/Button";
import Tooltip from "../utils/Tooltip";
import Loader from "../utils/Loader";
import fallbackImage from "../../assets/photo-cover.svg";

export default function UserList() {
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => getUsers(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  return (
    <section id="users" className="flex flex-col items-center">
      <h2 className="text-heading mb-12.5 text-center">
        Working with GET request
      </h2>
      <div className="w-full mb-8 relative">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full place-items-center gap-5 md:gap-4 lg:gap-[29px] pb-12.5">
          {data?.pages.map((pageData, index) => (
            <Fragment key={index}>
              {pageData.users.map(({ id, name, photo, phone, position, email }) => (
                <li key={id} className="flex flex-col gap-5 w-full max-w-96 items-center overflow-hidden p-5 bg-white rounded-[10px]">
                  <img 
                    src={photo} 
                    alt={`${name} profile picture`}
                    className="rounded-full object-cover w-[70px] h-[70px]"
                    onError={(event) => {
                      event.target.src = fallbackImage;
                    }}
                  />
                  <Tooltip content={name}>
                    <p className="text-center w-full truncate">
                      {name}
                    </p>
                  </Tooltip>
                  <div className="flex flex-col w-full">
                    <Tooltip content={position}>
                      <p className="text-center w-full truncate">{position}</p>
                    </Tooltip>
                    <Tooltip content={email}>
                      <p className="truncate">
                        {email}
                      </p>
                    </Tooltip>
                    <Tooltip content={phone}>
                      <p className="truncate">
                        {phone}
                      </p>
                    </Tooltip>
                  </div>
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
        {isFetchingNextPage && (
          <div className="flex justify-center w-full mt-4">
            <Loader />
          </div>
        )}
      </div>
      <Button
        onClick={() => fetchNextPage()} 
        disabled={isPending || isFetchingNextPage || !hasNextPage}
      >
        Show more
      </Button>
    </section>
  );
}