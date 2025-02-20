export interface VisitorInfo {
  department: string;
  name: string;
  email: string;
  phone: string;
  visitDate: Date;
  visitTarget: string;
  visitPurpose: string;
}

export interface VisitorData {
  _id: string;
  status: string;
  department: string;
  name?: string;
  email?: string;
  phone?: string;
  visitDate: string;
  visitTarget?: string;
  visitPurpose?: string;
}

export interface DepartmentStore {
  department: string;
  setDepartment: (department: string) => void;
}
