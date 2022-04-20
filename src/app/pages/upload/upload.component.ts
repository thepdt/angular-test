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
  public myFiles: string[] = [];

  uploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });

  constructor(
    private httpService: HttpService,
    private destroy: DestroyService
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.uploadForm.controls;
  }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  submit() {
    const formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('file[]', this.myFiles[i]);
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
          // this.gifs = [...this.gifs, ...data.data];
          console.log(i, data);
        });
    }
  }
  ngOnDestroy(): void {}
}
