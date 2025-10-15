interface CommentSchema {
    id:number;
    commentText: string;
    publishedAt?:string;
    ownerName: string;
    children?:CommentSchema[];
    nameOfLikers?:string[]
}
