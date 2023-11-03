<template>
  <div class="content">
    <a-form :model="searchData" labelAlign="right" :label-col="{ width: 70 }" :labelWrap="true">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="系统类型" name="systemType">
            <a-select
              v-model:value="searchData.systemType"
              show-search
              placeholder="请选择系统类型"
              :options="systemTypeOptions"
              :filter-option="filterOption"
              name="systemType"
            >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="设备类型" name="deviceType">
            <a-select
              v-model:value="searchData.deviceType"
              show-search
              placeholder="请选择设备类型"
              :options="deviceTypeOptions"
              :filter-option="filterOption"
              name="deviceType"
            >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="吨位" name="tonnage">
            <a-input v-model:value="searchData.tonnage" placeholder="请输入吨位" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="地区" name="area">
            <a-input v-model:value="searchData.area" placeholder="请输入地区" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="车型" name="craneType">
            <!-- <a-input v-model:value="searchData.craneType" placeholder="请输入车型" /> -->
            <!-- <a-select
          v-model:value="searchData.craneType"
          show-search
          placeholder="请输入车型"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          :options="craneTypeOptions"
          @search="handleSearch"
          @change="handleChange"
          dropdownClassName="sany_program"
        ></a-select> -->
            <!-- <a-tree-select
          tree-checkable
          v-model:value="searchData.craneType"
          show-search
          :maxTagCount="1"
          :dropdown-style="{ maxHeight: '150px', overflow: 'auto' }"
          placeholder="请选择车型"
          allow-clear
          :tree-default-expand-all="false"
          :tree-data="treeData"
          :field-names="{
            children: 'children',
            label: 'name',
            value: 'value',
          }"
          tree-node-filter-prop="name"
        ></a-tree-select> -->
            <a-cascader
              v-model:value="searchData.craneType"
              :options="treeData"
              :show-search="{}"
              placeholder="请选择车型"
              :multiple="true"
              :maxTagCount="3"
            >
            </a-cascader>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-button type="primary" @click="craneTypeQuery" class="flex flex-end query_btn"> 查询 </a-button>
    <a-divider />
    <div class="flex flex-end mb-16">
      <a-space size="middle">
        <a-button type="primary" @click="addHandle">新增</a-button>
        <a-button type="primary" @click="exportHandle">导出</a-button>
        <a-upload
          name="file"
          :showUploadList="false"
          :before-upload="beforeUpload"
          class="importbtn"
          accept=".xls,.xlsx,.csv."
        >
          <a-button type="primary">
            <!-- <upload-outlined></upload-outlined> -->
            导入数据
          </a-button>
        </a-upload>

        <a @click="download" class="a_text">下载导入模板</a>
      </a-space>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: (selectedRowKeys: Key[], selectedRows: Table[]) => onSelectChange(selectedRowKeys, selectedRows) }"
      :columns="columns"
      :data-source="tableData"
      :rowKey="(record: Table) => { return record.id }"
      :scroll="{ y: 'calc(87.9vh - 400px)' }"
      ::bordered="true"
      :pagination="{ defaultPageSize: 8 }"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'action'">
          <a-space size="middle" v-if="editableData[record.id]">
            <a @click="save(record.id)">保存</a>
            <a @click="cancel(record.id)">取消</a>
          </a-space>
          <a-space size="large" v-else>
            <a @click="edit(record.id)">修改</a>
            <!-- <a @click="deleteHandle(record.id)">删除</a> -->
            <a-popconfirm title="确认删除？" @confirm="deleteHandle(record.id)">
              <template #icon><question-circle-outlined style="color: red" /></template>
              <a>删除</a>
            </a-popconfirm>
          </a-space>
        </template>
        <template v-if="['systemType', 'deviceType', 'tonnage', 'area', 'remarks'].includes(column.dataIndex)">
          <div>
            <a-select
              v-if="editableData[record.id] && column.dataIndex == 'systemType'"
              v-model:value="editableData[record.id][column.dataIndex]"
              placeholder="请选择系统类型"
              :options="systemTypeOptions.slice(1)"
              :filter-option="filterOption"
              name="systemType"
            >
            </a-select>
            <a-select
              v-else-if="editableData[record.id] && column.dataIndex == 'deviceType'"
              v-model:value="editableData[record.id][column.dataIndex]"
              placeholder="请选择设备类型"
              :options="deviceTypeOptions.slice(1)"
              :filter-option="filterOption"
              name="deviceType"
              :dropdownStyle="{ width: '220px' }"
            >
            </a-select>
            <a-textarea
              v-else-if="editableData[record.id] && column.dataIndex == 'remarks'"
              v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0; font-size: 8px"
              :rows="1"
            ></a-textarea>
            <a-input
              v-else-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
      </template>
    </a-table>
    <!-- 新增 -->
    <a-modal
      centered
      v-model:visible="newVisible"
      title="新增车型"
      @ok="add_modalok"
      @cancel="add_modalcancel"
      okText="保存"
      cancelText="取消"
      :confirm-loading="new_confirmLoading"
      :maskClosable="false"
      width="max(50%,600px)"
    >
      <a-form :model="newCraneTypeData" labelAlign="right" :label-col="{ width: 90 }" :labelWrap="true">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="系统类型" name="systemType">
              <a-select
                v-model:value="newCraneTypeData.systemType"
                show-search
                placeholder="请选择系统类型"
                :options="systemTypeOptions.slice(1)"
                :filter-option="filterOption"
                name="systemType"
              >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="设备类型" name="deviceType">
              <a-select
                v-model:value="newCraneTypeData.deviceType"
                show-search
                placeholder="请选择设备类型"
                :options="deviceTypeOptions.slice(1)"
                :filter-option="filterOption"
                name="deviceType"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="吨位" name="tonnage">
              <a-input v-model:value="newCraneTypeData.tonnage" placeholder="请输入吨位" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="车型" name="craneType">
              <a-input v-model:value="newCraneTypeData.craneType" placeholder="请输入车型" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="地区" name="area">
              <a-input v-model:value="newCraneTypeData.area" placeholder="请输入地区" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="说明" name="remarks">
          <a-textarea v-model:value="newCraneTypeData.remarks" placeholder="请填写备注信息" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { UnwrapRef, onMounted, reactive, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { craneManage } from '@/api/cranetype';
import { useBaseType } from '@/store/modules/typeOptions';
import { TreeSelectProps, message } from 'ant-design-vue';
import { excelDownload } from '@/utils/excelWaterMaker';
import { logger } from '@/utils/logger';
import Storage from '@/utils/Storage';
import { getSelectCraneType } from '@/utils/util';
import { fileUpload } from '@/api/program';
interface SearchData {
  systemType?: string;
  deviceType?: string;
  tonnage?: string;
  craneType?: string[];
  area?: string;
}
interface Table {
  id: number | string;
  index: number;
  systemType?: string;
  deviceType: string;
  tonnage: string;
  craneType: string;
  area: string;
  remarks: string;
}

interface NewCraneTypeParams {
  systemType: string;
  deviceType: string;
  tonnage: string;
  craneType: string;
  area: string;
  remarks: string;
}
type Key = string | number;
let login_name = Storage.get('USER_INFO').account;
let searchData = ref<SearchData>({
  systemType: '全部',
  deviceType: '全部',
  tonnage: undefined,
  craneType: [],
  area: undefined,
});
const store = useBaseType();
const systemTypeOptions = store.getTypeOptions('systemType');
const deviceTypeOptions = store.getTypeOptions('deviceType');
const craneTypeOptions = ref([]);

//下拉框数据过滤事件
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
//车型远程搜索
let timeout, currentValue;
const handleChange = (value) => {
  searchData.value.craneType = value;
  getAllCraneType(value);
};
const handleSearch = (val) => {
  getAllCraneType(val);
};
const getAllCraneType = (val) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = val;
  console.log(searchData.value.craneType);
  function getFetch() {
    craneManage({ type: 2 }).then((res) => {
      if (currentValue === val) {
        let data = res.data.filter((item) => item.toLowerCase().indexOf(val) != -1);
        craneTypeOptions.value = data.map((k) => {
          return {
            label: k,
            value: k,
          };
        });
      }
    });
  }
  timeout = setTimeout(getFetch, 300);
};
//查询按钮事件
const craneTypeQuery = () => {
  //查询请求
  let { systemType, deviceType, tonnage, craneType, area } = searchData.value;
  getTableData(
    systemType == '全部' ? '' : systemType,
    deviceType == '全部' ? '' : deviceType,
    tonnage,
    craneType == undefined ? [] : craneType,
    area,
  );
};
const getTableData = (systemType, deviceType, tonnage, craneType, area) => {
  let craneTypeArr = getSelectCraneType(craneType,treeData.value)
  let data = {
    type: 5 as 5,
    system_type: systemType,
    equipe_type: deviceType,
    tonnage: tonnage,
    car_type: craneTypeArr.join(','),
    area: area,
  };
  craneManage(data).then((res) => {
    tableData.value = res.data.map((item, index) => {
      return {
        id: item.id,
        index: index + 1,
        systemType: item.system_type,
        deviceType: item.equipe_type,
        tonnage: item.tonnage,
        craneType: item.car_type,
        area: item.area,
        remarks: item.annotation,
      };
    });
  });
};
//新增事件
const newCraneTypeData = ref<NewCraneTypeParams>({
  systemType: undefined,
  deviceType: undefined,
  tonnage: '',
  craneType: '',
  area: '',
  remarks: '',
});
const newVisible = ref<boolean>(false);
const new_confirmLoading = ref<boolean>(false);
const addHandle = () => {
  newVisible.value = true;
};
const add_modalok = () => {
  //数据校验
  let { systemType, deviceType, tonnage, craneType, area, remarks } = newCraneTypeData.value;
  if (systemType == '' || systemType == undefined) return message.warn('请选择系统类型');
  if (deviceType == '' || deviceType == undefined) return message.warn('请选择设备类型');
  if (tonnage.trim() == '') return message.warn('请输入吨位');
  if (craneType.trim() == '') return message.warn('请输入车型');
  if (area.trim() == '') return message.warn('请输入地区');
  if (remarks.trim() == '') return message.warn('请输入说明');
  let data = {
    type: 0 as 0,
    system_type: systemType,
    equipe_type: deviceType,
    tonnage: tonnage,
    car_type: craneType,
    area: area,
    annotation: remarks,
  };
  new_confirmLoading.value = true;
  craneManage(data)
    .then((res) => {
      if (res.message == '添加成功') {
        message.success(res.message);
        //初始化
        newCraneTypeData.value = {
          systemType: undefined,
          deviceType: undefined,
          tonnage: '',
          craneType: '',
          area: '',
          remarks: '',
        };
        craneTypeQuery();
        //日志记录
        let info = {
          deviceType,
          tonnage,
          craneType,
        };
        logger('新增', '车型管理', info);
      } else {
        message.info(res.message);
      }
    })
    .finally(() => {
      getCraneTreeData();
      new_confirmLoading.value = false;
      newVisible.value = false;
    });
};
const add_modalcancel = () => {};

//导出
const exportHandle = () => {
  let { systemType, deviceType, tonnage, craneType, area } = searchData.value;
  let data = {
    type: 6 as 6,
    system_type: systemType == '全部' || systemType == 'undefined' ? '' : systemType,
    equipe_type: deviceType == '全部' || deviceType == 'undefined' ? '' : deviceType,
    tonnage,
    car_type: craneType.join(',') || null,
    area,
    id: selectedRowKeys.value.length == 0 ? undefined : selectedRowKeys.value.join(','),
  };

  craneManage(data)
    .then((res) => {
      if (res.data) {
        let file_name = `车型管理`;
        let url = import.meta.env.VITE_DOWNLOAD_EXCELFILE_URL + res.data;
        excelDownload(url, file_name, login_name, '导出中');
        logger('导出', '车型管理', '导出车型数据');
      } else {
        message.warn(res.message);
      }
    })
    .finally(() => {});
};
//导入
const beforeUpload = (file, fileList) => {
  let formData = new FormData();
  for (let file of fileList) {
    formData.append('files', file);
  }
  fileUpload(formData).then((res) => {
    if (res.code == 200) {
      craneManage({
        type: 4 as const,
        file: res.data,
      })
        .then((response) => {
          message.info(response.message || '导入成功');
          if (response.code == 200 && response.data && response.data.length) {
            logger('导入', '车型管理', response.data);
          }
        })
        .finally(() => {
          getCraneTreeData();
          craneTypeQuery();
        });
    }
  });
  return false;
};
//下载导入模板
const download = () => {
  let url = import.meta.env.VITE_DOWNLOAD_EXCELFILE_URL + 'template.xlsx';
  excelDownload(url, '导入模板', login_name, '下载中');
  // message.destroy()
};

//table相关
let tableData = ref<Table[]>([]);
let selectedRowKeys = ref<Key[]>([]);
const editableData: UnwrapRef<Record<string, Table>> = reactive({});
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
    title: '系统类型',
    dataIndex: 'systemType',
    align: 'center',
    width: 150,
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    align: 'center',
    width: 150,
  },
  {
    title: '吨位',
    dataIndex: 'tonnage',
    align: 'center',
    width: 150,
  },
  {
    title: '车型',
    dataIndex: 'craneType',
    align: 'center',
    width: 180,
  },
  {
    title: '地区',
    dataIndex: 'area',
    align: 'center',
    width: 150,
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    align: 'center',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 350,
  },
];
//table事件
const onSelectChange = (selected: Key[], selectedrows: Table[]) => {
  selectedRowKeys.value = selected;
  selectedRows.value = selectedrows;
};
const edit = (key) => {
  editableData[key] = cloneDeep(tableData.value.filter((item) => key === item.id)[0]);
};
const save = (key) => {
  let { id, systemType, deviceType, tonnage, craneType, area, remarks } = editableData[key];
  let preCarInfo = { ...tableData.value.filter((item) => key === item.id)[0] };
  Object.assign(tableData.value.filter((item) => key === item.id)[0], editableData[key]);
  //这里发送保存请求
  let data = {
    type: 1 as 1,
    id: id,
    system_type: systemType,
    equipe_type: deviceType,
    tonnage: tonnage,
    car_type: craneType,
    area: area,
    annotation: remarks,
  };
  craneManage(data)
    .then((res) => {
      if (res.message == '修改成功') {
        message.success(res.message);
        craneTypeQuery();
        //日志
        let info = {
          craneType:'',
          desc: [],
          preinfo: [],
          curinfo: [],
        };
        info.craneType=data.car_type
        if (preCarInfo.systemType != data.system_type) {
          info.desc.push('系统类型');
          info.preinfo.push(preCarInfo.systemType);
          info.curinfo.push(data.system_type);
        }
        if (preCarInfo.deviceType != data.equipe_type) {
          info.desc.push('设备类型');
          info.preinfo.push(preCarInfo.deviceType);
          info.curinfo.push(data.equipe_type);
        }
        if (preCarInfo.tonnage != data.tonnage) {
          info.desc.push('吨位');
          info.preinfo.push(preCarInfo.tonnage);
          info.curinfo.push(data.tonnage);
        }
        if (preCarInfo.area != data.area) {
          info.desc.push('地区');
          info.preinfo.push(preCarInfo.area);
          info.curinfo.push(data.area);
        }
        if (preCarInfo.remarks != data.annotation) {
          info.desc.push('备注');
          info.preinfo.push(preCarInfo.remarks);
          info.curinfo.push(data.annotation);
        }

       if(info.desc.length) logger('修改', '车型管理', info);
      } else {
        message.info(res.message);
      }
    })
    .finally(() => {
      delete editableData[key];
    });
};
const cancel = (key) => {
  delete editableData[key];
};
//删除
const deleteHandle = (id) => {
  let data = {
    type: 3 as 3,
    id: id,
  };
  let deleteInfo = { ...tableData.value.filter((item) => id === item.id)[0] };
  craneManage(data)
    .then((res) => {
      if (res.message == '删除成功') {
        message.success(res.message);
        craneTypeQuery();
        let info = {
          craneType: deleteInfo.craneType,
          deviceType: deleteInfo.deviceType,
          systemType: deleteInfo.systemType,
        };
        logger('删除', '车型管理', info);
      } else {
        message.info(res.message);
      }
    })
    .finally(() => {
      getCraneTreeData();
    });
};

const treeData = ref<TreeSelectProps['treeData']>([]);
//车型数据结构转换
const getCraneTreeData = () => {
  treeData.value = [];
  craneManage({
    type: 5,
    system_type: null,
    equipe_type: null,
    tonnage: null,
    car_type: null,
    area: null,
  }).then((res) => {
    let craneTypeData = res.data.map((item) => {
      return {
        craneType: item.car_type,
        deviceType: item.equipe_type,
        tonnage: item.tonnage,
      };
    });
    treeData.value = arrayToTree(craneTypeData);
  });
};
const arrayToTree = (list) => {
  let result = [];
  let itemMap = {};
  let deviceTypeArr = [];
  for (let item of list) {
    let { tonnage, deviceType, craneType } = item;
    deviceTypeArr.push(deviceType);
    if (!itemMap[`${deviceType}-${tonnage}`]) {
      itemMap[`${deviceType}-${tonnage}`] = {
        label: tonnage + '吨',
        value: tonnage,
        children: [],
      };
    }
    itemMap[`${deviceType}-${tonnage}`]['children'].push({ label: craneType, value: craneType });
  }
  deviceTypeArr = Array.from(new Set(deviceTypeArr));
  deviceTypeArr.forEach((deviceType) => {
    let obj = {
      label: deviceType,
      value: deviceType,
      children: [],
    };
    for (let k of Object.keys(itemMap)) {
      if (k.indexOf(deviceType) != -1) obj.children.push(itemMap[k]);
    }
    result.push(obj);
  });
  return result;
};

onMounted(() => {
  craneTypeQuery();
  getCraneTreeData();
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
  margin-top: -40px;
}

.a_text {
  font-size: 10px;
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
