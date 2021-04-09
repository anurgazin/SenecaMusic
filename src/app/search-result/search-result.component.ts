import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: any;
  private postSub;
  constructor(private data: MusicDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postSub = this.route.queryParams.subscribe(() => {
      this.searchQuery = this.route.snapshot.queryParams['q'];
      this.data.searchArtists(this.searchQuery).subscribe((data) => {
        this.results = data.artists.items.filter(
          (item: any) => item.images.length > 0
        );
      });
    });
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
