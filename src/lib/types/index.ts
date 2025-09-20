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

export type GetUserResponse = {
  user: {
    name: string;
    email: string;
    role: "admin" | "user";
    // emailVerified: Date | null;
  };
  message: string;
  success: boolean;
  error: string | null
};

export type Client = {
  id: string;
  name: string;
};

export type GetAllClientsResponse = {
  users: Client[];
};

export type MachinesCountResponse = {
  areas: number;
  equipmentGroup: number;
  equipmentName: number;
  components: number;
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

export type EquipmentGroup = {
  id: string;
  name: string;
  areaId: string;
  isDelete: boolean;
};

export type EquipmentGroupResponse = { equipmentGroups: EquipmentGroup[] };

export type EquipmentName = {
  id: string;
  name: string;
  groupId: string;
  isDelete: boolean;
};

export type EquipmentNameResponse = {
  equipmentNames: EquipmentName[];
};

export type Component = {
  id: string;
  name: string;
  equipmentNameId: string;
  isDelete: boolean;
};

export type ComponentResponse = {
  components: Component[];
};

