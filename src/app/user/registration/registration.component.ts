import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FirstKeyPipe],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
  
  //Injecting the form builder to this Class Constructor
  //Inside the constructor we can receive the toaster service
  // and the http service 
  constructor(public formBuilder : FormBuilder, private service : AuthService,
    private toastr : ToastrService) {}  

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
                    Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
    confirmPassword :['', Validators.required]
  },{validators:this.passwordMatchValidator})

  onSubmit() {
    this.isSubmitted= true;
     if(this.form.valid){
        this.service.createUser(this.form.value)
        .subscribe({
          next:(res:any) => {
            if(res.succeeded){
              this.form.reset();
              this.isSubmitted = false;
              this.toastr.success('New user created!', 'Registration Successful')
            }
            else
             console.log('response:', res);
          },
          
          error:err=>console.log('error', err)
        }
        )


     }




    console.log(this.form.value);
  }


  hasDisplayableError(controlName: string): Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted) || Boolean(control?.touched);
  }




}
