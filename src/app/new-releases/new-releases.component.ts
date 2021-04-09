import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: Array<any>;
  private postsSub;
  constructor(private data: MusicDataService) {}

  ngOnInit() {
    this.postsSub = this.data.getNewReleases().subscribe((data) => {
      this.releases = data.albums.items;
    });
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
