<template>
  <div class="content">
    <a-form
      :model="searchData"
      labelAlign="right"
      :label-col="{ width: 70 }"
      :wrapper-col="{ span: 12 }"
      :labelWrap="true"
    >
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="时间范围" name="time" >
            <a-form-item name="rangeTime">
              <a-range-picker
                style="width: 220px; margin-right: 20px"
                v-model:value="searchData.rangeTime"
                :disabled-date="disabledDate"
                :placeholder="['开始时间', '结束时间']"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>
            <a-form-item name="fastTime">
              <a-select
                v-model:value="searchData.fastTime"
                placeholder="快捷时间"
                :options="fastTimeOptions"
                :filter-option="filterOption"
              >
              </a-select>
            </a-form-item>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="操作模块" name="operateModule">
            <a-select
              v-model:value="searchData.operateModule"
              show-search
              placeholder="请选择操作模块"
              :options="loggerModuleOptions"
              :filter-option="filterOption"
              name="operateModule"
            >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="操作类型" name="operateType">
            <a-select
              v-model:value="searchData.operateType"
              show-search
              placeholder="请选择操作类型"
              :options="loggerTypeOptions"
              :filter-option="filterOption"
              name="operateType"
            >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-button type="primary" @click="loggerQuery" class="flex flex-end query_btn"> 查询 </a-button>
    <a-divider />
    <a-button type="primary" @click="exportHandle" class="flex flex-end mb-16">导出</a-button>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: (selectedRowKeys: Key[], selectedRows: Table[]) => onSelectChange(selectedRowKeys, selectedRows) }"
      :columns="columns"
      :data-source="tableData"
      :rowKey="(record: Table) => { return record.id }"
      :scroll="{ y: 'calc(87.9vh - 150px)' }"
      :bordered="true"
      :pagination="{ defaultPageSize: 8 }"
    >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex == 'operateDetail'">
        <a-tooltip placement="topLeft" :title="text">
          <div class="multi-ellipsis">{{ text }}</div>
        </a-tooltip>
      </template>
  </template></a-table>
  </div>
</template>
<script setup lang="ts">
import { SelectProps } from 'ant-design-vue';
import {  onMounted, ref, watch,  } from 'vue';
import moment from 'moment';
import { excelDownload } from '@/utils/excelWaterMaker';
import Storage from '@/utils/Storage';
import { logManangement } from '@/api/logger';

interface SearchData {
  rangeTime?: any;
  operateType?: string;
  operateModule?:string;
  fastTime?: string;

}
interface Table {
  id: number | string;
  index: number;
  operateType: string;
  operateTime: string;
  operator: string;
  operateDetail: string;
}

type Key = string | number;
let searchData = ref<SearchData>({
  rangeTime:[],
  fastTime:'7'
});
const fastTimeOptions = ref<SelectProps['options']>([
  { label: '最近7天', value: '7' },
  { label: '最近15天', value: '15' },
  { label: '最近30天', value: '30' },
]);
const loggerTypeOptions = ref<SelectProps['options']>([
  { label: '新增', value: '新增' },
  { label: '删除', value: '删除' },
]);
const loggerModuleOptions=ref<SelectProps['options']>([
  { label: '程序管理', value: '程序管理' },
  { label: '车型管理', value: '车型管理' },
  { label: '用户管理', value: '用户管理' },
])

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
//日志查询按钮事件
const loggerQuery = () => {
  //查询请求
  let {rangeTime,operateType,operateModule} =searchData.value;
  let start_time= rangeTime[0].split(' ')[0]+' 00:00:00'   
  let end_time=rangeTime[1]
  let data={
    type:2 as const,
    operate_type: operateType,
    operate_module:operateModule,
    start_time,
    end_time,
  }
  logManangement(data).then(res=>{
    res.data.sort((a,b)=>{
        let aDay=(a.operate_time.split(' ')[0]).split('-').join('')
        let aHours=a.operate_time.split(' ')[1].split(':').join('')
        let aNumber=Number(aDay+aHours+'')
        let bDay=(b.operate_time.split(' ')[0]).split('-').join('')
        let bHours=b.operate_time.split(' ')[1].split(':').join('')
        let bNumber=Number(bDay+bHours+'') 
        return bNumber - aNumber
    
    })
    tableData.value=res.data.map((item,index)=>{
      return {
        index:index+1,
        id:item.id,
        operateModule:item.operate_module,
        operateType:item.operate_type,
        operateTime:item.operate_time,
        operator:item.operator,
        operateDetail:item.operate_info
      }

    })
})
};
//日志类型查询
 const loggerTypeQuery=()=>{
  let data={
    type:1 as const
  }
  logManangement(data).then(res=>{
  loggerTypeOptions.value=res.data.map(item=>{
    return {
      label:item,
      value:item
    }
  })
  })
 }
//导出
const exportHandle = () => {
  let {rangeTime,operateType} =searchData.value;
  let start_time= rangeTime[0].split(' ')[0]+' 00:00:00'   
  let end_time=rangeTime[1]
  let data={
    type:3 as const,
    operate_type: operateType,
    start_time,
    end_time,
  }
  logManangement(data).then(res=>{
    let url=import.meta.env.VITE_DOWNLOAD_EXCELFILE_URL +res.data;
    let fileName=operateType||''+'日志_'+start_time.split(' ')[0]+'_'+end_time.split(' ')[0]
    
    excelDownload(url,fileName,Storage.get('USER_INFO').account,'导出中')
  })
};

//table相关
let tableData = ref<Table[]>([]);
let selectedRowKeys = ref<Key[]>([]);

let selectedRows = ref<Table[]>([]);
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 70,

    // customRender: (text, record) => <Tooltip placement="topLeft" title={record.index} >{record.index}</Tooltip>
  },
  {
    title: '操作模块',
    dataIndex: 'operateModule',
    align: 'center',
    width: 100,
  },
  {
    title: '操作类型',
    dataIndex: 'operateType',
    align: 'center',
    width: 100,
  },
 
  {
    title: '操作时间',
    dataIndex: 'operateTime',
    align: 'center',
    width: 150,
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    align: 'center',
    width: 140,
  },
  {
    title: '操作详情',
    dataIndex: 'operateDetail',
    align: 'center',
    // width: 400,
    scopedSlots: { customRender: 'operateDetail' },
  },
];
//table事件
const onSelectChange = (selected: Key[], selectedrows: Table[]) => {
  selectedRowKeys.value = selected;
  selectedRows.value = selectedrows;
};

const disabledDate = (current) => {
  return current < moment('2023-07-31').endOf('day') || current > moment().add(0, 'day').endOf('day');
};

onMounted(() => {
  searchData.value.rangeTime = [moment().add(-7, "day").format('YYYY-MM-DD HH:mm:ss'), moment().add(0, "day").format('YYYY-MM-DD HH:mm:ss')];
  loggerQuery()
  loggerTypeQuery()
});
watch(()=>searchData.value.fastTime,()=>{
 switch(searchData.value.fastTime){
  case '7':
  searchData.value.rangeTime=[moment().add(-7, "day").format('YYYY-MM-DD HH:mm:ss'), moment().add(0, "day").format('YYYY-MM-DD HH:mm:ss')];
  break
  case "15":
  searchData.value.rangeTime=[moment().add(-15, "day").format('YYYY-MM-DD HH:mm:ss'), moment().add(0, "day").format('YYYY-MM-DD HH:mm:ss')];
  break
  case "30":
  searchData.value.rangeTime=[moment().add(-30, "day").format('YYYY-MM-DD HH:mm:ss'), moment().add(0, "day").format('YYYY-MM-DD HH:mm:ss')];
  break

 }
}
 
)
</script>
<style lang="less" scoped>
.content {
  box-sizing: border-box;
}

.query_btn {
  margin-top: -24px;
}
.multi-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  cursor: pointer;
}

:deep(.ant-table) {
  font-size: 12px;
}
:deep(.ant-table-body) {
  height: calc(87.9vh - 380px);
}
:deep(.ant-pagination) {
  font-size: 12px;
  margin-bottom: 0;
}
</style>
