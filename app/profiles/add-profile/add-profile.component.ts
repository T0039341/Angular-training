import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Country } from '@angular-material-extensions/select-country';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { countryValidator } from 'src/app/directives/country-validator.';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit, OnDestroy {
  //hardcoded for simplicity (typically this should come from some backend)
  options: string[] = ['Lebanon', 'United Kingdom', 'United States'];
  filteredOptions: Observable<string[]>;
  getProfileSub: Subscription;
  profileForm: FormGroup;
  selectedFile = null;
  getId = this.route.snapshot.paramMap.get('id');
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  passwordRegx = '^(?=.*[A-Z])(?=.*[!@#$&*^%*.])(?=.*[0-9])(?=.*[a-z]).{8,}$';
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private profileService: ProfileService, private cd: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      name: [
        null,
        [
          Validators.required],
      ],
      address: [null, [Validators.required]],
      country: [null, [Validators.required, countryValidator(this.options)]],
      dob: [null, [Validators.required]],
      isActive: [false],
      img: [],
      salary: [null, [Validators.required]]
    });

    this.getId;

    if (this.getId != null) {
      this.getProfileById(this.getId);
    }



    this.filteredOptions = this.profileForm.get('country').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy() {
    if (this.getProfileSub) {

      this.getProfileSub.unsubscribe();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value;

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log('selected file name', file.name);
    // const metaData = { 'contentType': file.type };
    // const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/featured/url1').child('')
    // storageRef.put(file, metaData);
  }

  submit(): void {

    if (this.getId != null) {
      this.profileService.updatePorfile(this.getId, this.profileForm.value);
      this.router.navigateByUrl('profiles');
    } else {
      this.profileService.createProfile(this.profileForm.value);
      this.router.navigateByUrl('profiles')
    }


  }

  getProfileById(id) {
    this.getProfileSub = this.profileService.getProfile(id).subscribe(res => {
      this.profileForm.get('username').patchValue(res.username);
      this.profileForm.get('name').patchValue(res.name);
      this.profileForm.get('address').patchValue(res.address);
      this.profileForm.get('country').patchValue(res.country);
      this.profileForm.get('dob').patchValue(res.dob);
      this.profileForm.get('isActive').patchValue(res.isActive);
      this.profileForm.get('salary').patchValue(res.salary);
    })
  }


  onCountrySelected($event: Country) {
    console.log($event);
  }
}
