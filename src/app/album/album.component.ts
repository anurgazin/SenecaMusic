import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  private postSub;
  constructor(
    private data: MusicDataService,
    private route: ActivatedRoute,
    private bar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.postSub = this.data
      .getAlbumById(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.album = data;
      });
  }
  addToFavourites(trackID) {
    this.data.addToFavourites(trackID).subscribe((check)=>{
      console.log(check);
      if (check) {
        this.bar.open('Adding to Favourites...', 'Done', { duration: 1500 });
      }else{
        this.bar.open('Unable to add song to Favourites', 'Done', { duration: 1500 });
      }
    })
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
