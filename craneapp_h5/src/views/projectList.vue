<template>
  <div class="bg">
    <div class="home">
      <img src="@/assets/images/favicon.ico" alt="" style="height: 4.8vw; width: 4.8vw; margin-top: -1vw" />
      三一数字化强夯施工管理系统
    </div>
    <p class="title">项目列表</p>
    <div class="card_info">
      <template v-for="item in projectList">
        <a-card style="width: 30vw; margin-left: 2vw; margin-top: 18px" @click="()=>projectDetail(item.projectId)">
          <p>{{ item.projectName }}</p>
        </a-card>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
interface projectDetail {
  projectId: string;
  projectName: string;
}

const projectList = ref<projectDetail[]>([]);
//
const projectDetail=(projectId:string)=>{
     console.log(projectId);
     // router.go({
     //      path:'/projectDetail'
     // })
   
}

onMounted(() => {
  //获取项目列表
  projectList.value = [
    {
      projectId: '1',
      projectName: '三一强夯数字化施工管理系统（宁波宏智1）',
    },
    {
      projectId: '2',
      projectName: '三一强夯数字化施工管理系统（宁波宏智化施工管理系化施工管理化施工管理系系化施工管理系化施工管理系化施工管理系）',
    },
    {
      projectId: '3',
      projectName: '三一强夯数字化施工管理系统（宁波宏智3）',
    },
    {
      projectId: '4',
      projectName: '三一强夯数字化施工管理系统（宁波宏智4）',
    },
    {
      projectId: '5',
      projectName: '三一强夯数字化施工管理系统（宁波宏智5）',
    },
    {
      projectId: '6',
      projectName: '三一强夯数字化施工管理系统（宁波宏智6）',
    },
  ];
});
</script>
<style lang="less">
.bg {
  background-color: rgba(236, 236, 236,0.15);
  height: 100vh;
  overflow: hidden;
  .home {
    margin-top: 5vh;
    text-align: center;
    font-size: 4.8vw;
    line-height: 1.5;
    font-weight: 600;
  }

  .title {
    margin-top: 16px;
    position: relative;
    padding-left: 10px;
    font-size: 4vw;
    font-weight:600;
    line-height: 24px;
  }
  .title::before {
    position: absolute;
    content: '';
    width: 4px;
    height: 24px;
    left: 0;
    bottom: 0;
    background-color: #056dff;
  }
  .card_info {

     font-size: 4vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    //   flex: 1;
  }
}
</style>
