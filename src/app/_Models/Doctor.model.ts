export class DoctorModel{
    constructor(
        public ID?:number, //follow id
        public DoctorId?:number,
        public AccessMedicalInfo?:number,
        public UserName?:string,
        public ImageSource?:string,       
        public Type?:number
        )
    {}
}