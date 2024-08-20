import { RegisterSongModule } from './register-song.module';

describe('RegisterSongModule', () => {
  const module: RegisterSongModule = new RegisterSongModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
