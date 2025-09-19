export interface Job {
  id: string;       
  no: number;               
  status: string;                
  userId: string;             
  area: string;
  dateSurveyed: Date;
  jobNumber: string;           
  poNumber?: string | null;     
  woNumber?: string | null;       
  reportNumber?: string | null;   
  jobDescription: string;
  method: string;
  inspector: string;
  analyst?: string | null;      
  reviewer?: string | null;       
  dateFinished?: Date | null;   
  inspectionRoute: string;
  equipmentUse: string;
  dateRegistered: Date;      
  yearWeekNumber: string;
  reportIntroduction?: string | null;
  createdAt: Date;              
  updatedAt: Date;
}


export type ExtendedJob = Job & {
  user: {
    id: string;
    name: string;
  };
  routeList: {
    routeName: string;
    machines: {
      id: string;
    }[];
  };
};

export type JobsResponse = {
  jobs: ExtendedJob[];
  message: string;
  success: boolean;
};

export type SeveritiesResponse = {
  data: {
    severity: string;
    count: number;
  }[];
};

export type Area = {
  id: string;
  name: string;
  isDelete: boolean;
};

export type AreaResponse = {
  areas: Area[];
  message: string;
  success: boolean;
};