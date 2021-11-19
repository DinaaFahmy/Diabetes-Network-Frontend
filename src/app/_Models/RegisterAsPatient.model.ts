export class RegisterAsPatientModel{
constructor(
    public UserName?:string,
    public Email?:string,
    public Gender?:string,
    public Password?:string,
    public BirthDate?:Date,
    public MedicalCondetion? :number,
    public Weight?:number,
    public Height?:number,
    public LifeStyle?:number
   // public PhoneNumber?:string
    )
    {}  
}