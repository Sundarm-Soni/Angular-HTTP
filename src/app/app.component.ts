import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  constructor( private postservice: PostService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postservice.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },
    error => {
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
      this.error = error.message;
    });
  
  }

  onClearPosts() {
    this.postservice.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    });
  }
}
