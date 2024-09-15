import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
  
  //Injecting the form builder to this Class Constructor
  constructor(public formBuilder : FormBuilder)
  {}

  isSubmitted:boolean = false;
   //below this aformgroup object 
   passwordMatchValidator: ValidatorFn = (control:AbstractControl):null =>{

    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    if(password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({passwordMismatch:true})
    else
    confirmPassword?.setErrors(null)
      return null;

   }






  form = this.formBuilder.group({
    fullName : ['',Validators.required],
    email : ['',[ Validators.required, Validators.email]],
    password : ['',[Validators.required,
                    Validators.minLength,
                    Validators.pattern(/(?=.*[^a-zA-Z0-9])/)]],
    confirmPassword :['', Validators.required]
  },{validators:this.passwordMatchValidator})

  onSubmit() {
    this.isSubmitted= true;
    console.log(this.form.value);
  }


  hasDisplayableError(controlName: string): Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted) || Boolean(control?.touched);
  }




}
