import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
  
  //Injecting the form builder to this Class Constructor
  constructor(public formBuilder : FormBuilder)
  {}
   //below this aformgroup object 
  form = this.formBuilder.group({
    fullName : [''],
    email : [''],
    password : [''],
    confirmPassword :['']

  })

  onSubmit() {
    console.log(this.form.value);
  }

}
