import { Fade } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridSlots,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getProject } from "../../../models/Projects";
import { useUser } from "../../../utils/Contexte/UserContext/userContexte";
import { getProjectData } from "../../../network/ProjectApi";
import { formatDateTime } from "../../../utils/utility";

interface GridRowProp extends getProject {}

const StyledDataGrid = styled(DataGrid)(() => ({
  border: "5px solid #7c3aed",
  background: "white",
  minHeight: "70vh",
  maxHeight: "70vh",
  borderRadius: "20px",
  color: "white",
  maxWidth: "86.5vw",
  marginInline: "0",
  marginBottom: "4vh",
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    backgroundColor: "#e5e7eb", // purple-500/50
    color: "black",
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
  "& .MuiDataGrid-overlay": {
    backgroundColor: "#e5e7eb",
    color: "black",
    borderRight: `1px solid white`,
    fontWeight: "600",
    textTransform: "capitalize",
    fontSize: "md",
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#e5e7eb",
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
  { field: "id", headerName: "Id", width: 150, resizable: true },
  { field: "name", headerName: "Name", width: 150, resizable: true },
  { field: "startDate", headerName: "Start Date", width: 150, resizable: true },
  { field: "ManagerName", headerName: "Manager ", width: 150, resizable: true },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    renderCell: (params) => (
      <Tooltip
        title={params.value as string}
        placement="bottom-end"
        TransitionComponent={Fade}
      >
        <div className="cell-content">{params.value}</div>
      </Tooltip>
    ),
    resizable: true,
  },
  { field: "statusName", headerName: "Status", width: 150, resizable: true },
  { field: "endDate", headerName: "End Date", width: 150, resizable: true },
  { field: "createdAt", headerName: "Created At", width: 150, resizable: true },
  { field: "updatedAt", headerName: "Updated At", width: 150, resizable: true },
];

interface CustomToolbarProps {
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
}

function CustomToolbar({ setFilterButtonEl }: CustomToolbarProps) {
  return (
    <GridToolbarContainer className="flex items-center justify-between">
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

function ProjectListing() {
  const { projects } = useUser();
  const [rows, setRows] = useState<GridRowProp[]>([]);
  const [filterButtonEl, setFilterButtonEl] =
    useState<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  useEffect(() => {
    async function fetchTaskInfo() {
      if (projects) {
        const newRows = await Promise.all(
          projects.map((project) => getProjectData(project.id ? project.id : 1))
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
          row.description = row.description?.split("<br>").join("\n");
          return row;
        });

        setRows(rows);
      }
      setLoading(false);
    }
    fetchTaskInfo();
  }, [projects]);

  return (
    <div className=" bg-slate-900 text-white pt-10 px-10">
      <div className="flex items-start justify-start flex-col  italic font-mono mb-3">
        <h2 className="text-2xl  font-bold   ">Manage Your Projects</h2>
        <p className="text-gray-200 mt-2  w-2/3 ">
          On this page, you can view all your existing projects. Use the search
          and filter options to quickly find specific projects, and click on any
          project to view information, or track progress.
        </p>
      </div>
      <div className=" flex items-end justify-end self-end ">
        <StyledDataGrid
          getRowId={(rows) => rows.id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[PAGE_SIZE]}
          slots={{
            pagination: CustomPagination,
            toolbar: CustomToolbar as GridSlots["toolbar"],
          }}
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
            panel: {
              anchorEl: filterButtonEl,
            },
            toolbar: {
              setFilterButtonEl,
            },
          }}
          initialState={{
            filter: {
              filterModel: {
                items: [{ field: "Name", operator: "starts with", value: "a" }],
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProjectListing;
