import { ToastrService } from 'ngx-toastr';
import { ContactsService } from './../../services/contacts.service';
import { Contacts } from './../../models/contacts';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss']
})
export class ContactListItemComponent {
  @Input() contact: Contacts;
  @Output() deleteCont = new EventEmitter<number>();

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
}
