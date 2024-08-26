import { Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getTask } from "../../../models/Tasks";
import { getTaskData } from "../../../network/TasksApi";
import "./taskContainer.css";
import { useProject } from "../../../utils/Contexte/ProjectContext/projectContexte";
interface taskProps {
  isVisible: boolean;
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

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 150 },
  { field: "name", headerName: "Task Name", width: 150 },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 150,
    type: "dateTime",
  },
  { field: "creatorName", headerName: "Creator", width: 150 },
  {
    field: "description",
    headerName: "Description",
    width: 300,
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
  {
    field: "StoryPoint",
    headerName: "Story Point",
    width: 150,
  },
  { field: "statusName", headerName: "Status", width: 150 },
  { field: "AssigneName", headerName: "Assignee", width: 150 },
  { field: "endDate", headerName: "End Date", width: 150, type: "dateTime" },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    type: "dateTime",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 150,
    type: "dateTime",
  },
];
const PAGE_SIZE = 10;

function TaskContainer({ isVisible }: taskProps) {
  const { tasks, project } = useProject(); // Assuming you can access projectId

  const [rows, setRows] = useState<GridRowProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  useEffect(() => {
    async function fetchTaskInfo() {
      if (tasks && tasks.length > 0) {
        const newRows = await Promise.all(
          tasks.map((task) => getTaskData(task.id))
        );
        const rows = newRows?.map((row) => {
          row.startDate = row.startDate ? new Date(row.startDate) : null;
          row.endDate = row.endDate ? new Date(row.endDate) : null;
          row.createdAt = row.createdAt ? new Date(row.createdAt) : undefined;
          row.updatedAt = row.updatedAt ? new Date(row.updatedAt) : undefined;
          row.StoryPoint = row.StoryPoint ? row.StoryPoint : -1;
          row.AssigneName = row.AssigneName
            ? row.AssigneName
            : "No assigne yet";
          row.description = row.description?.split("<br>").join("\n");
          return row;
        });
        console.log("rows", rows);
        setRows(rows);
      }
      setLoading(false);
    }
    fetchTaskInfo();
  }, [tasks, project?.id]);

  if (!isVisible) return null; // Don't render the DataGrid if the tab is not visible

  return (
    <div className="task-container max-w-[94vw]">
      <StyledDataGrid
        getRowId={(rows) => rows.id}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25]}
        rows={rows}
        columns={columns}
        className="task"
        autoHeight
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        initialState={{}}
      />
    </div>
  );
}

export default TaskContainer;
