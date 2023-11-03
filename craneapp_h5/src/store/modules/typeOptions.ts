import { defineStore } from 'pinia';
import store from '@/store';
interface Options {
  label: string;
  value: string;
}
interface TypeOptions {
  systemType: Options[];
  deviceType: Options[];
  copyType: Options[];
  partType: Options[];
  programType: Options[];
  roleType: Options[];
  craneType:Options[];
}
export const useTypeOptions = defineStore({
  id: 'typeOptions',
  state: (): TypeOptions => ({
    systemType: [],
    deviceType: [],
    copyType: [],
    partType: [],
    programType: [],
    roleType: [],
    craneType:[]
  }),
  getters: {
    // getsystemTypeOptions: (state) => {
    //   return state.systemType;
    // },
    // getdeviceTypeOptions: (state) => {
    //   return state.deviceType;
    // },
    // getcopyTypeOptions: (state) => {
    //   return state.copyType;
    // },
    // getpartTypeOptions: (state) => {
    //   return state.partType;
    // },
    // getprogramTypeOptions: (state) => {
    //   return state.programType;
    // },
    // getroleTypeOptions: (state) => {
    //   return state.roleType;
    // },
    getTypeOptions:(state)=>{
        return (name:string)=>state[name]
    }
  },
  actions: {
    setTypeOptions(v: Options[],name: string){
      this[name]=v
    },
    
  },
});

export function useBaseType() {
  return useTypeOptions(store);
}
