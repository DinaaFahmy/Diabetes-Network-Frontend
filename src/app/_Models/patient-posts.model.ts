export class PatientPosts{
    constructor(
        public userID?: number,
        public userName?:string,
        public reactionName?: string,
        public categoryName?: string,
        public img?: string,
        public content?: string,
        public date?:Date
        ){}
}
