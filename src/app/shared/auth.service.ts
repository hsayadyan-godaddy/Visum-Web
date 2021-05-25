import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map }  from 'rxjs/operators';
import { HttpClient , HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router }  from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class AuthService { 
endpoint: string  = "http://localhost:5000/api";
headers = new HttpHeaders().set('Content-Type','application/json');
currentUser = {};
public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

constructor(
  private http: HttpClient,
  public router : Router
){}

//Sign Up
signIn(user: User){
  return this.http.post<any>(`${this.endpoint}/account/login`, user,  { headers : this.headers})
  .subscribe((res: any)=> {
    localStorage.setItem('user_name',user.userName)
    localStorage.setItem('access_token', res.token)
    this.isUserLoggedIn.next(true);
    this.router.navigate(['projects/']);
    
  })
}

getToken(){
  return localStorage.getItem('access_token');
}

get isLoggedIn() : boolean {
  let authToken = localStorage.getItem('access_token');
  return (authToken == null) ? false : true;
}

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    if(removeToken == null) {
      this.router.navigate(['login'])
    }
  }

  getUserProfile(id): Observable<any>{
    let api = `${this.endpoint}/account/$id`;
    return this.http.get(api, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
  
handleError(error: HttpErrorResponse){
  let msg = '';
  if(error.error instanceof ErrorEvent){
    msg = error.error.message;
  }else{
    msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(msg);
}

}
