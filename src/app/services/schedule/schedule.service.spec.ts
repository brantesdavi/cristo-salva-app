import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  const service: ScheduleService = new ScheduleService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
