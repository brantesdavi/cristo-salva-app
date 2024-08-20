import { LocalstorageService } from './localstorage.service';

describe('LocalstorageService', () => {
  const service: LocalstorageService = new LocalstorageService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
