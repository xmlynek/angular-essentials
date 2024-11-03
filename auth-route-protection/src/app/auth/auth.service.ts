import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, Observable, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean;
}

@Injectable({providedIn: "root"})
export class AuthService {
  public static USER_DATA_LOCAL_STORAGE_NAME: string = "userData";

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem(AuthService.USER_DATA_LOCAL_STORAGE_NAME);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  signup(email: string, password: string,): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPI_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe(
      catchError(this.handleError),
      tap(value => this.handleAuthentication(value.email, value.localId, value.idToken, +value.expiresIn))
    );
  }

  login(email: string, password: string,): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPI_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe(
      catchError(this.handleError),
      tap(value => this.handleAuthentication(value.email, value.localId, value.idToken, +value.expiresIn))
    );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem(AuthService.USER_DATA_LOCAL_STORAGE_NAME, JSON.stringify(user));
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem(AuthService.USER_DATA_LOCAL_STORAGE_NAME));
    if (!userData) {
      return;
    }
    const loadedUser: User = new User(userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    console.log('autoLogin loaded user ', loadedUser);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log("Error occurred:", errorRes.error.error.message);
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist!";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Invalid password!";
        break;
      case "USER_DISABLED":
        errorMessage = "This user has been disabled!";
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = "Invalid login credentials!";
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
