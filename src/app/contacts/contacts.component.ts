import { ContactsDto } from './../models/dto/contactsDto';
import { Contacts } from './../models/contacts';
import { ContactsService } from './../services/contacts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contacts[];
  contactsCount: number;
  editContactDetails: Contacts;

  contactsServiceSubscription: Subscription;

  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactsServiceSubscription = this.contactsService.getContacts().subscribe((contacts: Contacts[]) => {
      this.contacts = contacts;
      this.contactsCount = contacts.length;
    });
  }

  addContact(firstName: string, lastName: string) {
    if (firstName != "" && lastName != "") {
      const newContact: ContactsDto = {
        first_name: firstName,
        last_name: lastName
      }

      this.contactsService.addContact(newContact).subscribe(res => {
        this.contacts.push(res);
        this.contactsCount++;
      })
    }
  }

  deleteContact(id) {
    this.contacts = this.contacts.filter(x => x.id !== id);
  }

  ngOnDestroy() {
    if (this.contactsServiceSubscription) {
      this.contactsServiceSubscription.unsubscribe();
    }
  }
}
