import { create } from 'zustand';
import { DepartmentStore } from '../types/visitor';

const useDepartmentStore = create<DepartmentStore>((set) => ({
  department: '',
  setDepartment: (department) => set({ department }),
}));

export default useDepartmentStore;
