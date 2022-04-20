import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { DestroyService } from '@core/services/destroy.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [DestroyService],
})
export class UploadComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public fileList: File[] = [];

  constructor(
    private httpService: HttpService,
    private destroy: DestroyService
  ) {}

  ngOnInit(): void {}

  onSelect(event: any) {
    console.log(event);
    this.fileList.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.fileList.splice(this.fileList.indexOf(event), 1);
  }

  submit() {
    console.log('files: ', this.fileList);

    for (var i = 0; i < this.fileList.length; i++) {
      this.isLoading = true;
      this.httpService
        .uploadGif(this.fileList[i])
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
