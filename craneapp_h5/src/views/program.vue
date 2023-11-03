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
          <a-form-item label="备份类型" name="copyType">
            <a-select
              v-model:value="searchData.copyType"
              show-search
              placeholder="请选择备份类型"
              :options="copyTypeOptions"
              :filter-option="filterOption"
              name="copyType"
            >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="部件类型" name="partType">
            <a-select
              v-model:value="searchData.partType"
              show-search
              placeholder="请选择部件类型"
              :options="partTypeOptions"
              :filter-option="filterOption"
              name="partType"
              dropdownClassName="sany_program"
            >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="程序类型" name="programType">
            <a-select
              v-model:value="searchData.programType"
              show-search
              placeholder="请选择程序类型"
              :options="programTypeOptions"
              :filter-option="filterOption"
              name="programType"
            >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="车型" name="craneType">
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
    <div class="flex flex-end query_btn"><a-button type="primary" @click="programQuery"> 查询 </a-button></div>
    <a-divider />
    <div class="flex flex-end mb-16">
      <a-space size="middle">
        <a-button type="primary" @click="addHandle">新增</a-button>
        <a-button type="primary" @click="download">导出</a-button>
        <a-button type="primary" @click="deleteHandle">删除</a-button>
      </a-space>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: (selectedRowKeys: Key[], selectedRows: Table[]) => onSelectChange(selectedRowKeys, selectedRows) }"
      :columns="columns"
      :data-source="tableData"
      :rowKey="(record: Table) => { return record.id }"
      :scroll="{ x: 1850, y: 'calc(87.9vh - 410px)' }"
      :bordered="true"
      :pagination="{ defaultPageSize: 8 }"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'action'">
          <a-space size="middle" v-if="editableData[record.id]">
            <a @click="save(record.id)">保存</a>
            <a @click="cancel(record.id)">取消</a>
          </a-space>
          <a-space size="small" v-else>
            <a @click="downloadCurrentVersion(record)">下载</a>
            <a @click="edit(record.id)">编辑</a>
            <a @click="updateVersion(record)">更新</a>
            <a @click="getHistoryVersion(record.id)">历史版本</a>
          </a-space>
        </template>
        <template v-if="column.dataIndex == 'remarks'">
          <div>
            <a-textarea
              v-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0; font-size: 8px"
              :rows="1"
            ></a-textarea>
            <template v-else>
              <a-tooltip placement="topLeft" :title="text">
                <div class="multi-ellipsis">{{ text }}</div>
              </a-tooltip>
            </template>
          </div>
        </template>
        <template v-if="column.dataIndex == 'supportCrane'">
          <a-tooltip placement="topLeft" :title="text">
            <div class="multi-ellipsis">{{ text }}</div>
          </a-tooltip>
        </template>
      </template>
    </a-table>
    <!-- 新增 -->
    <a-modal
      centered
      v-model:visible="newVisible"
      title="上传新程序"
      @ok="add_modalok"
      @cancel="add_modalcancel"
      okText="保存"
      cancelText="取消"
      :confirm-loading="new_confirmLoading"
      :maskClosable="false"
      width="max(50%,600px)"
    >
      <a-form :model="newProgramData" labelAlign="right" :label-col="{ width: 90 }" :labelWrap="true">
        <a-form-item label="版本号" name="version">
          <a-form-item-rest>
            <a-space>
              <a-input-number v-model:value="newProgramData.version_x" :min="0" :max="100000" />.
              <a-input-number v-model:value="newProgramData.version_y" :min="0" :max="100000" />.
              <a-input-number v-model:value="newProgramData.version_z" :min="0" :max="100000" />
            </a-space>
          </a-form-item-rest>
        </a-form-item>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="系统类型" name="systemType">
              <a-select
                v-model:value="newProgramData.systemType"
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
                v-model:value="newProgramData.deviceType"
                show-search
                placeholder="请选择设备类型"
                :options="deviceTypeOptions.slice(1)"
                :filter-option="filterOption"
                name="copyType"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="备份类型" name="copyType">
              <a-select
                v-model:value="newProgramData.copyType"
                show-search
                placeholder="请选择备份类型"
                :options="copyTypeOptions.slice(1)"
                :filter-option="filterOption"
                name="copyType"
              >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="部件类型" name="partType">
              <a-select
                v-model:value="newProgramData.partType"
                show-search
                placeholder="请选择部件类型"
                :options="partTypeOptions.slice(1)"
                :filter-option="filterOption"
                name="partType"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="程序类型" name="programType">
              <a-select
                v-model:value="newProgramData.programType"
                show-search
                placeholder="请选择程序类型"
                :options="programTypeOptions.slice(1)"
                :filter-option="filterOption"
                name="programType"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="适用车型" name="craneType">
          <div class="flex">
            <!-- <a-tree-select
              tree-checkable
              v-model:value="newProgramData.supportCrane"
              show-search
              style="width: 400px"
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
              v-model:value="newProgramData.supportCrane"
              :options="treeData"
              :show-search="{}"
              placeholder="请选择车型"
              :multiple="true"
              :maxTagCount="1"
              :style="{ width: '400px' }"
            >
            </a-cascader>
            <span class="span_text_crane">
              <a-tooltip placement="topRight" :title="newselectCraneType">
                已选车型：{{ newselectCraneType }}
              </a-tooltip>
            </span>
          </div>
        </a-form-item>
        <a-form-item label="镜像包" name="newProgramFiles">
          <a-upload
            :fileList="newProgramData.newProgramFiles"
            name="file"
            :multiple="true"
            :showUploadList="true"
            :before-upload="(file, fileList) => beforeUpload(file, fileList, 'add')"
            class="importbtn"
            accept=".rar,.zip"
            @change="(file) => fileChange(file, 'add')"
            :maxTagCount="5"
          >
            <a-button type="primary"> 选取文件 </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="说明" name="remarks">
          <a-textarea v-model:value="newProgramData.remarks" placeholder="请填写当前版本说明（必填）" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 更新程序 -->
    <a-modal
      centered
      v-model:visible="updateVisible"
      title="更新当前版本"
      @ok="update_modalok"
      @cancel="update_modalcancel"
      okText="更新"
      cancelText="取消"
      :confirm-loading="update_confirmLoading"
      :maskClosable="false"
      width="max(50%,600px)"
    >
      <a-form :model="updateParams" labelAlign="right" :label-col="{ width: 70 }" :labelWrap="true">
        <a-form-item label="版本号" name="version">
          <a-form-item-rest>
            <a-space>
              <a-input-number
                v-model:value="updateParams.version_x"
                :min="updateParams.currentVersion.split('.')[0]"
                :max="100000"
              />.
              <a-input-number
                v-model:value="updateParams.version_y"
                :min="updateParams.currentVersion.split('.')[1]"
                :max="100000"
              />.
              <a-input-number
                v-model:value="updateParams.version_z"
                :min="updateParams.currentVersion.split('.')[2]"
                :max="100000"
              />
            </a-space>
          </a-form-item-rest>
          <span class="span_text">上版本版本号：V{{ updateParams.currentVersion }}</span>
        </a-form-item>
        <a-form-item label="适用车型" name="craneType">
          <div class="flex">
            <!-- <a-tree-select
              tree-checkable
              v-model:value="updateParams.currentChecked"
              show-search
              style="width: 400px"
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
              v-model:value="updateParams.currentChecked"
              :options="treeData"
              :show-search="{}"
              placeholder="请选择车型"
              :multiple="true"
              :maxTagCount="1"
              :style="{ width: '400px' }"
            >
            </a-cascader>
            <span class="span_text_crane">
              <a-tooltip>
                <template #title>{{ updateParams.craneType.join(',') }}</template>
                上版本适用车型：{{ updateParams.craneType.join(',') }}
              </a-tooltip>
            </span>
          </div>
          <!-- v-if="updateParams.currentChecked" -->
          <span class="span_text_current" v-if="updateParams.currentChecked.length">
            <a-tooltip>
              <template #title>{{ updateselectCraneType }}</template>
              已选车型：{{ updateselectCraneType }}
            </a-tooltip>
          </span>
        </a-form-item>
        <a-form-item label="更新文件" name="updateFiles">
          <a-upload
            :fileList="updateParams.updateFiles"
            name="file"
            :multiple="true"
            :showUploadList="true"
            :before-upload="(file, fileList) => beforeUpload(file, fileList, 'update')"
            class="importbtn"
            accept=".rar,.zip"
            @change="(file) => fileChange(file, 'update')"
            :maxTagCount="5"
          >
            <a-button type="primary"> 选取文件 </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="说明" name="remarks">
          <a-textarea
            v-model:value="updateParams.remarks"
            placeholder="请填写当前版本更改项，优化项（必填）"
            :rows="4"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 历史版本 -->
    <a-modal
      centered
      v-model:visible="historyVisible"
      title="历史版本"
      @cancel="history_modalcancel"
      cancelText="关闭"
      :confirm-loading="history_confirmLoading"
      :maskClosable="false"
      :ok-button-props="{ style: { display: 'none' } }"
      width="max(60%,600px)"
    >
      <div class="history_body">
        <div class="flex space-around histroy_modal">
          <div>包名称</div>
          <div>版本号</div>
          <div>适用车型</div>
          <div>说明</div>
          <div>操作</div>
        </div>
        <template v-for="(item, key) in histroyList">
          <div class="flex histroy_modal">
            <div>{{ item.packageName }}</div>
            <div>{{ item.version }}</div>
            <div>
              <a-tooltip :title="item.supportCrane" placement="topLeft">{{ item.supportCrane }}</a-tooltip>
            </div>
            <div>
              <a-tooltip :title="item.remarks" placement="topLeft">{{ item.remarks }}</a-tooltip>
            </div>
            <div><a @click="downloadHistory(item)">下载</a></div>
          </div>
        </template>
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { SelectProps, message } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';
import { UnwrapRef, onMounted, reactive, ref, unref, watch } from 'vue';
import { fileUpload, programManage } from '@/api/program/index';
import { useBaseType } from '@/store/modules/typeOptions';
import { craneManage } from '@/api/cranetype';
import type { TreeSelectProps } from 'ant-design-vue';
import { debounce, downloadUrl, fileToBlob, getSelectCraneType } from '@/utils/util';
import { logger } from '@/utils/logger';

import Storage from '@/utils/Storage';
import moment from 'moment';
import JSZip from 'JSZip';
import { excelDownload } from '@/utils/excelWaterMaker';

interface SearchData {
  systemType?: string | null;
  deviceType?: string | null;
  copyType?: string | null;
  partType?: string | null;
  programType?: string | null;
  tonnage?: string;
  craneType?: string[];
}
interface Table {
  id: number | string;
  index: number;
  version: string;
  packageName: string;
  systemName: string;
  deviceType: string;
  copyType: string;
  partType: string;
  programType: string;
  supportCrane: string;
  remarks: string;
  uploadTime: string;
  uploadPerson: string;
}
interface UpdateParams {
  id: null | number | string;
  version_x: number;
  version_y: number;
  version_z: number;
  currentVersion: string;
  currentChecked: string[];
  craneType: string[];
  updateFiles: any;
  remarks: string;
}
interface NewProgramParams {
  version_x: number | '';
  version_y: number | '';
  version_z: number | '';
  systemType: string;
  deviceType: string;
  copyType: string;
  partType: string;
  programType: string;
  supportCrane: string[];
  newProgramFiles: any;
  remarks: string;
}
type Key = string | number;
const userType = Storage.get('ROLETYPE');
const store = useBaseType();
let searchData = ref<SearchData>({
  systemType: '全部',
  deviceType: '全部',
  copyType: '全部',
  partType: '全部',
  programType: '全部',
  tonnage: '',
  craneType: [],
});
let systemTypeOptions = store.getTypeOptions('systemType');
let deviceTypeOptions = store.getTypeOptions('deviceType');
let copyTypeOptions = store.getTypeOptions('copyType');
let partTypeOptions = store.getTypeOptions('partType');
let programTypeOptions = store.getTypeOptions('programType');
let craneTypeOptions = ref<SelectProps['options']>([]);

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

//select筛选
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
//查询事件
const programQuery = () => {
  const { systemType, deviceType, copyType, partType, programType, craneType } = searchData.value;
  let craneTypeArr = getSelectCraneType(craneType, treeData.value);
  //查询请求
  let data = {
    type: 4 as 4,
    system_type: systemType == '全部' ? '' : systemType,
    equipe_type: deviceType == '全部' ? '' : deviceType,
    back_type: copyType == '全部' ? '' : copyType,
    component_type: partType == '全部' ? '' : partType,
    program_type: programType == '全部' ? '' : programType,
    application_car: craneTypeArr.join(','),
  };
  programManage(data).then((res) => {
    // return false;
    tableData.value = res?.data.map((item, index) => {
      return {
        index: index + 1,
        id: item.id,
        version: item.version,
        packageName: item.package_name,
        systemName: item.system_type,
        deviceType: item.equipe_type,
        copyType: item.back_type,
        partType: item.component_type,
        programType: item.program_type,
        supportCrane: item.application_car,
        remarks: item.annotation,
        uploadTime: item.upload_time,
        uploadPerson: item.upload_user,
        file: item.file,
      };
    });
  });
};

//新增事件
const newProgramData = ref<NewProgramParams>({
  version_x: 0,
  version_y: 0,
  version_z: 0,
  systemType: '',
  deviceType: '',
  copyType: '',
  partType: '',
  programType: '',
  supportCrane: [],
  newProgramFiles: [],
  remarks: '',
});
const newVisible = ref<boolean>(false);
const new_confirmLoading = ref<boolean>(false);
const addHandle = () => {
  debugger;
  if (userType != 0 && userType != 1) return message.info('无权限，可查询和下载程序包！');
  //每次新增初始化一下
  newProgramData.value = {
    version_x: 0,
    version_y: 0,
    version_z: 0,
    systemType: '',
    deviceType: '',
    copyType: '',
    partType: '',
    programType: '',
    supportCrane: [],
    newProgramFiles: [],
    remarks: '',
  };
  newVisible.value = true;
};
const add_modalok = () => {
  ////先校验必传值是否存在
  if (
    newProgramData.value.version_x == null ||
    newProgramData.value.version_y == null ||
    newProgramData.value.version_z == null
  )
    return message.warn('请输入正确版本号');
  if (!newProgramData.value.systemType) return message.warn('请选择系统类型');
  if (!newProgramData.value.deviceType) return message.warn('请选择设备类型');
  if (!newProgramData.value.copyType) return message.warn('请选择备份类型');
  if (!newProgramData.value.partType) return message.warn('请选择部件类型');
  if (!newProgramData.value.programType) return message.warn('请选择程序类型');
  if (newProgramData.value.supportCrane.length == 0) return message.warn('请选择适用车型');
  if (newProgramData.value.newProgramFiles == null || newProgramData.value.newProgramFiles.length == 0)
    return message.warn('请上传镜像文件');
  if (!newProgramData.value.remarks) return message.warn('请填写说明');
  debounce(addsubmit(), 3000);
};
const addsubmit = async () => {
  let uploadFileUrl;
  let formData = new FormData();
  new_confirmLoading.value = true;
  for (let file of newProgramData.value.newProgramFiles) {
    formData.append('files', file);
  }
  fileUpload(formData)
    .then((res) => {
      uploadFileUrl = res.data;
    })
    .then((res) => {
      let {
        version_x,
        version_y,
        version_z,
        systemType,
        deviceType,
        copyType,
        partType,
        programType,
        supportCrane,
        newProgramFiles,
        remarks,
      } = newProgramData.value;
      let name = newProgramFiles.map((file) => {
        return file.name.split('.')[0];
      });

      let data = {
        type: 0 as 0,
        version: [version_x, version_y, version_z].join('.'),
        package_name: name.join('、'),
        system_type: systemType,
        equipe_type: deviceType,
        back_type: copyType,
        component_type: partType,
        program_type: programType,
        application_car: newselectCraneType.value,  
        annotation: remarks,
        upload_user: `${Storage.get('USER_INFO').name}_${Storage.get('USER_INFO').account}`,
        upload_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        file: uploadFileUrl,
      };
      programManage(data)
        .then((res) => {
          message.info(res.message);
          if (res.code === 200) {
            let info = { version: data.version, package: data.package_name, supportCrane: data.application_car };
            logger('新增', '程序管理', info);
          }
        })
        .finally(() => {
          programQuery();
          newVisible.value = false;
          new_confirmLoading.value = false;
        });
    });
};
const add_modalcancel = () => {};

//列表导出
const download = () => {
  if (userType != 0 && userType != 1) return message.info('无权限，可查询和下载程序包！');
  let ids = selectedRowKeys.value.join(',');
  let data = {
    type: 6 as 6,
    id: ids == '' ? undefined : ids,
  };
  programManage(data).then((res) => {
    if (res.data) {
      let url = import.meta.env.VITE_DOWNLOAD_EXCELFILE_URL + res.data;
      excelDownload(url, '程序列表', Storage.get('USER_INFO').account, '导出中');
      let info = '导出列表数据';
      logger('导出', '程序管理', info);
    }
  });
};
//删除
const deleteHandle = () => {
  if (userType != 0 && userType != 1) return message.info('无权限，可查询和下载程序包！');
  let ids = selectedRowKeys.value.join(',');
  let data = {
    type: 1 as 1,
    id: ids,
  };
  programManage(data)
    .then((res) => {
      message.info(res.message);
      if (res.code == 200) {
        //table
        let deletedata = {
          systemType: [],
          supportCrane: [],
          partType: [],
        };
        selectedRowKeys.value.forEach((item) => {
          let deleterow = tableData.value.filter((k) => k.id == item)[0];
          deletedata.systemType.push(deleterow.systemName);
          deletedata.supportCrane.push(deleterow.supportCrane);
          deletedata.partType.push(deleterow.partType);
        });
        let info = deletedata;
        logger('删除', '程序管理', info);
      }
    })
    .finally(() => {
      programQuery();
    });
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
    width: 60,

    // customRender: (text, record) => <Tooltip placement="topLeft" title={record.index} >{record.index}</Tooltip>
  },
  {
    title: '版本号',
    dataIndex: 'version',
    align: 'center',
    width: 90,
  },
  {
    title: '包名称',
    dataIndex: 'packageName',
    align: 'center',
    width: 140,
  },
  {
    title: '系统类型',
    dataIndex: 'systemName',
    align: 'center',
    width: 100,
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    align: 'center',
    width: 120,
  },
  {
    title: '备份类型',
    dataIndex: 'copyType',
    align: 'center',
    width: 100,
  },
  {
    title: '部件类型',
    dataIndex: 'partType',
    align: 'center',
    width: 100,
  },
  {
    title: '程序类型',
    dataIndex: 'programType',
    align: 'center',
    width: 100,
  },
  {
    title: '适用车型',
    dataIndex: 'supportCrane',
    align: 'center',
    width: 180,
    scopedSlots: { customRender: 'supportCrane' },
  },
  {
    title: '说明',
    dataIndex: 'remarks',
    align: 'center',
    //ellipsis: true,
    width: 180,
    scopedSlots: { customRender: 'remarks' },
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    align: 'center',
    width: 180,
  },
  {
    title: '上传人',
    dataIndex: 'uploadPerson',
    align: 'center',
    width: 150,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    fixed: 'right',
    width: 180,
  },
];
//table事件
const onSelectChange = (selected: Key[], selectedrows: Table[]) => {
  selectedRowKeys.value = selected;
  selectedRows.value = selectedrows;
  console.log(selectedRowKeys.value);
};
const edit = (key) => {
  if (userType != 0 && userType != 1) return message.info('无权限，可查询和下载程序包！');
  editableData[key] = cloneDeep(tableData.value.filter((item) => key === item.id)[0]);
};
const save = (key) => {
  let editrow = tableData.value.filter((item) => key === item.id)[0];
  let beforeAnnotation = editrow.remarks;
  let version = editrow.version;
  let packageName = editrow.packageName;
  Object.assign(tableData.value.filter((item) => key === item.id)[0], editableData[key]);
  //这里发送保存请求
  let data = {
    type: 2 as 2,
    id: key,
    annotation: editableData[key].remarks,
  };
  programManage(data)
    .then((res) => {
      message.info(res.message);
      if (res.code == 200) {
        let info = { beforeAnnotation, annotation: data.annotation, version, package: packageName };
        if(beforeAnnotation!=info.annotation)  logger('编辑', '程序管理', info);
      }
    })
    .finally(() => {
      delete editableData[key];
    });
};
const cancel = (key) => {
  delete editableData[key];
};
//下载当前版本
const getFileBlob = async (url, packages, zip) => {
  return new Promise((resolve, reject) => {
    url = import.meta.env.VITE_BASE_ZIPFILE_URL + url;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        zip.file(packages, xhr.response);
        return resolve(1);
      } else {
        return reject();
      }
    };
    xhr.send();
  });
};

const downloadCurrentVersion = async (record) => {
  let files = record.file.split(',');
  //如果只有一个文件
  if (files.length == 1) {
    message.loading('下载中', 0);
    fileToBlob(import.meta.env.VITE_BASE_ZIPFILE_URL + files[0])
      .then((res) => {
        let blob = new Blob([res]);
        const url = window.URL.createObjectURL(blob);
        downloadUrl(record.packageName + '.rar', url);
      })
      .finally(() => {
        //日志
        let info = {
          version: record.version,
          package: record.packageName,
          system: record.systemName,
          partType: record.partType,
          supportCrane: record.supportCrane,
        };
        logger('程序下载', '程序管理', info);
      });
  } else {
    message.loading('下载中', 0);
    let packages = record.packageName.split('、');
    let name;
    if (packages.length > 2) {
      name = packages.slice(0, 2).join('_') + '等镜像包.rar';
    } else {
      name = packages.join('_') + '.rar';
    }
    //如果有多个文件
    let zip = new JSZip();
    let promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(getFileBlob(files[i], packages[i] + '.rar', zip));
    }
    Promise.all(promises).then((res) => {
      zip
        .generateAsync({ type: 'blob' })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          downloadUrl(name, url);
        })
        .finally(() => {
          let info = {
            version: record.version,
            package: record.packageName,
            system: record.systemName,
            partType: record.partType,
            supportCrane: record.supportCrane,
          };
          logger('程序下载', '程序管理', info);
        });
    });
  }
};

//更新程序事件
const updateVisible = ref<boolean>(false);
const update_confirmLoading = ref<boolean>(false);
const updateParams = ref<UpdateParams>({
  id: null,
  version_x: 1,
  version_y: 0,
  version_z: 0,
  currentVersion: '',
  currentChecked: [],
  craneType: [],
  updateFiles: [],
  remarks: '',
});
const updateVersion = (record) => {
  if (userType != 0 && userType != 1) return message.info('无权限，可查询和下载程序包！');
  updateParams.value = {
    id: record.id,
    version_x: record.version.split('.')[0],
    version_y: record.version.split('.')[1],
    version_z: record.version.split('.')[2],
    currentVersion: record.version,
    currentChecked: [],
    craneType: record.supportCrane.split(','),
    updateFiles: [],
    remarks: '',
  };
  updateVisible.value = true;
};
const update_modalok = () => {
  const { version_x, version_y, version_z, currentVersion, currentChecked, craneType, updateFiles, remarks } =
    updateParams.value;
  let updateVersionNo = [version_x, version_y, version_z].join('.');
  if (updateVersionNo == currentVersion) return message.warn('版本号必须大于前一版本');
  if (currentChecked.length == 0) return message.warn('请选择适用车型');
  if (updateFiles.length == 0) return message.warn('请上传更新镜像包');
  if (remarks == '' || remarks == null) return message.warn('请填写更新说明');
  debounce(updatesubmit(), 3000);
};
const updatesubmit = () => {
  const { id, version_x, version_y, version_z, currentChecked, updateFiles, remarks } = updateParams.value;
  let uploadFileUrl;
  let formData = new FormData();
  update_confirmLoading.value = true;
  for (let file of updateFiles) {
    formData.append('files', file);
  }
  fileUpload(formData)
    .then((res) => {
      uploadFileUrl = res.data;
    })
    .then((res) => {
      let name = updateFiles.map((file) => {
        return file.name;
      });

      let data = {
        type: 3 as 3,
        id: id,
        version: [version_x, version_y, version_z].join('.'),
        package_name: name.join('、'),
        application_car: updateselectCraneType.value,
        annotation: remarks,
        upload_user: `${Storage.get('USER_INFO').name}(${Storage.get('USER_INFO').account})`,
        upload_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        file: uploadFileUrl,
      };
      console.log(data);
      programManage(data)
        .then((res) => {
          message.info(res.message);
          if (res.code == 200) {
            let updaterow = tableData.value.filter((item) => data.id === item.id)[0];
            let preinfo = {
              version: updaterow.version,
              supportCrane: updaterow.supportCrane,
              files: updaterow.packageName,
              remarks: updaterow.remarks,
            };
            let currentinfo = {
              version: data.version,
              supportCrane: data.application_car,
              updateFiles: data.package_name,
              remarks: data.annotation,
            };
            let info = { pre: { ...preinfo }, cur: { ...currentinfo } };

            logger('更新', '程序管理', info);
          }
        })
        .finally(() => {
          programQuery();
          updateVisible.value = false;
          update_confirmLoading.value = false;
        });
    });
};
const update_modalcancel = () => {};

const beforeUpload = (_, fileList, flag) => {
  if (flag == 'add') newProgramData.value.newProgramFiles.push(_);
  if (flag == 'update') updateParams.value.updateFiles.push(_);
  return false;
};

const fileChange = (file, flag) => {
  //新增
  if (flag == 'add') {
    newProgramData.value.newProgramFiles = newProgramData.value.newProgramFiles.filter((k) => {
      return file.fileList.findIndex((item) => item.uid == k.uid) > -1;
    });
  }
  //更新
  if (flag == 'update') {
    updateParams.value.updateFiles = updateParams.value.updateFiles.filter((k) => {
      return file.fileList.findIndex((item) => item.uid == k.uid) > -1;
    });
  }
};
//查看历史版本事件
const historyVisible = ref<boolean>(false);
const history_confirmLoading = ref<boolean>(false);
const histroyList = ref([]);
const getHistoryVersion = (id) => {
  let data = {
    type: 5 as 5,
    id: id,
  };
  programManage(data).then((res) => {
    res &&
      res.data.sort((a, b) => {
        let versionA = a.version.split('.').join('') * 1;
        let versionB = b.version.split('.').join('') * 1;
        return versionB - versionA;
      });
    histroyList.value = res.data.map((item) => {
      return {
        system: item.system_type,
        partType: item.component_type,
        version: item.version,
        packageName: item.package_name,
        supportCrane: item.application_car,
        remarks: item.annotation,
        url: item.file,
      };
    });
  });
  historyVisible.value = true;
};
const downloadHistory = (item) => {
  // let aTag = document.createElement('a');
  // aTag.download = item.name+'.rar';
  // aTag.href = import.meta.env.VITE_BASE_ZIPFILE_URL + item.url;
  // aTag.target = '_blank';
  // document.body.appendChild(aTag);
  // aTag.click();
  // aTag.remove();
  item.file = item.url;
  downloadCurrentVersion(item);
};
const history_modalcancel = () => {};
//tree数据
// let CraneTypeSelectedvalue = ref<string[]>([]);
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
let newselectCraneType=ref<string>('')
let updateselectCraneType=ref<string>('')

onMounted(() => {
  programQuery();
  getCraneTreeData();
});

watch(()=>newProgramData.value.supportCrane,()=>{
  debugger
  newselectCraneType.value= getSelectCraneType(newProgramData.value.supportCrane, treeData.value).join(',')
})
watch(()=>updateParams.value.currentChecked,()=>{
  updateselectCraneType.value= getSelectCraneType(updateParams.value.currentChecked, treeData.value).join(',')
})
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

.importbtn {
  display: flex;
}

.importbtn > div:nth-child(2) {
  margin-left: 20px;
}

.span_text {
  margin-left: 20px;
  font-size: 10px;
}

.span_text_crane {
  margin-left: 20px;
  font-size: 10px;
  display: block;
  width: 100%;
  line-height: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.span_text_current {
  font-size: 10px;
  display: block;
  width: 100%;
  line-height: 16px;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.multi-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  cursor: pointer;
}

.histroy_modal div {
  text-align: center;
  width: 300px;
  margin-bottom: 12px;
}

.histroy_modal > div:nth-child(2) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.history_body {
  height: 50vh;
  overflow-y: auto;
}
</style>
