import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RegisterAsPatientModel } from '../../_models/RegisterAsPatient.model';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register-as-patient',
  templateUrl: './register-as-patient.component.html',
  styleUrls: ['./register-as-patient.component.css'],
})
export class RegisterAsPatientComponent implements OnInit, OnDestroy {
  regform: FormGroup;
  regmodel: RegisterAsPatientModel = new RegisterAsPatientModel();
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;
  date: Date;
  isCollapsed = true;
  errormsg: string;
  rejex: RegExp;
  check;
  config = { inputDirection: 'rtl' };
  option: string[] = ['name', 'two', 'x'];
  MedConditions = [
    { value: 1, viewValue: 'Type1' },
    { value: 2, viewValue: 'Type2' },
    { value: 0, viewValue: 'Other' },
  ];
  isemailexist: boolean = false;
  constructor(private formbuilder: FormBuilder, private serv: AccountService) {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  registerAsPatient() {
    this.assigntoobj();

    this.serv.RegisterAsPatient(this.regmodel).subscribe(
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

  Birthdate() {
    var y = (<HTMLInputElement>document.getElementsByName('year')[0]).value;
    var m = (<HTMLInputElement>document.getElementsByName('month')[0]).value;
    var d = (<HTMLInputElement>document.getElementsByName('day')[0]).value;
    var DOB = y + '-' + m + '-' + d + 'T' + '00:00:00';
    return DOB;
  }
  assigntoobj() {
    this.regmodel.UserName = this.regform.value.UserName;
    this.regmodel.Email = this.regform.value.Email;
    this.regmodel.Password = this.regform.value.Password;
    //  this.regmodel.PhoneNumber = this.regform.value.PhoneNumber;

    this.regmodel.BirthDate = this.date;
    this.regmodel.Height = this.regform.value.Height;
    this.regmodel.Weight = this.regform.value.Weight;
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
        console.log(this.errormsg);
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
      //  PhoneNumber: ['', Validators.required],
      Weight: [, Validators.required],
      Height: [, Validators.required],
      BirthDate: [,],
      // Gender: ['', Validators.required],
      //LifeStyle: [, Validators.required],
      // MedicalCondetion: [1, Validators.required],
    });
    this.regmodel.MedicalCondetion = 1;
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
  }
  changeType(e) {
    this.regmodel.LifeStyle = e.target.value;
  }
  changeMedCond(e) {
    this.regmodel.MedicalCondetion = e.target.value;
  }
  changeGender(e) {
    this.regmodel.Gender = e.target.value;
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

  selectionChanged(e) {
    console.log(e);
  }
}
