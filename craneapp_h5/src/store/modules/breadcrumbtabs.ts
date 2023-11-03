import { defineStore } from "pinia";
import store from "@/store";
import { title } from "process";
interface Title{
    title:String
}
export const usebreadcrumb=defineStore({
    id:'breadcrumb',
    state:():Title=>({
       title:'数据图表' 
    }),
    getters:{
       getBreadcrumbTitle:(state)=>{
         return state.title
       }
    },
    actions:{
        updateTitle(name: String) {
            this.title=name
        },
    }
})

export function usebreadcrumbTitle(){
    return usebreadcrumb(store)
}