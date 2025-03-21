export interface VisitorInfo {
  department: string;
  name: string;
  email: string;
  phone: string;
  visitStartDate: Date;
  visitEndDate: Date;
  visitTarget: string;
  visitPurpose: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VisitorData {
  _id: string;
  status: string;
  department: string;
  name: string;
  email: string;
  phone: string;
  visitStartDate: Date;
  visitEndDate: Date;
  visitTarget: string;
  visitPurpose: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DepartmentStore {
  department: string;
  setDepartment: (department: string) => void;
}
