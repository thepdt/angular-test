import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, finalize, takeUntil } from 'rxjs';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { GifWithPosition } from '@core/models/giphy';
import { HttpService } from '@core/services/http.service';
import { DestroyService } from '@core/services/destroy.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [DestroyService],
})
export class UploadComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public myFiles: File[] = [];

  constructor(
    private httpService: HttpService,
    private destroy: DestroyService
  ) {}

  ngOnInit(): void {}

  onSelect(event: any) {
    console.log(event);
    this.myFiles.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.myFiles.splice(this.myFiles.indexOf(event), 1);
  }

  submit() {
    console.log('files: ', this.myFiles);

    for (var i = 0; i < this.myFiles.length; i++) {
      this.isLoading = true;
      this.httpService
        .uploadGif(this.myFiles[i])
        .pipe(
          catchError((error) => {
            throw error;
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((data) => {
          console.log(i, data);
        });
    }
  }

  ngOnDestroy(): void {}
}
