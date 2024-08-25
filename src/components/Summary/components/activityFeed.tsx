import { useState, useEffect } from "react";
import { useProject } from "../../../utils/Contexte/ProjectContext/projectContexte";
import { TActivity } from "../../../models/activity";
import { formatDateTime } from "../../../utils/utility";

export default function ActivityFeed() {
  const { activity } = useProject();
  const [createActivity, setcreateActivity] = useState<TActivity[]>([]);
  const [updateActivity, setupdateActivity] = useState<TActivity[]>([]);
  const [deleteActivity, setdeleteActivity] = useState<TActivity[]>([]);
  useEffect(() => {
    activity?.CREATE && setcreateActivity(activity.CREATE as TActivity[]);
    activity?.UPDATE && setupdateActivity(activity.UPDATE as TActivity[]);
    activity?.DELETE && setdeleteActivity(activity.DELETE as TActivity[]);
  }, [activity]);
  return activity ? (
    <div className=" h-full w-full">
      <div className="h-full w-full p-2 max-h-[15vh] overflow-y-auto overflow-x-hidden">
        <div className="flex w-full flex-col items-start justify-start  rounded-md p-2">
          <h2 className="text-xs font-extrabold text-purple-400">Created</h2>
          {createActivity.length > 0 ? (
            createActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 justify-center w-full border-b-2 border-slate-900  py-3"
              >
                <span className="text-xs text-blue-400 italic font-extrabold">
                  user {activity.userId}
                </span>
                <span className="text-xs text-slate-900 italic"> created</span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  {activity.newValue}
                </span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  In
                </span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  {formatDateTime(activity.createdAt || "")}
                </span>
              </div>
            ))
          ) : (
            <div className="font-bold text-md text-slate-900 italic text-center w-full mt-2">
              No created activity
            </div>
          )}
        </div>
      </div>
      <div className="h-full w-full p-2 max-h-[15vh] overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col items-start justify-start border-2rounded-md p-2">
          <h2 className="text-xs font-extrabold text-purple-400">Deleted</h2>
          {deleteActivity.length > 0 ? (
            deleteActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 justify-center w-full border-b-2 border-slate-900 py-3"
              >
                <span className="text-xs text-blue-400 italic font-extrabold">
                  user {activity.userId}
                </span>
                <span className="text-xs text-slate-900 italic"> deleted</span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  {activity.newValue}
                </span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  In
                </span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  {formatDateTime(activity.createdAt || "")}
                </span>
              </div>
            ))
          ) : (
            <div className="font-bold text-md text-slate-900 italic text-center w-full mt-2">
              No delete activity
            </div>
          )}
        </div>
      </div>
      <div className="h-full w-full p-2 max-h-[15vh] overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col items-start justify-start overflow-y-auto max-h-[13vh]  p-2">
          <h2 className="text-xs font-extrabold text-purple-400">Deleted</h2>
          {updateActivity.length > 0 ? (
            updateActivity.map((activity, index) => (
              <div
                key={index}
                className=" py-3 flex items-center gap-2 justify-center w-full border-b-2 border-slate-900"
              >
                <span className="text-xs text-blue-400 italic font-extrabold">
                  user {activity.userId}
                </span>
                <span className="text-xs text-slate-900 italic">updated</span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  {activity.fieldName}
                </span>
                <span className="text-xs text-slate-900 italic">from</span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  {activity.oldValue}
                </span>
                <span className="text-xs text-slate-900 italic">to</span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  {activity.newValue}
                </span>
                <span className="text-xs text-blue-400 italic font-extrabold">
                  <span className="text-xs text-blue-400 italic font-extrabold">
                    In
                  </span>{" "}
                  {formatDateTime(activity.createdAt || "")}
                </span>
              </div>
            ))
          ) : (
            <div className="font-bold text-md text-slate-900 italic text-center w-full mt-2">
              No updated activity
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="font-bold text-2xl text-slate-900 italic">
      No activity yet
    </div>
  );
}
