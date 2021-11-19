
import { commentModel } from './comment.model';
export class PostModel {
  constructor(
    public PostId?: number,
    public UserId?: number,
    public CategoryId?: number,
    public CategoryName?: string,
    // public ReactionId?:number,
    public ReactionName?: string,
    public ImageSource?: string,
    public content?: string,
    public PostDate?: Date,
    public UserName?: string,
    public role?: string,
    public comments?:any,
  ) {}
}
