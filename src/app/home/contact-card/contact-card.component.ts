import { Contacts } from '../../models/contacts';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Input() contact: Contacts;

  constructor() { }

  ngOnInit(): void {
  }

}
