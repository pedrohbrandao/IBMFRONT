import { People } from './people';
import { ListpeopleService, persondata } from './../usuarios/listpeople.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
  
export class NewComponent implements OnInit {
  formpeople: any;
  
  submitted = false;
  createForm(form: People) {
    this.formpeople = new FormGroup({
      name: new FormControl(form.name, Validators.required),
      profile: new FormControl(form.profile, Validators.required),
      

    })
  }

  constructor(private getpeople: ListpeopleService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  title:string = "New People"
  peopleparam: any = undefined
  idvalue: any = undefined
  namevalue: any
  profilevalue: any
  send: string = "Send"
  seachform(id: number) {
    const data = `id=${id}`
    return this.http.post(`${this.getpeople.url}user`,data, this.getpeople.httpOptions)
  }

  ngOnInit(): void {
    this.createForm(new People());
    this.peopleparam = this.route.snapshot.paramMap.get('id')
    if (this.peopleparam) {
      this.seachform(this.peopleparam).subscribe((response:any) => {
        if (response[0]) {
          this.idvalue = this.peopleparam
          this.namevalue = response[0].name
          this.profilevalue= response[0].profile
          this.send = "Change"
          this.title = "Change People"
        } else {
          this.router.navigate(["/new"])
        }
      })
      
    }
    
  }
  erroalert(erro: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast:any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'error',
      title: erro
    })
  }
  responsestatus(icon: any, message: string, codigo: number) {
    Swal.fire({
      icon: icon,
      title: "State",
      text: `${codigo}, ${message}`
    }).then((result) => {
      if (codigo >= 400) {
        return
      }
    })
  }
  req:string = "new"
  onSubmit() {
    if (!this.formpeople.valid) {
      let form = this.formpeople.controls
      this.erroalert("erro")
    } else {
      let data = `name=${this.formpeople.value.name}&profile=${this.formpeople.value.profile}`
      if (this.idvalue) {
        this.req = "edit"
        data = `name=${this.formpeople.value.name}&profile=${this.formpeople.value.profile}&id=${this.idvalue}`
        this.http.post(`${this.getpeople.url}${this.req}`, data, this.getpeople.httpOptions).subscribe((response:any) => {
        this.responsestatus(response.icon, response.message, response.status)
          this.formpeople.reset(new People())
          this.router.navigate(["/usuarios"])
      })
      } else {
        this.http.post(`${this.getpeople.url}${this.req}`, data, this.getpeople.httpOptions).subscribe((response:any) => {
        this.responsestatus(response.icon, response.message, response.status)
          this.formpeople.reset(new People())
        })
      }
    }
    
  }
  

}
