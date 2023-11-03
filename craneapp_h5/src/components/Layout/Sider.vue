<template>
    <div>
        <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline"
            :style="{ height: '100%', borderRight: 0 }" :collapsed="collapsed" @click="menuChange">
            <template v-for="(item, index) in menus" :key="item.key">
                <a-menu-item>
                    <component :is="item.icon" />  
                    <span>{{ item.title }}</span>
                </a-menu-item>
            </template>
        </a-menu>
    </div>
</template>

<script setup lang="ts">
//  {title:'',key:'1',children:[{title:'',key:''}]}
import { ref, watch } from 'vue';
import type { MenuProps } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';


let router = useRouter()
let route = useRoute()
interface Details {
    title: any,
    key: string,
    icon?: string,
    path?: string,
    children?: Details
}
let curMenus = router.getRoutes().filter(item=>item.path != '/' && item.path != '/login')
let icons=[
    {icon: 'DiffOutlined', path: '/program'},
    {icon: 'UserOutlined', path: '/user' },
    {icon: 'ReconciliationOutlined', path: '/cranetype' },
    {icon: 'ProfileOutlined', path: '/logger' },
    {icon:'ProfileOutlined',path:'/taskmanage'}
   
    ]
let menus: Details[] = [];
menus=curMenus.map(item=>{
    let {icon}=icons.filter(k=>k.path==item.path)[0]
    return {
        title: item.meta.title, key: item.path, icon: icon, path: item.path
    }
})

let selectedKeys = ref<string[]>([route.path]);
let collapsed = ref<boolean>(false);
let openKeys = ref<string[]>(['sub1']);

const menuChange: MenuProps['onClick'] = menuInfo => {
    if (menuInfo.key != route.path) {
        router.push({ path: menuInfo.key as string })
    }
}
watch(
    () => route.path,
    () => {
        if (route.path == '/login') return false

        selectedKeys.value = [route.path]
    },
    {
        immediate: true
    }
)

</script>

<style scoped ></style>