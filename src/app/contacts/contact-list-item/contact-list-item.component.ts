import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ContactsService } from './../../services/contacts.service';
import { Contacts } from './../../models/contacts';
import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss']
})
export class ContactListItemComponent implements OnDestroy {
  @Input() contact: Contacts;
  @Output() deleteCont = new EventEmitter<number>();

  contactSubscription: Subscription;

  constructor(
    private contactsService: ContactsService,
    private toastr: ToastrService
  ) { }

  deleteContact(id: number) {
    this.contactsService.deleteContact(id).subscribe(x => {
      this.toastr.success("Contact deleted successfully");
      this.deleteCont.next(id);
    });
  }

  ngOnDestroy() {
    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
  }
}
