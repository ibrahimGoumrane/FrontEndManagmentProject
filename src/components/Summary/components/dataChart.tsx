import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { Task } from "../../../models/Tasks";

interface DataChartProps {
  tasks: Task[];
}

export default function DataChart({ tasks }: DataChartProps) {
  const [done, setdone] = useState<Task[]>([]);
  const [toDodo, settoDodo] = useState<Task[]>([]);
  const [inProgress, setinProgress] = useState<Task[]>([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    setinProgress(
      tasks.filter(
        (task) => task.statusId !== undefined && +task.statusId === 4
      )
    );
    settoDodo(
      tasks.filter(
        (task) => task.statusId !== undefined && +task.statusId === 3
      )
    );
    setdone(
      tasks.filter(
        (task) => task.statusId !== undefined && +task.statusId === 7
      )
    );
  }, [tasks]);

  return (
    <div className="w-full" style={{ height: "400px" }}>
      {" "}
      {/* Adjust height as needed */}
      <PieChart
        colors={["#cbd5e1", "#2563eb", "#4ade80"]} // Use palette
        series={[
          {
            data: [
              {
                id: 0,
                value: toDodo.length === 0 ? 1 : toDodo.length,
                label: "To Dodo",
              },
              {
                id: 1,
                value: inProgress.length === 0 ? 1 : inProgress.length,
                label: "In Progress",
              },
              {
                id: 2,
                value: done.length === 0 ? 1 : done.length,
                label: "Done",
              },
            ],
            innerRadius: 34,
            outerRadius: 143,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 360,
            cx: "50%", // Center the chart horizontally
            cy: "50%", // Center the chart vertically
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            // Display a label with the value
            arcLabel: (item) => `${item.label} (${item.value})`,
          },
        ]}
        // Remove fixed width and height, use CSS for responsive sizing
        sx={{ width: "100%", height: "100%" }}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "middle", horizontal: "right" },
            padding: 0,
          },
        }}
      />
    </div>
  );
}
