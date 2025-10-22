import { User } from './../../pages/user/user';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UseService } from '../../services/user-service/use-service';
import { FormsModule } from '@angular/forms';
import { MovieSchema } from '../../../models/movie-schema';

@Component({
    selector: 'div[app-comment-component]',
    imports: [CommonModule, FormsModule],
    templateUrl: './comment-component.html',
    styleUrl: './comment-component.css',
})
export class CommentComponent {

    constructor(protected userService: UseService) {}

    @Input() level: number = 1;

    @Input() comment: CommentSchema | null = null;

    @Input() parentMovie!: MovieSchema;

    @Input() parentComment: CommentSchema | null = null;


    public getParentMovie() {
        return this.parentMovie;
    }

    showChildrenComments = false;

    toggleChildrenComments() {
        this.showChildrenComments = !this.showChildrenComments;
    }

    protected addCommentRequest = {
        commentText: '',
    };

    get computedBgColor(): string {
        const bgColor = this.level % 2 != 0 ? '#DDD' : 'antiquewhite';
        return `${bgColor}`;
    }

    get computedWidth(): string {
        const margin = this.level + 5;
        return `${margin}px`;
    }

     addRootComment(text: string) {
        return this.userService.comment(this.parentMovie.id, undefined, text).subscribe({
            next: () => {
                console.log('Comentario criado com sucesso');
            },
            error: (err) => {
                console.error('Erro ao comentar:', err);
            },
        });
    }
    addChildrenComment(text: string) {
        return this.userService.comment(this.parentMovie.id, this?.comment?.id, text).subscribe({
            next: () => {
                console.log('Comentario criado com sucesso');
            },
            error: (err) => {
                console.error('Erro ao comentar:', err);
            },
        });
    }

    updateComment(text: string) {
    return this.userService.updateComment(this?.comment?.id, text).subscribe({
            next: () => {
                console.log('Comentario atualizado com sucesso');
            },
            error: (err) => {
                console.error('Erro ao atualizar comentar:', err);
            },
        });
}

    removeComment() {
            return this.userService.removeComment(this?.comment?.id).subscribe({
            next: () => {
                console.log('Comentario removido com sucesso');
            },
            error: (err) => {
                console.error('Erro ao deletar comentar:', err);
            },
        });
    }

}
