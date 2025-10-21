import { ClientSchema } from "./client-schema";

export interface MovieSchema {
  id: number;
  name: string;
  description: string;
  is_rent?: boolean;
  rent_date?: string;
  client?:ClientSchema | null
  image_url?:string;
  imageUrl?: string;
  nameOfLikers?:string[];
  comments?: CommentSchema[]
}
