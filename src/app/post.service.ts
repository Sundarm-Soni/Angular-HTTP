import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  createAndStorePosts(title: string, content: string){
    const postData: Post = {title: title, content: content}

    this.http
    .post<{name: string}>(
       'https://angular-complete-guide-790d5.firebaseio.com/posts.json',
       postData
    )
     .subscribe(responseData => {
       console.log(responseData);
     });
  }

  fetchPosts(){
    return this.http
      .get<{[key: string]: Post}>(
         'https://angular-complete-guide-790d5.firebaseio.com/posts.json')
         .pipe(map(responseData=>{
           const postArray =[];
           console.log(responseData);
           for(const key in responseData){
             if(responseData.hasOwnProperty(key)){
             postArray.push({ ...responseData[key], id: key});
            }
           }
           return postArray;
         }))
         }

        deletePosts(){
          return this.http.delete('https://angular-complete-guide-790d5.firebaseio.com/posts.json');

        }
}
