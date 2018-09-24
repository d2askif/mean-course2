import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy {
posts: Post[] = [];
postsSub: Subscription;

  constructor( private postService: PostsService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostsUpdateListner().subscribe((updatedPosts) => {
    this.posts = updatedPosts;
    });
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
  onDelete (id: string) {
   this.postService.deletPost(id);
  }

}
