import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Post } from './post.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<string>();
  constructor(private http: HttpClient) { }

  createAndStorePosts(title: string, content: string){
    const postData: Post = {title: title, content: content}

    this.http
    .post<{name: string}>(
       'https://angular-complete-guide-790d5.firebaseio.com/posts.json',
       postData,
       {
          observe: 'response'
       }
    )
     .subscribe(responseData => {
       console.log(responseData.body);
     },error=>{
       this.error.next(error.message);
     });
  }

  fetchPosts(){
    return this.http
      .get<{[key: string]: Post}>(
         'https://angular-complete-guide-790d5.firebaseio.com/posts.json',
          {
            headers: new HttpHeaders({'Custom-Header': 'Hello'}),
            params: new HttpParams().set('print','pretty')
          }
         )
         .pipe(map(responseData=>{
           const postArray =[];
           console.log(responseData);
           for(const key in responseData){
             if(responseData.hasOwnProperty(key)){
             postArray.push({ ...responseData[key], id: key});
            }
           }
           return postArray;
         }),
         catchError(errorRes =>{
           //send to analytics server
          return throwError(errorRes);
         })
         )}

        deletePosts(){
          return this.http.delete('https://angular-complete-guide-790d5.firebaseio.com/posts.json',
          {
            observe: 'events'
          }).pipe(
            tap( event =>{
              console.log(event);
              if(event.type === HttpEventType.Sent){
                
              }
              if(event.type === HttpEventType.Response){
                console.log(event.body);
              }
            })

          )
          
          

        }
}
