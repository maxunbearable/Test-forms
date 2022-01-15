import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Test forms';

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    date: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], this.checkEmail],
    tech: ['', Validators.required],
    angularVersion: [''],
    reactVersion: [''],
    vueVersion: [''],
    hobbies: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(private fb: FormBuilder) { }

  checkEmail(control:FormControl): Promise<any> | Observable<any>{
    const answer = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === "test@test.test"){
          resolve({'emailTaken': true})
        }else{
          resolve(null);
        }
      },2000);
    });
    return answer;
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }

  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''));
  }


}
