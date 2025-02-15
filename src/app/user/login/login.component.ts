import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  constructor(public formBuilder : FormBuilder){}

   isSubmitted:boolean = false;

  form = this.formBuilder.group({

    email : ['',Validators.required],
    password : ['',Validators.required]
  })


  onSubmit(){
    this.isSubmitted = true;
    console.log(this.form.value)

  }






  hasDisplayableError(controlName: string): Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted) || Boolean(control?.touched) || Boolean(control?.dirty);
  }


}
