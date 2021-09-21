import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy {
  profiles: Profile[];
  id: string;
  editState: boolean;
  profileToEdit: Profile;
  profileSub: Subscription

  constructor(private database: AngularFirestore, private profilesService: ProfileService) { }

  ngOnInit(): void {
    this.profileSub = this.profilesService.getProfiles().subscribe(res => {
      // console.log(res);
      this.profiles = res;
      // this.id = res.id;
    })
  }
  ngOnDestroy() {
    this.profileSub.unsubscribe()
  }

  deleteProfile(event, profile) {
    this.profilesService.deleteProfile(profile);
  }


}
