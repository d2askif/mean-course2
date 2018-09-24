import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {Subject, Observable, identity} from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import {  ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post [] = [];
  private postsUpdated: Subject<Post[]> = new Subject();

  constructor( private httpClient: HttpClient, private route: Router) { }

  getPosts() {
    this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts').
    pipe(map((postData) => {
      console.log(postData);
      return postData.posts.map((transformedPost) => {
       return {title: transformedPost.title, content: transformedPost.content, id: transformedPost._id };
      });
    })).
    subscribe((data) => {
     this.posts = data;
     this.postsUpdated.next([...this.posts]);
    });
  }
  getPostsUpdateListner(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content
    };
    this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post).
    subscribe((data) => {
      const newPostId = data.postId;
      post.id = newPostId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      // navigate to the root route
      this.route.navigate(['/']);
      });

  }
  getPost(id: string) {
    return this.httpClient.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id);
   // return {...this.posts.find(post => post.id === id)};
  }
  updatePost(id: string, title: string, content: string) {
    const post: Post = {id: id, title: title, content: content};
    this.httpClient.put<{message: string}>('http://localhost:3000/api/posts/' + id, post).subscribe((res) => {
    // navigate to the root route
    this.route.navigate(['/']);
  });
  }

  deletPost(id: string ) {
    this.httpClient.delete('http://localhost:3000/api/posts/' + id).subscribe((res) => {
      console.log('DELETED');

      const posts = this.posts.filter(val => val.id !== id);
      this.posts = [...posts];
      this.postsUpdated.next([...this.posts]);
    });
  }

}
