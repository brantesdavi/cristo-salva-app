import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LocalstorageService {
  private readonly tokenKey = 'token';
  private readonly userIdKey = 'userId';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    } else {
      console.warn('Cant get token, localStorage is not available.');
      return null;
    }
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      console.warn('localStorage is not available.');
    }
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    } else {
      console.warn('localStorage is not available.');
    }
  }

  getUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.userIdKey);
    } else {
      console.warn('Cant get id, localStorage is not available.');
      return null;
    }
  }

  setUserId(userId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.userIdKey, userId);
    } else {
      console.warn('localStorage is not available.');
    }
  }

  removeUserId(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.userIdKey);
    } else {
      console.warn('localStorage is not available.');
    }
  }
}
