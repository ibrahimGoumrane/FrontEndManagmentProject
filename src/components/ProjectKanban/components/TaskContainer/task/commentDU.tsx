import { useState, useEffect } from "react";
import { MdDelete, MdOutlinePublishedWithChanges } from "react-icons/md";
import Spinner from "../../../../LoginSignUp/utils/spinner";
import { CommentData } from "../../../../../models/Comment";
import { formatDateTime } from "../../../../../utils/utility.ts";
interface commentDeleteInterface {
  comment: CommentData;
  userId: number;
  onUpdatedSuccessfully: (comment: CommentData) => void;
  onDeletedSuccessfuly: (commentId: string) => void;
}

function CommentDU({
  comment,
  userId,
  onUpdatedSuccessfully,
  onDeletedSuccessfuly,
}: commentDeleteInterface) {
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    setCommentContent(comment.content);
  }, [comment.content]);

  const SaveChanges = () => {
    setIsUpdating(false);
    // API call to update comment
    const newComment = {
      ...comment,
      content: commentContent,
    };
    onUpdatedSuccessfully(newComment);
  };
  const UpdateComment = () => {
    setIsUpdating(!isUpdating);
  };
  const deleteComment = () => {
    onDeletedSuccessfuly(comment.id);
  };

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
        <div
          className="flex items-start justify-start flex-col basis-5/6 h-full text-left"
          onBlur={SaveChanges}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              SaveChanges();
            }
          }}
        >
          <span className="text-slate-400  text-xs font-light self-end w-1/2">
            last update : {formatDateTime(comment.updatedAt)}
          </span>
          {!isUpdating ? (
            <span className="text-purple-500 font-mono text-md font-bold overflow-y-auto overflow-x-hidden px-2 task">
              {commentContent}
            </span>
          ) : (
            <textarea
              name=""
              id=""
              className="task w-full bg-transparent text-black border-none resize-none rounded font-mono text-md font-bold"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Update the Comment"
            ></textarea>
          )}
        </div>
        <div className="h-full basis-1/6 rounded-r-2xl flex items-center justify-center  gap-x-7 bg-purple-200">
          {isUpdating || (
            <span
              className="text-2xl p-2 text-white bg-purple-300 rounded-full hover:bg-purple-200 transition-all duration-300 "
              onClick={UpdateComment}
            >
              <MdOutlinePublishedWithChanges />
            </span>
          )}
          <span
            className="text-2xl p-2 text-white bg-purple-300 rounded-full hover:bg-purple-200 transition-all duration-300 "
            onClick={deleteComment}
          >
            <MdDelete />
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommentDU;
