import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {IPerson} from "../../models/IPerson";
import {APIService} from "../../providers/api.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('removeModal', {read: ElementRef}) removeModal: ElementRef;

  public removeTarget: IPerson;

  public users: Array<IPerson>;
  public loading = true;

  removeLoading = false;
  error: string;

  constructor(
      private apiService: APIService,
      private ngZone: NgZone
  ) { }

  ngOnInit() {
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

  public removeUser = async (user: IPerson) => {
    try{
      await this.apiService.removeUser(user._id);
      await this.loadUsers();
      this.closeRemove();
    }catch (e) {
      this.error = e;
    }
  }

}
