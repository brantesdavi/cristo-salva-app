import { SongService } from './song.service';

describe('SongService', () => {
  const service: SongService = new SongService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
