import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {IPerson} from "../../models/IPerson";
import {APIService} from "../../providers/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, IRegisterPayload} from "../../providers/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('removeModal', {read: ElementRef}) removeModal: ElementRef;
  @ViewChild('addModal', {read: ElementRef}) addModal: ElementRef;

  public removeTarget: IPerson;

  public users: Array<IPerson>;
  public loading = true;

  removeLoading = false;
  removeError: string;

  addForm: FormGroup;
  addLoading = false;
  addSubmitted = false;
  addError: string;

  constructor(
      private apiService: APIService,
      private formBuilderService: FormBuilder,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilderService.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      canSignup: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])]
    });

    this.loadUsers();
  }

  private loadUsers = async () => {
    this.loading = true;
    this.users = await this.apiService.getAllUsers();
    this.loading = false;
  };

  public openRemove = (user: IPerson) => {
    this.removeTarget = user;
    setTimeout(() => {
      this.removeModal.nativeElement.className = 'modal fade show';
      this.removeModal.nativeElement.style = 'display: block;'
    }) // This is not jank. We need to wait for the event queue to handle the ngIf before we interact with this native element.
  };

  public closeRemove = () => {
    this.removeModal.nativeElement. className = 'modal hide';
    this.removeModal.nativeElement.style = 'display: none;'
  };
  
  public openAdd = () => {
    setTimeout(() => {
      this.addModal.nativeElement.className = 'modal fade show';
      this.addModal.nativeElement.style = 'display: block;'
    }) // This is not jank. We need to wait for the event queue to handle the ngIf before we interact with this native element.
  };

  public closeAdd = () => {
    this.addModal.nativeElement. className = 'modal hide';
    this.addModal.nativeElement.style = 'display: none;'
  };

  public removeUser = async (user: IPerson) => {
    try{
      await this.apiService.removeUser(user._id);
      await this.loadUsers();
      this.closeRemove();
    }catch (e) {
      this.removeError = e;
    }
  };

  public addUser = async () => {
    this.addSubmitted = true;
    if (this.addForm.invalid) {
      return;
    }

    this.addLoading = true;
    const newUser: IRegisterPayload = {
      lastName: this.addForm.controls.lastName.value,
      firstName: this.addForm.controls.firstName.value,
      password: this.addForm.controls.password.value,
      email: this.addForm.controls.email.value,
      role: this.addForm.controls.role.value,
      canSignup: this.addForm.controls.canSignup.value
    };

    try{
      await this.authService.register(newUser);
      await this.loadUsers();
      this.closeAdd();
    }catch (e) {
      this.addError = e;
    }

    this.addLoading = false;
  }

}
