import { UseService } from './../../services/user-service/use-service';
import { Component, OnInit } from '@angular/core';
import { MovieSchema } from '../../../models/movie-schema';
import { UserSchema } from '../../../models/user-schema';
import { CommentComponent } from '../comment-component/comment-component';

@Component({
    selector: 'app-movie-description-component',
    imports: [CommentComponent],
    templateUrl: './movie-description-component.html',
    styleUrl: './movie-description-component.css',
})
export class MovieDescriptionComponent implements OnInit {

   showComments = false;

    toggleComments() {
        this.showComments = !this.showComments;
    }

    movie: MovieSchema | null;
    fallbackUrl: string = 'images/image_movie_fallback.jpeg';
    user!: UserSchema | null;

    constructor(private useService: UseService) {
        this.movie = null;
    }

    ngOnInit(): void {
        this.user = this.useService.getUser();
        this.movie = this.movie = history.state.movie;
    }

    fallback(event: Event) {
        const imgElement = event.target as HTMLImageElement;
        imgElement.src = this.fallbackUrl;
    }

    userIsClientAndMovieIsNotNull(){
        if(this.user?.userType =="CLIENT" && this.movie!= null){
            return true
        }
        return false
    }

    movieHasLikes(){
        if(this.movie !== null && this.movie?.nameOfLikers){
            return true;

        }
        return false;
    }
    movieHasComments (){

        if(this.movie !== null && this.movie?.comments){
            return true;
        }
        return false;
    }
}
