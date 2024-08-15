import { AuthService } from './auth.service';

describe('AuthService', () => {
  const service: AuthService = new AuthService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
