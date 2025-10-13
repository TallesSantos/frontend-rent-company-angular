import { MovieSchema } from "../../../models/movie-schema";

   export function createCommentSchema(comments: NodeListOf<Element>) {
        const commentsResponse: CommentSchema[] = [];
        comments.forEach((element) => {
            const commentId = Number(element.querySelector(':scope > id')?.textContent);

            const commentText = element.querySelector(':scope > commentText')?.textContent;

            const commentLikes: string[] = [];

            element.querySelectorAll(':scope > nameOfLikers').forEach((element) => {
                commentLikes.push(element.textContent);
            });

            const commentsChildren: CommentSchema[] = createCommentSchema(
                element.querySelectorAll(':scope > childresnComments')
            );

            const comment: CommentSchema = {
                id: commentId,
                commentText: commentText!,
                nameOfLikers: commentLikes,
                children: commentsChildren,
            };
            commentsResponse.push(comment);
        });
        return commentsResponse;
    }
    export function createMovieSchema(item: Element) {
        const el = item;
        const id = Number(el.querySelector(':scope > id')?.textContent);
        const name = String(el.querySelector(':scope> name')?.textContent);
        const description = String(el.querySelector(':scope > description')?.textContent);
        const rented = el.querySelector(':scope > rented')?.textContent;
        const rentedTime = String(el.querySelector(':scope > rentedTime')?.textContent);
        const image_url = String(el.querySelector(':scope > imageUrl')?.textContent);
        const clientId = Number(el.querySelector(':scope > client > id')?.textContent);
        const clientName = String(el.querySelector(':scope > client > name')?.textContent);

        const comments: CommentSchema[] = createCommentSchema(
            el.querySelectorAll(':scope > comments')
        );

        const nameOfLikers: string[] = [];
        el.querySelectorAll(':scope > nameOfLikers').forEach((element) => {
            nameOfLikers.push(element.textContent);
        });
        const movie: MovieSchema = {
            id,
            name,
            description,
            is_rent: rented?.match('true') ? true : false,
            rent_date: rentedTime,
            client: clientId && clientName ? { id: clientId, name: clientName } : null,
            image_url: image_url,
            nameOfLikers: nameOfLikers,
            comments: comments,
        };
        return movie;
    }
