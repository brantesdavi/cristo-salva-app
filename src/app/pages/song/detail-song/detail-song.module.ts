import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailSongComponent } from './detail-song.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DetailSongComponent],
  exports: [DetailSongComponent],
})
export class DetailSongModule {}
