import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SongListComponent } from './song-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SongListComponent],
  exports: [SongListComponent],
})
export class SongListModule {}
