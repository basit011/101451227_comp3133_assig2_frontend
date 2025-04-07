// import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
// import { Apollo } from 'apollo-angular';
// import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../../graphql/auth.mutations';
// import { Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private apollo = inject(Apollo);
//   private router = inject(Router);

//   login(email: string, password: string) {
//     return this.apollo.mutate({
//       mutation: LOGIN_MUTATION,
//       variables: { email, password },
//     });
//   }

//   signup(username: string, email: string, password: string) {
//     return this.apollo.mutate({
//       mutation: SIGNUP_MUTATION,
//       variables: { username, email, password },
//     });
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']);
//   }
//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

//   getToken(): string | null {
//     if (isPlatformBrowser(this.platformId)) {
//       return localStorage.getItem('token');
//     }
//     return null;
//   }

//   isLoggedIn(): boolean {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = this.getToken();
//       if (!token) return false;
      
//        try {
//         const decoded: any = jwtDecode(token);
//         return decoded.exp ? decoded.exp > Date.now() / 1000 : false;
//       } catch {
//         return false;
//       }
//     }
//     return false;
//   }

//   // getToken(): string | null {
//   //   return localStorage.getItem('token');
//   // }

//   // isLoggedIn(): boolean {
//   //   const token = this.getToken();
//   //   if (!token) return false;

//   //   try {
//   //     const decoded = jwtDecode(token);
//   //     return decoded.exp ? decoded.exp > Date.now() / 1000 : false;
//   //   } catch {
//   //     return false;
//   //   }
//   // }

//   getCurrentUserEmail(): string | null {
//     const token = this.getToken();
//     if (!token) return null;

//     try {
//       const decoded = jwtDecode(token) as { email: string };
//       return decoded.email;
//     } catch {
//       return null;
//     }
//   }
// }



import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../../graphql/auth.mutations';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apollo = inject(Apollo);
  private router = inject(Router);

  // login(email: string, password: string) {
  //   return this.apollo.mutate({
  //     mutation: LOGIN_MUTATION,
  //     variables: { email, password },
  //   });
  // }

  // In your auth service
  // login(credentials: any) {
  //   return this.apollo
  //     .mutate({
  //       mutation: LOGIN_MUTATION,
  //       variables: credentials,
  //     })
  //     .pipe(
  //       tap((result: any) => {
  //         localStorage.setItem('token', result.data.login.token);
  //       })
  //     );
  // }
  // login(credentials: { email: string; password: string }) {
  //   return this.apollo
  //     .mutate({
  //       mutation: LOGIN_MUTATION,
  //       variables: credentials,
  //     })
  //     .pipe(
  //       tap((result: any) => {
  //         localStorage.setItem('token', result.data.login.token);
  //       })
  //     );
  // }
  // auth.service.ts
  login(credentials: { email: string; password: string }) {
    return this.apollo
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: credentials,
      })
      .pipe(
        tap((result: any) => {
          const token = result.data?.login?.token;
          if (token) {
            localStorage.setItem('token', token);
          }
        })
      );
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { username, email, password },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      if (!token) return false;

      try {
        const decoded: any = jwtDecode(token);
        return decoded.exp ? decoded.exp > Date.now() / 1000 : false;
      } catch {
        return false;
      }
    }
    return false;
  }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // isLoggedIn(): boolean {
  //   const token = this.getToken();
  //   if (!token) return false;

  //   try {
  //     const decoded = jwtDecode(token);
  //     return decoded.exp ? decoded.exp > Date.now() / 1000 : false;
  //   } catch {
  //     return false;
  //   }
  // }

  getCurrentUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode(token) as { email: string };
      return decoded.email;
    } catch {
      return null;
    }
  }
}
