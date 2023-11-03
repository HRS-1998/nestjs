import {
  Layout,
  Breadcrumb,
  Modal,
  Table,
  Menu,
  Input,
  InputNumber,
  Form,
  Card,
  Checkbox,
  Radio,
  Select,
  DatePicker,
  Upload,
  Popconfirm,
  Divider,
  Row,
  Col,
  Dropdown,
  Space,
  Tooltip,
  Tabs,
  TreeSelect,
  Cascader
  // message
} from 'ant-design-vue';

// import { type MessageApi } from 'ant-design-vue/lib/message';
import type { App } from 'vue';
import { AButton } from '@/components/antdbasic/button/index';
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css';
import 'dayjs/locale/zh-cn';
import '@/assets/styles/resetant.css';
import '@/assets/styles/style.css';

export function setupAntd(app: App<Element>) {
  app.component('AButton', AButton);
  // app.provide('message',message as MessageApi)
  app
    .use(Layout)
    .use(Breadcrumb)
    .use(Form)
    .use(Input)
    .use(InputNumber)
    .use(Modal)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Col)
    .use(Row)
    .use(Select)
    .use(DatePicker)
    .use(Upload)
    .use(Popconfirm)
    .use(Divider)
    .use(Dropdown)
    .use(Space)
    .use(Tooltip)
    .use(Tabs)
    .use(TreeSelect)
    .use(Cascader);
}
