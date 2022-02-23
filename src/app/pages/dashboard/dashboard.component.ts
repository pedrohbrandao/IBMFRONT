import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(newpeople);
  }

}

@Component({
  selector: 'newpeople',
  templateUrl: 'newpeople.html',
})
export class newpeople  {
  
  constructor(
    public dialogRef: MatDialogRef<newpeople>
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
