import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor( private postservice: PostService) {}

  ngOnInit() {
    this.errorSub = this.postservice.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.isFetching = true;
    this.postservice.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },
    error => {
      this.isFetching= false; 
      this.error = error.message;
    })
  }

  onCreatePost(postData: Post) {
    console.log(postData);
    this.postservice.createAndStorePosts(postData.title, postData.content);
    
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postservice.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },
    error => {
      this.isFetching = false;
      this.error = error.message;
    });
  
  }

  onClearPosts() {
    this.postservice.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    });
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

  onHandleError(){
    this.error = null;
  }

}
