import { Component, OnInit } from "@angular/core";
import { GanttScreenService } from "./gantt-screen.service";
import { IProj, ITaskRaw, ITask } from "../interfaces/chartInterfaces";
import { MatDialog } from "@angular/material";
import { TaskFormComponent } from "../task-components/task-form/task-form.component";

@Component({
  selector: "app-gantt-screen",
  templateUrl: "./gantt-screen.component.html",
  styleUrls: ["./gantt-screen.component.scss"],
})
export class GanttScreenComponent implements OnInit {
  projData: IProj = { name: "" };
  ganttDataRaw: Array<ITaskRaw> = [];
  projId = "GiJfbLcXDAfSXpv9ndac";

  constructor(
    private ganttScreenService: GanttScreenService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ganttScreenService.getProj(this.projId).subscribe((res) => {
      this.projData = res.payload.data();
    });

    this.ganttScreenService
      .getTasks(this.projId)
      .subscribe((res) => {
        this.ganttDataRaw = res.map((item) => ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        }));
        console.log(this.ganttDataRaw);
      });
  }

  openForm() {
    this.dialog.open(TaskFormComponent, {
      width: "50%",
      minWidth: "300px",
      maxWidth: "550px",
      maxHeight: "100vh",
      data: {},
    });
  }
}
