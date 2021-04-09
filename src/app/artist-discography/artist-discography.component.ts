import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: Array<any>;
  artist: any;
  private postSub;
  constructor(private data: MusicDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.postSub = this.data.getArtistById(id).subscribe((data) => {
      this.artist = data;
    });
    this.postSub = this.data
      .getAlbumsByArtistId(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.albums = data.items.filter(
          (value, index) =>
            !data.items
              .map((value) => value.name)
              .includes(value.name, index + 1)
        );
      });
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
