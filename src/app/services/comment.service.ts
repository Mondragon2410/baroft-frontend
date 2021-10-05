import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  Comments: Comment[] = []; 
  selectedComment: Comment;
  readonly URL_API = environment.baseUrl + '/comments';

  constructor(private http: HttpClient) { 
    this.selectedComment = new Comment();
  }

  getComments(){
   
    return this.http.get(this.URL_API)
  }

  postComment(Comment: Comment){
    return this.http.post(this.URL_API, Comment);
  }

  putComment(comment: Comment){
    return this.http.put(this.URL_API + `/${comment._id}`, comment);
  }

  deleteComment(_id: string){
    return this.http.delete(this.URL_API + `/${ _id }`);

  }


}
