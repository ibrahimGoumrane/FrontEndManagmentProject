import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Id, Task } from "../../../models/Tasks";
import { getTaskData } from "../../../network/TasksApi";
interface taskProps {
  tasksData: Task[];
}

interface GridRowProp {
  id: Id;
  name?: string;
  startDate?: string | null;
  endDate?: string | null;
  StoryPoint?: number | null;
  AssigneName?: number | null;
  projectName?: number;
  createdAt?: string;
  updatedAt?: string;
  description?: string | null;
  creatorName?: string;
  statusName?: string;
}

const StyledDataGrid = styled(DataGrid)(() => ({
  border: "5px solid black",
  background: "white",
  minHeight: "65vh",
  borderRadius: "5px",
  color: "white",
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    backgroundColor: "#f3e8ff", // purple-500/50
    color: "#a855f7",
    borderRight: `1px solid white`,
    fontWeight: "600",
    textTransform: "capitalize",
    fontSize: "md",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid white`,
  },
  "& .MuiDataGrid-columnsContainer .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: "black",
    borderRight: `1px solid white`,
    fontWeight: "600",
    textTransform: "capitalize",
    fontSize: "md",
  },
  "& .MuiPaginationItem-root:hover": {
    borderRadius: 0,
  },
  "&:hover": {
    background: "white",
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#f3e8ff",
    color: "black",
    borderRight: `1px solid white`,
    fontWeight: "600",
    textTransform: "capitalize",
    fontSize: "md",
  },
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem component="div" {...props2} />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}

const PAGE_SIZE = 5;
const getRowClassName = () => {
  // Apply the "task-row" class to each row
  return "task";
};
const columns: GridColDef[] = [
  { field: "name", headerName: "Task Name", width: 200 },
  { field: "startDate", headerName: "Start Date", width: 200 },
  { field: "endDate", headerName: "End Date", width: 200 },
  { field: "StoryPoint", headerName: "Story Point", width: 200 },
  { field: "AssigneName", headerName: "Assignee", width: 200 },
  { field: "projectName", headerName: "Project", width: 200 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "updatedAt", headerName: "Updated At", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "creatorName", headerName: "Creator", width: 200 },
  { field: "statusName", headerName: "Status", width: 200 },
];

function TaskContainer({ tasksData }: taskProps) {
  const [rows, setRows] = useState<GridRowProp[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  useEffect(() => {
    async function fetchTaskInfo() {
      if (tasksData) {
        const newRows = await Promise.all(
          tasksData.map((task) => getTaskData(task.id))
        );
        setRows(newRows);
      }
    }
    fetchTaskInfo();
  }, [tasksData]);

  return (
    <div style={{ width: "100%" }}>
      <StyledDataGrid
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        slots={{
          pagination: CustomPagination,
        }}
        rows={rows}
        columns={columns}
        className="task"
        getRowClassName={getRowClassName}
      />
    </div>
  );
}

export default TaskContainer;
