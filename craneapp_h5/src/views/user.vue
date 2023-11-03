<template>
  <div class="content">
    <a-form
      :model="searchData"
      labelAlign="right"
      :label-col="{ width: 70 }"
      :wrapper-col="{ span: 12 }"
      class="form-wrap"
      :labelWrap="true"
    >
      <a-form-item label="登录账号" name="account">
        <a-input v-model:value="searchData.account" />
      </a-form-item>

      <a-form-item label="用户名称" name="name">
        <a-input v-model:value="searchData.name" />
      </a-form-item>
      <a-form-item label="角色" name="role">
        <a-select
          v-model:value="searchData.role"
          show-search
          placeholder="请选择用户角色"
          :options="roleOptions"
          :filter-option="filterOption"
          name="role"
        >
        </a-select>
      </a-form-item>
    </a-form>
    <div class="flex flex-end query_btn"><a-button type="primary" @click="userQuery"> 查询 </a-button></div>
    <a-divider />
    <a-button type="primary" @click="addHandle" class="flex flex-end mb-16">新增</a-button>
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
        <template v-if="column.dataIndex == 'action'">
          <a-space size="middle" v-if="editableData[record.id]">
            <a @click="save(record.id)">保存</a>
            <a @click="cancel(record.id)">取消</a>
          </a-space>
          <a-space size="large" v-else>
            <a @click="edit(record.id)">修改</a>
            <a @click="reset(record.id, record.role)">密码重置</a>

            <a-popconfirm title="确认删除？" @confirm="deleteHandle(record.id)">
              <template #icon><question-circle-outlined style="color: red" /></template>
              <a>删除</a>
            </a-popconfirm>
          </a-space>
        </template>
        <template v-if="['name', 'role', 'tel', 'email', 'remarks'].includes(column.dataIndex)">
          <div>
            <a-select
              v-if="editableData[record.id] && column.dataIndex == 'role'"
              v-model:value="editableData[record.id][column.dataIndex]"
              placeholder="请选择用户角色"
              :options="roleOptions.slice(1)"
              :filter-option="filterOption"
              name="role"
            >
            </a-select>
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
      title="新增用户"
      @ok="add_modalok"
      @cancel="add_modalcancel"
      okText="确认"
      cancelText="取消"
      :confirm-loading="new_confirmLoading"
      :maskClosable="false"
      :width="600"
    >
      <a-form :model="newUserData" labelAlign="right" :label-col="{ width: 90 }" :labelWrap="true">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="账号" name="account">
              <a-input
                v-model:value="newUserData.account"
                :placeholder="isdisabled ? '请输入域账号/CRM账号' : '请输入账号'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="密码" name="password">
              <a-input
                v-model:value="newUserData.password"
                :disabled="isdisabled"
                :placeholder="isdisabled ? '内部用户默认域账号密码' : '请输入密码'"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="用户名称" name="name">
              <a-input v-model:value="newUserData.name" placeholder="请输入用户名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色" name="role">
              <a-select
                v-model:value="newUserData.role"
                show-search
                placeholder="请选择用户角色"
                :options="roleOptions.slice(1)"
                :filter-option="filterOption"
                name="role"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="电话" name="tel">
              <a-input v-model:value="newUserData.tel" placeholder="请输入手机号" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="邮箱" name="email">
              <a-input v-model:value="newUserData.email" placeholder="请输入邮箱账号" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="备注" name="remarks">
          <a-textarea v-model:value="newUserData.remarks" placeholder="请填写备注信息" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 密码重置 -->
    <a-modal
      centered
      v-model:visible="resetVisible"
      title="密码重置"
      @ok="reset_modalok"
      @cancel="reset_modalcancel"
      okText="重置"
      cancelText="取消"
      :confirm-loading="reset_confirmLoading"
      :maskClosable="false"
      :width="400"
    >
      <a-form :model="resetParams" labelAlign="right" :label-col="{ width: 70 }" :labelWrap="true">
        <a-form-item label="新密码" name="password">
          <a-input v-model:value="resetParams.password" placeholder="请输入新密码" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { SelectProps, message } from 'ant-design-vue';
import { UnwrapRef, onMounted, reactive, ref, watch } from 'vue';
import { cloneDeep } from 'lodash-es';
import { userManage } from '@/api/user';
import { useBaseType } from '@/store/modules/typeOptions';
import { logger } from '@/utils/logger';
import { info } from 'console';

interface SearchData {
  account?: string;
  name?: string;
  role?: string;
}
interface Table {
  id: number | string;
  index: number;
  account: string;
  name: string;
  role: string;
  tel: string;
  email: string;
  remarks: string;
}

interface NewUserParams {
  account: string;
  name: string;
  role: string;
  tel: string;
  email: string;
  remarks: string;
  password: string;
}
type Key = string | number;
let searchData = ref<SearchData>({
  account: '',
  name: '',
  role: '全部',
});
let isdisabled = ref<boolean>(true);
let store = useBaseType();
const roleOptions = ref<SelectProps['options']>([]);
roleOptions.value = store.getTypeOptions('roleType');

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

//查询按钮事件
const userQuery = () => {
  let { account, name, role } = searchData.value;
  getTableData(account, name, role == '全部' ? undefined : role);
};
const getTableData = (id, name, role) => {
  //查询请求
  let data = {
    type: 4 as 4,
    user_id: id,
    user_name: name,
    role: role,
  };
  userManage(data).then((res) => {
    let data = res.data.map((item, index) => {
      return {
        index: index + 1,
        id: item.id,
        account: item.user_id,
        name: item.user_name,
        role: item.role,
        tel: item.telphone,
        email: item.mail,
        remarks: item.annotation,
      };
    });
    tableData.value = data;
  });
};

//新增事件
const newUserData = ref<NewUserParams>({
  account: '',
  name: '',
  role: null,
  tel: '',
  email: '',
  remarks: '',
  password: '',
});
const newVisible = ref<boolean>(false);
const new_confirmLoading = ref<boolean>(false);
const addHandle = () => {
  newVisible.value = true;
};
const add_modalok = () => {
  const { account, name, password, role, tel, email, remarks } = newUserData.value;
  if (account.trim() == '') return message.warn('请输入账号！');
  if (name.trim() == '') return message.warn('请输入用户名称！');
  if (isdisabled.value == false && password.trim() == '') return message.warn('请输入密码！');
  if (role == '' || role == null) return message.warn('请选择用户角色！');
  if (tel.trim() == '') return message.warn('请输入电话！');
  if (email.trim() == '') return message.warn('请输入邮箱！');
  //校验电话和邮箱
  if (!/^1[3456789]\d{9}$/.test(tel)) return message.warn('请输入11位正确格式手机号！');
  if (!/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(email))
    return message.warn('请输入正确格式的邮箱账号！');
  let data = {
    type: 0 as 0,
    user_id: account,
    user_name: name,
    password: password,
    role: role,
    telphone: tel,
    mail: email,
    annotation: remarks,
  };
  new_confirmLoading.value = true;
  userManage(data)
    .then((res) => {
      message.info(res.message);
      if (res.message == '添加成功') {
        newUserData.value = { account: '', name: '', role: null, tel: '', email: '', remarks: '', password: '' };
        getTableData(undefined, undefined, undefined);
        //日志
        let info = {
          account: data.user_id,
          name: data.user_name,
        };
        logger('新增', '用户管理', info);
      }
    })
    .finally(() => {
      newVisible.value = false;
      new_confirmLoading.value = false;
    });
};
const add_modalcancel = () => {};

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
    title: '登录账号',
    dataIndex: 'account',
    align: 'center',
    width: 150,
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    align: 'center',
    width: 150,
  },
  {
    title: '角色',
    dataIndex: 'role',
    align: 'center',
    width: 150,
  },
  {
    title: '电话',
    dataIndex: 'tel',
    align: 'center',
    width: 150,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center',
    width: 200,
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
const onSelectChange = (selected: Key[], selectedrows: Table[]) => {
  selectedRowKeys.value = selected;
  selectedRows.value = selectedrows;
};
const edit = (key) => {
  editableData[key] = cloneDeep(tableData.value.filter((item) => key === item.id)[0]);
};
const save = (key) => {
  //校验电话和邮箱
  if (!/^1[3456789]\d{9}$/.test(editableData[key].tel)) return message.warn('请输入11位正确格式手机号！');
  if (!/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(editableData[key].email))
    return message.warn('请输入正确格式的邮箱账号！');
  let preUserInfo={...tableData.value.filter((item) => key === item.id)[0]}
  Object.assign(tableData.value.filter((item) => key === item.id)[0], editableData[key]);
  //这里发送保存请求
  let data = {
    type: 1 as 1,
    id: editableData[key].id,
    user_id: editableData[key].account,
    user_name: editableData[key].name,
    role: editableData[key].role,
    telphone: editableData[key].tel,
    mail: editableData[key].email,
    annotation: editableData[key].remarks,
  };
  userManage(data)
    .then((res) => {
       message.info(res.message);
       if(res.code==200){
        //日志记录
        let info = {
          account:'',
          desc: [],
          preinfo: [],
          curinfo: [],
        };
        info.account=data.user_id
        if (preUserInfo.name != data.user_name) {
          info.desc.push('用户名称');
          info.preinfo.push(preUserInfo.name);
          info.curinfo.push(data.user_name);
        }
        if (preUserInfo.role != data.role) {
          info.desc.push('角色');
          info.preinfo.push(preUserInfo.role);
          info.curinfo.push(data.role);
        }
        if (preUserInfo.tel != data.telphone) {
          info.desc.push('电话');
          info.preinfo.push(preUserInfo.tel);
          info.curinfo.push(data.telphone);
        }
        if (preUserInfo.email != data.mail) {
          info.desc.push('邮箱');
          info.preinfo.push(preUserInfo.email);
          info.curinfo.push(data.mail);
        }
        if (preUserInfo.remarks != data.annotation) {
          info.desc.push('备注');
          info.preinfo.push(preUserInfo.remarks);
          info.curinfo.push(data.annotation);
        }

        if(info.desc.length) logger('修改', '用户管理', info);

       }
    })
    .finally(() => {
      delete editableData[key];
      getTableData(undefined, undefined, undefined);
    });
};
const cancel = (key) => {
  delete editableData[key];
};
const deleteHandle = (id) => {
  //这里删除
  let data = {
    type: 3 as 3,
    id: id,
  };
  let deleteUserData = { ...tableData.value.filter((item) => item.id == id)[0] };
  userManage(data).then((res) => {
    message.info(res.message);
    if (res.code == 200) {
      let info = {
        account: deleteUserData.account,
        name: deleteUserData.name,
      };

      logger('删除', '用户管理', info);
    }
    getTableData(undefined, undefined, undefined);
  });
};

//密码重置
const resetId = ref('');
const reset = (id, role) => {
  if (role !== '外部人员') return message.warn('仅外部人员密码可重置');
  resetId.value = id;
  resetVisible.value = true;
};
const resetVisible = ref<boolean>(false);
const reset_confirmLoading = ref<boolean>(false);
const resetParams = ref({
  password: '',
});
const reset_modalok = () => {
  if (resetParams.value.password.trim() == '') return message.warn('请输入新密码');
  let changePasswordUser = { ...tableData.value.filter((item) => item.id == resetId.value)[0] };
  let data = {
    type: 2 as 2,
    id: resetId.value,
    password: resetParams.value.password,
  };
  reset_confirmLoading.value = true;
  userManage(data)
    .then((res) => {
      message.info(res.message);
      if (res.code == 200) {
        let info = {
          account: changePasswordUser.account,
          name: changePasswordUser.name,
        };
        logger('密码重置', '用户管理', info);
      }
    })
    .finally(() => {
      reset_confirmLoading.value = false;
      resetVisible.value = false;
    });
};
const reset_modalcancel = () => {};

onMounted(() => {
  getTableData(undefined, undefined, undefined);
});

watch(
  () => newUserData.value.role,
  () => {
    if (newUserData.value.role == '外部人员') {
      isdisabled.value = false;
    } else {
      newUserData.value.password = null;
      isdisabled.value = true;
    }
  },
);
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
</style>
