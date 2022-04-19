import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { DestroyService } from '@core/services/destroy.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [DestroyService],
})
export class NavigationComponent implements OnInit {
  searchControl: FormControl = new FormControl('');

  constructor(private router: Router, private destroy: DestroyService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy))
      .subscribe((model) => {
        if (!!model) this.router.navigate(['/search', model]);
        else this.router.navigate(['/']);
      });
  }

  selectLink() {
    this.searchControl.setValue('');
  }
}
