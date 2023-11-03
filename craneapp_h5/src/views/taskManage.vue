<template>
  <div class="content">
    <a-form
      :model="searchData"
      labelAlign="right"
      :label-col="{ width: 70 }"
      :wrapper-col="{ span: 12 }"
      class="form-wrap"
      :labelWrap=true
    >
      <a-form-item label="车型" name="craneType">
        <a-select
          v-model:value="searchData.craneType"
          show-search
          placeholder="请选择车型"
          :options="craneTypeOptions"
          :filter-option="filterOption"
          name="craneType"
        >
        </a-select>
      </a-form-item>
      <a-form-item label="终端号" name="tonnage">
        <a-input v-model:value="searchData.terminalsNo" />
      </a-form-item>

      <a-form-item label="升级状态" name="systemType">
        <a-select
          v-model:value="searchData.upgradeStatus"
          show-search
          placeholder="请选择系统类型"
          :options="upgradeStatusOptions"
          :filter-option="filterOption"
          name="systemType"
        >
        </a-select>
      </a-form-item>
      <a-form-item label="操作人" name="tonnage">
        <a-input v-model:value="searchData.operator" />
      </a-form-item>
      <a-form-item label="时间范围" name="tonnage">
        <a-space>
          <a-range-picker
            style="width: 220px"
            class="mr-20"
            v-model="rangeTime"
            :disabled-date="disabledDate"
            :placeholder="['开始时间', '结束时间']"
            dropdownClassName="sany-drop"
          />
          <a-select
            v-model:value="fastTime"
            placeholder="快捷时间"
            :options="fastTimeOptions"
            :filter-option="filterOption"
          >
          </a-select>
        </a-space>
      </a-form-item>
    </a-form>
    <div class="flex flex-end query_btn"><a-button type="primary" @click="taskQuery"> 查询 </a-button></div>
    <a-divider />

    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: (selectedRowKeys: Key[], selectedRows: Table[]) => onSelectChange(selectedRowKeys, selectedRows) }"
      :columns="columns"
      :data-source="tableData"
      :rowKey="(record: Table) => { return record.id }"
      :bordered=true
      :scroll="{ y: 'calc(87.9vh - 150px)' }"
      :pagination="{ defaultPageSize: 8 }"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'action'">
          <a-button type="primary" size="small" style="font-size: 14px" @click="loggerHandle"
            ><span style="font-size: 12px">日志</span></a-button
          >
        </template>
      </template>
    </a-table>
    <!-- 日志 -->
    <a-modal
      centered
      v-model:visible="visible"
      title="查看日志任务"
      @cancel=""
      cancelText="关闭"
      :ok-button-props="{ style: { display: 'none' } }"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
    >
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="升级进度日志">
          <div class="h-300">
            <div>任务编号：xxxx</div>
            <div class="log">
                <p>升级包名称：x</p>
            <p>升级类型：xx</p>
            <p>上传时间：xxx</p>
            <p>上传人：xxx</p>
            <p>版本号：xx</p>
            <p>归属：xxx</p>
            <p>说明:xx</p>
            <p>升级类型：xx</p>
            <p>上传时间：xxx</p>
            <p>上传人：xxx</p>
            <p>版本号：xx</p>
            <p>归属：xxx</p>
            <p>说明:xx</p>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="程序版本内容" force-render>
          <div class="h-300">
            <p>升级包名称：x</p>
            <p>升级类型：xx</p>
            <p>上传时间：xxx</p>
            <p>上传人：xxx</p>
            <p>版本号：xx</p>
            <p>归属：xxx</p>
            <p>说明:xx</p>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { SelectProps } from 'ant-design-vue';
import { UnwrapRef, onMounted, reactive, ref } from 'vue';
import { getTypes,  } from '@/api/program/index';
import moment from 'moment';

interface SearchData {
  craneType: string | null;
  terminalsNo: string | null;
  upgradeStatus: string | null;
  rangeTime: [];
  operator:string;
}
interface Table {
  id: number | string;
  index: number;
  craneType: string;
  terminalsNo: string;
  upgradeVersionNo: string;
  upgradeStatus: string;
  upgradeProcess: string;
  operator: string;
  allots: string;
}

type Key = string | number;
let searchData = ref<SearchData>({
  craneType: '',
  terminalsNo: '',
  upgradeStatus: '',
  rangeTime: [],
   operator:'',
});
const  upgradeStatusOptions = ref<SelectProps['options']>([]);
const craneTypeOptions = ref<SelectProps['options']>([]);
let fastTime=''
const fastTimeOptions = ref<SelectProps['options']>([
  { label: '最近七天', value: '最近七天' },
  { label: '最近一月', value: '最近一月' },
]);
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
//查询按钮事件

const taskQuery= () => {
  //查询请求
  // const {systemType,deviceType,copyType,partType,tonnage,programType}=searchData.value
  let data = { ...searchData.value };

};
//日志事件
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const loggerHandle = () => {
  visible.value = true;
};

//table相关
let tableData = ref<Table[]>([
  {
    id: 1,
    index: 1,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 2,
    index: 2,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 3,
    index: 3,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 4,
    index: 4,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 5,
    index: 5,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 6,
    index: 6,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 7,
    index: 7,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 8,
    index: 8,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 9,
    index: 9,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 10,
    index: 10,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
  {
    id: 11,
    index: 11,
    craneType: 'scc',
  terminalsNo: 'vsfaf',
  upgradeVersionNo: 'dsfaf',
  upgradeStatus: 'fdawwe',
  upgradeProcess: 'rqe',
  operator: 'wtqta',
  allots: 'jrjyt',
  },
]);
let selectedRowKeys = ref<Key[]>([]);
let selectedRows = ref<Table[]>([]);
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',

    // customRender: (text, record) => <Tooltip placement="topLeft" title={record.index} >{record.index}</Tooltip>
  },
  {
    title: '车型',
    dataIndex: 'craneType',
    align: 'center',
  },
  {
    title: '终端号',
    dataIndex: 'terminalsNo',
    align: 'center',
  },
  {
    title: '升级版本号',
    dataIndex: 'upgradeVersionNo',
    align: 'center',
  },
  {
    title: '升级状态',
    dataIndex: 'upgradeStatus',
    align: 'center',
  },
  {
    title: '升级进度',
    dataIndex: 'upgradeProcess',
    align: 'center',
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    align: 'center',
  },
  {
    title: '下发时间',
    dataIndex: 'allotsTime',
    align: 'center',
  },

  {
    title: '日志',
    dataIndex: 'action',
    align: 'center',
  },
];
//table事件
const onSelectChange = (selected: Key[], selectedrows: Table[]) => {
  selectedRowKeys.value = selected;
  selectedRows.value = selectedrows;
};
//日志
const activeKey = ref('1');


const disabledDate = (current) => {
  return current < moment('2023-07-31').endOf('day') || current > moment().add(0, 'day').endOf('day');
};

const rangeTime = ref(null);
onMounted(() => {
  rangeTime.value = [moment().add(-7, 'day'), moment().add(-1, 'day')];
});
</script>
<style lang="less" scoped>
.content {
  box-sizing: border-box;
}

.form-wrap {
  display: grid;
  //grid-template-columns: repeat(auto-fill, 300px);
  grid-template-columns: 24% 24% 24% 24%;
  column-gap: 1%;
  row-gap: 0%;
}

.query_btn {
  margin-top: -24px;
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

:deep(.ant-upload-text-icon) {
  display: none;
}

:deep(.ant-upload-list) {
  margin-left: 10px;
}

.h-300 {
  height: 300px;
}
.log{
    margin-top: 16px;
    height: 270px;
    overflow-y: auto;
}
</style>
