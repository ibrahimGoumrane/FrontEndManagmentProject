import { Avatar, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTask } from "../../../../../utils/Contexte/TaskContext/taskContexte";
interface CommentCreationProps {
  idTask: number;
  idUser: number;
}

const CommentCreation = ({ idTask, idUser }: CommentCreationProps) => {
  const { comments, updateComments } = useTask();
  const [commentValue, setCommentValue] = useState<string>("");
  const saveCommentButton = useRef<HTMLDivElement | null>(null);

  const CommentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCommentValue(newValue);
  };
  useEffect(() => {
    if (commentValue) {
      if (saveCommentButton.current) {
        saveCommentButton.current.style.display = "block";
      }
    } else {
      if (saveCommentButton.current) {
        saveCommentButton.current.style.display = "none";
      }
    }
  }, [commentValue]);

  const updateCommentData = () => {
    if (commentValue) {
      if (comments) {
        updateComments([
          ...comments,
          {
            id: "-1",
            taskId: +idTask,
            userId: +idUser,
            content: commentValue,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      } else {
        updateComments([
          {
            id: "-1",
            taskId: +idTask,
            userId: +idUser,
            content: commentValue,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    }
    setCommentValue("");
  };

  return (
    <div className="h-max  w-full flex items-center  justify-center gap-8 mt-2">
      <div className="flex flex-col items-center justify-start">
        <Avatar
          alt="Remy Sharp"
          sx={{
            bgcolor: "white",
            width: "30px",
            height: "30px",
          }}
          component="div"
        />
        <span>
          <span className="text-white font-mono text-md font-bold">You</span>
        </span>
      </div>
      <div className="w-full rounded-md  relative ">
        <div className="flex flex-col gap-y-2">
          <textarea
            name=""
            id=""
            value={commentValue}
            onChange={CommentHandler}
            placeholder="Enter a comment about your Project"
            className="w-full rounded-md resize-none task"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) return;
            }}
          ></textarea>
          <div className="self-end w-fit" ref={saveCommentButton}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              className="w-full text-nowrap h-full hidden"
              onClick={updateCommentData}
            >
              Save Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentCreation;
