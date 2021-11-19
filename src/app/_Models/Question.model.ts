export class QuestionModel{
    constructor(   
        public ID?:number,
        public Date?:Date,
        public Question?:string,
        public UserName?:string,
        public Answer?:string[]
        )
    {}
}