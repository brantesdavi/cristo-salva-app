import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterSongComponent } from './register-song.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RegisterSongComponent],
  exports: [RegisterSongComponent],
})
export class RegisterSongModule {}
