import { State } from '../enums/state';
import { AddressesService } from './../services/addresses.service';
import { Addresses } from './../models/addresses';
import { Countries } from './../models/countries';
import { CountriesService } from './../services/countries.service';
import { Contacts } from './../models/contacts';
import { ContactsService } from './../services/contacts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription;
  contactSubscription: Subscription;
  addressesSubscription: Subscription;
  countriesSubscription: Subscription;

  contact: Contacts;
  countries: Countries[];
  contactForm: FormGroup;
  isValidFormSubmitted = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private countriesService: CountriesService,
    private addressesService: AddressesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((countries: Countries[]) => {
      this.countries = countries;
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);

        if (id != 0) {
          this.editContact(id);
        }
      }
    });

    if (this.route.snapshot.paramMap.get('id')) {
      const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);

      if (id != 0) {
        this.editContact(id);
      }
    }
    else {
    }
  }

  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  editContact(id: number) {
    this.contactsService.getContactById(id).subscribe((contact: Contacts) => {
      this.contact = contact;

      this.contactForm = this.formBuilder.group({
        addresses: this.formBuilder.array([])
      });

      if (contact.addresses.length == 0) {
        this.addAddress();
      } else {
        this.contactForm.setControl("addresses", this.setAddresses(contact.addresses));
      }
    });
  }

  setAddresses(addresses: Addresses[]) {
    const fa = new FormArray([]);
    addresses.forEach(a => {
      let control = this.formBuilder.group({
        street1: a.street1,
        street2: a.street2,
        town: a.town,
        country: a.country,
        state: State.Unchanged,
        id: a.id
      });

      control.valueChanges.subscribe(x => {
        if (x.state == State.Unchanged) {
          x.state = State.Modified;
        }
      });

      fa.push(control);
    });

    return fa;
  }

  buildAddress() {
    let control = this.formBuilder.group({
      street1: ['', Validators.required],
      street2: ['', Validators.required],
      town: ['', Validators.required],
      country: ['DE', Validators.required],
      state: State.Added
    });

    control.valueChanges.subscribe(x => {
      if (x.state == State.Unchanged) {
        x.state = State.Modified;
      }
    });

    return control;
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  saveAddress(model, isValid: boolean) {
    this.isValidFormSubmitted = false;

    if (model?.addresses && isValid) {
      this.isValidFormSubmitted = true;
      this.addressesService.saveAddresses(model, this.contact.id).subscribe(x => {
        this.toastr.success("Saved Successfully")
      });
    }
  }

  deleteAddress(id: any) {
    if (this.addresses.controls[id].value.state == State.Unchanged || this.addresses.controls[id].value.state == State.Modified) {
      this.addressesService.deleteAddress(this.addresses.controls[id].value.id).subscribe(x => {
        this.toastr.success("Address Deleted Successfully");
        this.addresses.removeAt(id);
      });
    } else {
      this.addresses.removeAt(id);
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }

    if (this.countriesSubscription) {
      this.countriesSubscription.unsubscribe();
    }

    if (this.addressesSubscription) {
      this.addressesSubscription.unsubscribe();
    }
  }
}
