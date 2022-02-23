import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ListpeopleService } from './../usuarios/listpeople.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  constructor(private getpeople: ListpeopleService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  peopleparam: any = undefined
  idvalue: any = undefined
  namevalue: any
  profilevalue: any
  destroy(n: any) {
    let data = `id=${n}`
   this.http.post(`${this.getpeople.url}ex`, data, this.getpeople.httpOptions).subscribe()
    
 }

  seachform(id: number) {
    const data = `id=${id}`
    return this.http.post(`${this.getpeople.url}user`,data, this.getpeople.httpOptions)
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
}).then((result:any) => {
  if (result.isConfirmed) {
    this.destroy(n)
    this.router.navigate(["/usuarios"])
  }
})
  }

  ngOnInit(): void {
    this.peopleparam = this.route.snapshot.paramMap.get('id')
    if (this.peopleparam) {
      this.seachform(this.peopleparam).subscribe((response:any) => {
        if (response[0]) {
          this.idvalue = this.peopleparam
          this.namevalue = response[0].name
          this.profilevalue= response[0].profile
        } else {
          this.router.navigate(["/usuarios"])
        }
      })
      
    }
  }

}
