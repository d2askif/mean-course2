import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class  PostCreateComponent implements OnInit {
  postCreated = new EventEmitter<Post>();
  enteredValue = '';
  enteredContent = '';
  enteredTitle = '';
  mode = 'create';
  private postId: string;
  post: Post;
  isLoading = true;
  constructor(private postService: PostsService, public route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
           this.postService.getPost(this.postId).subscribe((res) => {
             this.isLoading = false;
            this.post = {id: res._id, title: res.title, content: res.content};
          });
        } else {
          this.mode = 'create';
          this.postId = null;
          this.isLoading = false;

        }
    });
  }
onAddPost(form: NgForm) {
  if (form.invalid) {
    return;
  }
  if (this.mode === 'create') {
    this.postService.addPost(form.value.title, form.value.content);
 } else {
   this.postService.updatePost(this.postId, form.value.title, form.value.content);
    this.mode = 'create';
    this.postId = null;
 }
    form.resetForm();
  }
}
