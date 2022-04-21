import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { DestroyService } from '@core/services/destroy.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [DestroyService],
})
export class NavigationComponent implements OnInit {
  public isShowBackBtn!: boolean;
  searchControl: FormControl = new FormControl('');

  constructor(
    private router: Router,
    private location: Location,
    private destroy: DestroyService
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy))
      .subscribe((model) => {
        if (!!model) this.router.navigate(['/search', model]).then();
        else this.router.navigate(['/']).then();
      });

    this.router.events.pipe(takeUntil(this.destroy)).subscribe((event: any) => {
      if (!!event?.url) {
        const url: string = event.url;
        this.isShowBackBtn = false;
        if (url.includes('/gif')) this.isShowBackBtn = true;
      }
    });
  }

  selectLink() {
    this.searchControl.setValue('');
  }

  goBack() {
    this.location.back();
  }
}
