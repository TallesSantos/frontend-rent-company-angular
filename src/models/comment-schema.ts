interface CommentSchema {
    id:number;
    commentText: string;
    children?:CommentSchema[];
    nameOfLikers?:string[]
}
