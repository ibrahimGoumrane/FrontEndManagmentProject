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
import { Task, getTask } from "../../../models/Tasks";
import { getTaskData } from "../../../network/TasksApi";
import Tooltip from "@mui/material/Tooltip";
import "./taskContainer.css";
import { formatDateTime } from "../../../utils/utility";
import { Fade } from "@mui/material";
interface taskProps {
  tasksData: Task[];
}

interface GridRowProp extends getTask {}

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
    fontSize: "12px",
    maxWidth: "200px",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid black`,
    fontStyle: "italic",
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

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 100 },
  { field: "name", headerName: "Task Name", width: 200 },
  { field: "startDate", headerName: "Start Date", width: 200 },
  { field: "creatorName", headerName: "Creator", width: 200 },
  {
    field: "description",
    headerName: "Description",
    width: 500,
    cellClassName: "test-class",
    renderCell: (params) => (
      <Tooltip
        title={params.value as string}
        placement="bottom-end"
        TransitionComponent={Fade}
      >
        <div className="cell-content">{params.value}</div>
      </Tooltip>
    ),
  },
  { field: "StoryPoint", headerName: "Story Point", width: 100 },
  { field: "statusName", headerName: "Status", width: 200 },
  { field: "AssigneName", headerName: "Assignee", width: 200 },
  { field: "endDate", headerName: "End Date", width: 200 },
  { field: "projectName", headerName: "Project", width: 200 },
  { field: "createdAt", headerName: "Created At", width: 200 },
  { field: "updatedAt", headerName: "Updated At", width: 200 },
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
        const rows = newRows?.map((row) => {
          row.startDate = row.startDate
            ? formatDateTime(row.startDate)
            : "No start Date Found";
          row.endDate = row.endDate
            ? formatDateTime(row.endDate)
            : "No end Date Found";
          row.createdAt = row.createdAt
            ? formatDateTime(row.createdAt)
            : "No created Date Found";
          row.updatedAt = row.updatedAt
            ? formatDateTime(row.updatedAt)
            : "No updated Date Found";
          row.StoryPoint = row.StoryPoint ? row.StoryPoint : -1;
          row.AssigneName = row.AssigneName
            ? row.AssigneName
            : "No assigne yet";
          row.description = row.description?.split("<br>").join("\n");
          return row;
        });

        setRows(rows);
      }
    }
    fetchTaskInfo();
  }, [tasksData]);

  return (
    <div style={{ minWidth: "350px", width: "100%", height: 600 }}>
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
        autoHeight
      />
    </div>
  );
}

export default TaskContainer;
