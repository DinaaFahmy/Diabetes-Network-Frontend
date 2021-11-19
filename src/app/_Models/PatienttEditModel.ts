import { DrugModel } from './Drug-model';

export class patientEditModel {
  public testType?: number;
  public testResult?: string;
  public testMedicationsState?: number;
  public testDate?: Date;
  public checkupType?: number;
  public checkupNotes?: string;
  public checkupDate?: Date;
  public checkupData?: string;
  public checkupStatus?: number;
  public drugNote?: string;
  public drugDosage?: number;
  public access_med_info?: number;
  public birth_date?: Date;
  public gender?: string;
  public height?: number;
  public img?: string;
  public life_style?: number;
  public medical_cond?: number;
  public userID?: number;
  public user_name?: string;
  public weight?: number;
  public password?: string;
  public newpassword?: string;
  public phone_number?: string;
  public email?: string;
  public points?: number;
  public drugs?: DrugModel[];

  constructor() {}
}
