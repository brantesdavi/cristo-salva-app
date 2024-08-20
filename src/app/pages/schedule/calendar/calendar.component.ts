import { Component } from '@angular/core';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { Schedule } from '../../../models/Schedule.Interface';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { groupBy } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  providers: [ScheduleService, LocalstorageService]
})
export class CalendarComponent {
  
  scheduleByUser: Schedule[] | undefined;

  constructor(
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    
    
    
  }

  listSchedules() {
    this.scheduleService.listScheduleByUser(0,10)
    .subscribe({
      next: (data) => {
        this.scheduleByUser = data
      }
    })
  }

  /*

  private groupSchedulesByDate(schedules: Schedule[]): { [date: string]: Schedule[] } {
    const grouped = groupBy(schedules, (schedule) => {
      const date = new Date(schedule.startTime);
      return date.toISOString().split('T')[0]; // Formata a data no formato YYYY-MM-DD
    });
    return grouped;
  }
    */

}
