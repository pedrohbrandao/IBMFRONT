import { MatDialog } from '@angular/material/dialog';
import { ListpeopleService, persondata } from './listpeople.service';
import { Component, OnInit } from '@angular/core';
import { datePerson } from './datePerson';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ["id","name", 'profile', "button", "see more"];
  
  excluir(n:number,n2:number) {
    datePerson.splice(n, n2)
    location.reload()
    datePerson.splice(n, n2)
  }
  dataSource:any

  constructor(private getpeople: ListpeopleService, private http: HttpClient, public dialog: MatDialog) { }
  
 destroy(n: any) {
    let data = `id=${n}`
   this.http.post(`${this.getpeople.url}ex`, data, this.getpeople.httpOptions).subscribe()
    
 }
  starttable() {
    this.dataSource = this.http.get(this.getpeople.url, this.getpeople.httpOptions)
  }
  
  confirmation(n: any) {
  Swal.fire({
  title: 'Do you really want to delete?',
  text: "Destructive Action",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes',
  cancelButtonText:"Cancel"
}).then((result) => {
  if (result.isConfirmed) {
    this.destroy(n)
    this.starttable()
    this.starttable()
  }
})
  }
  
  ngOnInit(): void {
    this.starttable()
    
  }

}