import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RegisterAsDoctorModel } from '../../_models/RegisterAsDoctor.model';
import { AccountService } from '../../_services/account.service';
@Component({
  selector: 'app-register',
  templateUrl: './register-as-doctor.component.html',
  styleUrls: ['./register-as-doctor.component.css'],
})
export class RegisterAsDoctorComponent implements OnInit, OnDestroy {
  regform: FormGroup;
  regmodel: RegisterAsDoctorModel = new RegisterAsDoctorModel();
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  isemailexist: boolean = false;
  rejex: RegExp;
  errormsg: string;

  constructor(private formbuilder: FormBuilder, private serv: AccountService) {}

  registerAsDoctor() {
    this.assigntoobj();
    this.serv.RegisterAsDoctor(this.regmodel).subscribe(
      (succes) => {},
      (err) => {
        console.log(err.status);
        if (err.status == 200) {
          alert('Registration succes');
          window.location.assign('./login');
        }
      }
    );
  }

  assigntoobj() {
    this.regmodel.Email = this.regform.value.Email;
    this.regmodel.UserName = this.regform.value.UserName;
    this.regmodel.Password = this.regform.value.Password;
    this.regmodel.Address = this.regform.value.Address;
    this.regmodel.PhoneNumber = this.regform.value.PhoneNumber;
  }
  IsPassMatch() {
    if (
      this.regform.value.ConfirmPassword !== '' &&
      this.regform.value.Password !== ''
    ) {
      if (this.regform.value.Password !== this.regform.value.ConfirmPassword) {
        return true;
      }
    }

    return false;
  }

  isEmailexist() {
    var email = this.regform.value.Email;
    if (email != null && email != '' && this.regform.get('Email').touched) {
      this.serv.EmailExist(email).subscribe((a) => {
        this.isemailexist = a;
        console.log(a);
      });
    }
  }

  ispasswordvalid() {
    var pass = this.regform.value.Password;
    if (pass != '' && pass.length > 5) {
      this.rejex = new RegExp('[a-z]');
      if (!this.rejex.test(pass)) {
        this.errormsg = 'كلمة المرور يجب ان تحتوي علي حرف صغير واحد علي الاقل';
        return false;
      }

      this.rejex = new RegExp('[A-Z]');
      if (!this.rejex.test(pass)) {
        this.errormsg = 'كلمة المرور يجب ان تحتوي علي حرف كبير واحد علي الاقل';
        return false;
      }
      this.rejex = new RegExp('[~!@#&%$^*()_+<>{}]');
      if (!this.rejex.test(pass)) {
        this.errormsg = 'كلمة المرور يجب ان تحتوي علي حرف مميز واحد علي الاقل';
        return false;
      }
      this.rejex = new RegExp('[0-9]');
      if (!this.rejex.test(pass)) {
        this.errormsg = 'كلمة المرور يجب ان تحتوي علي رقم واحد علي الاقل';
        return false;
      }
    }
    return true;
  }

  ngOnInit(): void {
    this.regform = this.formbuilder.group({
      UserName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
    });
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

  // OnSubmit(form : NgForm){

  // }
}
