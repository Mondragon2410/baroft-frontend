import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment, IComment } from 'src/app/models/comment';



declare var M: any;



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentService]

})
export class CommentsComponent implements OnInit {

  
  comments: IComment[] = []
  public selectedComment!: IComment;

  constructor(public commentService: CommentService) { }

  ngOnInit() {
    this.comments = this.commentService.Comments; //aqui van los comentarios en minuscula
    this.selectedComment = this.commentService.selectedComment;
    this.getComments();

  }

  addComment(form: NgForm){
    if(form.value._id){
      this.commentService.putComment(form.value)
       .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Comentario actualizado'})
        this.getComments();
       })
    }else{

      this.commentService.postComment(form.value)  
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Comentario guardado'})
        this.getComments();
      });
    }
    
  }

  getComments(){
    this.commentService.getComments()  //almacena el comentario en el servidor
      .subscribe(res => {
        this.comments = res as IComment[];
        
      });
  }

  editComment(comment: Comment){
    this.selectedComment = comment;
  }

  deleteComment(_id: string){
    if(confirm('Esta seguro que quiere eliminarlo?')){

      this.commentService.deleteComment(_id)
        .subscribe(res => {
          this.getComments();
          M.toast({html: 'Comentario eliminado'})
      });
    }
  
  }

  resetForm(form?: NgForm){
    if (form){
      form.reset();
      this.commentService.selectedComment = new Comment();
    }

  }

}
