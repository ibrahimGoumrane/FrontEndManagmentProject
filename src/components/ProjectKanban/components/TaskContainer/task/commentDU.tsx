import { MdDelete, MdOutlinePublishedWithChanges } from "react-icons/md";
import Spinner from "../../../../LoginSignUp/utils/spinner";
import { CommentData } from "../../../../../models/Comment";
import { useCallback } from "react";
interface commentDeleteInterface {
  comment: CommentData;
  userId: number;
}

function CommentDU({ comment, userId }: commentDeleteInterface) {
  const formatDateTime = useCallback((dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString(); // You can pass options to format the date
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Format time as HH:MM
    console.log(formattedTime);
    return `${formattedDate} at ${formattedTime}`;
  }, []);
  return (
    <div className="w-full h-full ">
      <div className="flex items-center justify-start  w-full bg-white h-16 rounded-2xl">
        <span className="text-purple-400 font-mono text-md font-bold h-full   flex justify-center bg-purple-200 basis-1/12 rounded-l-2xl  items-center ">
          {comment && userId ? (
            comment?.userId === userId ? (
              "You"
            ) : (
              "Someone"
            )
          ) : (
            <Spinner />
          )}
        </span>
        <span className="flex items-start justify-start flex-col basis-5/6 h-full text-left">
          <span className="text-slate-400  text-xs font-light self-end w-1/2">
            last update : {formatDateTime(comment.updatedAt)}
          </span>
          <span className="text-black font-mono text-md font-bold overflow-y-auto overflow-x-hidden px-2 task">
            {comment.content}
          </span>
        </span>
        <div className="h-full basis-1/6 rounded-r-2xl flex items-center justify-end pr-4 gap-x-7 bg-purple-200">
          <span className="text-2xl p-2 text-white bg-purple-300 rounded-full hover:bg-purple-200 transition-all duration-300 ">
            <MdOutlinePublishedWithChanges />
          </span>
          <span className="text-2xl p-2 text-white bg-purple-300 rounded-full hover:bg-purple-200 transition-all duration-300 ">
            <MdDelete />
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommentDU;
