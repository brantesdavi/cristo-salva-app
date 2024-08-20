import { Component, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api'; // Importa o MessageService
import { Song } from '../../../models/Song.interface';
import { SongService } from '../../../services/song/song.service';
import { error } from 'console';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { User } from '../../../models/User.interface';
import { Track } from '../../../models/Track.interface';
import { Schedule } from '../../../models/Schedule.Interface';
import { min } from 'rxjs';
import { ScheduleService } from '../../../services/schedule/schedule.service';

@Component({
  selector: 'app-register-schedule',
  templateUrl: './register-schedule.component.html',
  styleUrl: './register-schedule.component.scss',
  providers: [AuthService, MessageService, SongService, ScheduleService, LocalstorageService]
})
export class RegisterScheduleComponent {

  register: FormGroup;
  suggestions: Song[] = [];
  trackList: Track[] =[];

  ministerChoosed: User | undefined;
  ministerSearch: User[] = [];

  musicianSearch: User[] = [];
  musicians: User[] = [];
   
  selectedTune: any = null;
  editTune: Song | undefined;

  visible: boolean = false;

  tunes: any[] = [
    { name: 'A', key: 'A' },
    { name: 'A#', key: 'A_SHARP' },
    { name: 'B', key: 'B' },
    { name: 'C', key: 'C' },
    { name: 'C#', key: 'C_SHARP' },
    { name: 'D', key: 'D' },
    { name: 'D#', key: 'D_SHARP' },
    { name: 'E', key: 'E' },
    { name: 'F', key: 'F' },
    { name: 'F#', key: 'F_SHARP' },
    { name: 'G', key: 'G' },
    { name: 'G#', key: 'G_SHARP' },

  ];

  token: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private songService: SongService, 
    private scheduleService: ScheduleService,
    private localStorage: LocalstorageService,
    private authService: AuthService,
    private messageService: MessageService,
  ) {
    this.register = this.fb.group({
      title: ['', Validators.required],
      startTime: [null, Validators.required],
      obs: [''],
      ministro: [''],
      musicos: [this.musicians],
      setlist: [this.trackList],
      searchQuery: ['']
    });

    // Watch for changes to the search query field
    this.register.get('musicos')?.valueChanges.subscribe(query => {
      if(this.token) {
        if (query.trim()) {
          this.authService.searchUserByName(query.trim())
          .subscribe({
            next: (data: User[]) => {
              this.musicianSearch = data;
            }
          });
        } else {
          this.musicianSearch = [];
        }
      }
    });

    

    this.register.get('ministro')?.valueChanges.subscribe(query => {
      if(this.token) {
        if (query.trim()) {
          this.authService.searchUserByName(query.trim())
          .subscribe({
            next: (data: User[]) => {
              this.ministerSearch = data;
            }
          });
        } else {
          this.ministerSearch = [];
        }
      }
    });

    this.register.get('searchQuery')?.valueChanges.subscribe(query => {
      if(this.token) {
        if (query.trim()) {
          this.songService.getSugestions(query.trim())
          .subscribe({
            next: (data: Song[]) => {
              this.suggestions = data;
            }
          });
        } else {
          this.suggestions = [];
        }
      }
    });


  }

  ngOnInit(): void {
    this.token = this.localStorage.getToken();
    
  }

  get email() {
    return this.register.get('email');
  }

  get password() {
    return this.register.get('password');
  }

  get title() {
    return this.register.get('title');
  }

  get datetime() {
    return this.register.get('datetime');
  }
  get obs() {
    return this.register.get('obs');
  }

  addSetList(song: Song) {
    this.songService.getById(song.id, { headers: {Authorization: `Bearer ${this.token}`}})
        .subscribe({
          next: (data: Song) => {
            const track: Track = {
              song: data,
              tune: data.oTune              
            }

            this.trackList.push(track)
          }
        })
    this.suggestions = [] 

  }

  addMusician(musician: User) {
    this.musicians.push(musician)
    this.musicianSearch = []

  }

  rmSetList(track: Track) {
    this.trackList = this.trackList.filter(item => item.song !== track.song);
  }

  rmMusicianList(musician: User) {
    this.musicians = this.musicians.filter(item => item !== musician);
  }

  showDialog(track: Track) {
    this.visible = true;
    this.selectedTune = this.getTuneFromOtune(track.tune);
    this.editTune = track.song;
  }   
  

  getTuneFromOtune(otune: string): any {
    return this.tunes.find(tune => tune.key === otune);
  }  

  confirmTuneChange() {
    if (this.editTune && this.selectedTune) {
      const index = this.trackList.findIndex(t => t.song.id === this.editTune?.id);
      if (index !== -1) {
        this.trackList[index].tune = this.selectedTune.key;
      }
      this.visible = false;
    }
  }

  choseMinister(minister: User) {
    this.ministerChoosed = minister;
    this.ministerSearch = []; // Limpa a lista de sugestões após a seleção

  }

  onSubmit() {
    if (this.register.valid && this.ministerChoosed) {
      const formData = this.register.value;

      const schedule: Schedule = {
        title: formData.title,
        startTime: formData.startTime,
        obs: formData.obs,
        ministerId: this.ministerChoosed.id,
        musiciansId: this.musicians.map(musician => musician.id),
        songId: this.trackList.map(track => track.song.id),
        tunes: this.trackList.map(track => track.tune)
      }
      
      this.scheduleService.createSchedule(schedule).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Escala registrada com sucesso!' });
        },
        error: error => {
          console.error('Erro ao registrar a escala:', error);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao registrar a escala.' });
        }
      })
      
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Formulário inválido.' });
    }
  }

}
