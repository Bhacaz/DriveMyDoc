import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  initSession(googleUser: any) {
    const profile = googleUser.getBasicProfile();

    const user = {
      email: profile.getEmail(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl()
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', googleUser.getAuthResponse().access_token);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
