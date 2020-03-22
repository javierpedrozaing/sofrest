import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormRole } from 'src/app/role/role-list/role-list.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() userID: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.form = fb.group({
      name: [null, [ Validators.required]],
      surname: [null, [ Validators.required]],
      direction: [null, [ Validators.required]],
      email: [null, [ Validators.required]],
      phone: [null, [ Validators.required]],
      role: [null, [ Validators.required]],
      password: [null, [ Validators.required]],
      confirm_password: [null, [ Validators.required]],
      status: [false, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  save(data: any) {

  }

  edit(data: any) {

  }

  openDialogRol(): void {
    const dialogRef = this.dialog.open(DialogFormRole, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
