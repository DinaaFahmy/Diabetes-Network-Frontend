import { CertificateModel } from './certificate-model';

export class DoctorinfoModel {
 constructor(public UserName?:string,public Password?:string,public Email?:string,public ImageSource?:string
  , public Address?:string,public PhoneNumber?:string,public ValidationStatus?:boolean,public Certificates?:CertificateModel[])
{

}

}
