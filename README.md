# 月星防水管理平台

月星防水管理平台是一个基于 React + Vite + Ant Design + Tencent CloudBase 的企业后台，用于防水维修/施工业务的工单管理、派单、报价、施工跟进、用户管理和经营统计。

## 技术栈

- 前端：React 19、Vite、React Router、Ant Design
- 后端：Tencent CloudBase 云函数
- 数据：CloudBase Database
- 托管：CloudBase Hosting

## 目录结构

```text
src/
  components/        通用布局、表格、弹窗和业务组件
  config/            业务常量、角色、状态、环境配置
  pages/             登录、客服项目、项目经理、详情、统计、用户管理等页面
  utils/             登录用户、图片等工具函数
functions/           CloudBase 云函数
DBmodel/             CloudBase/微搭数据模型导出资料
public/              静态资源
weda-client/         微搭小程序端源码快照（从本地微搭工作区同步入库）
```

## 核心业务

工单主流程：

```text
待接单 -> 待勘测 -> 待报价 -> 待确认报价 -> 待派工 -> 施工准备 -> 施工中 -> 待验收 -> 待支付 -> 已结单
```

特殊状态：

- `65`：重新报价

主要角色：

- `admin`：管理员
- `cs`：客服
- `manager`：项目经理
- `worker`：工人
- `management`：公司管理层

主要数据集合：

- `workorders`：工单主表
- `managers`：后台用户/员工
- `wo_records`：工单跟进记录
- `user_operation_logs`：用户管理操作日志

## 本地开发

```bash
npm install
npm run dev
```

测试模式构建：

```bash
npm run build:test
```

生产模式构建：

```bash
npm run build:prod
```

## 环境变量

`.env.development` 用于测试版：

```text
VITE_APP_ENV=development
VITE_APP_NAME=月星防水管理平台-测试版
VITE_CLOUDBASE_ENV_ID=waterproof-3g9f7h9kdb626bb3
VITE_BASE_PATH=/moon-star-admin-test/
```

`.env.production` 用于正式版：

```text
VITE_APP_ENV=production
VITE_APP_NAME=月星防水管理平台
VITE_CLOUDBASE_ENV_ID=waterproof-3g9f7h9kdb626bb3
VITE_BASE_PATH=/moon-star-admin/
```

## 部署

部署测试前端：

```bash
npm run deploy:test
```

部署云函数：

```bash
npm run deploy:functions
```

注意：当前测试版和正式版前端使用不同 Hosting 路径，但云函数共用同一个 CloudBase 环境。云函数变更会影响该环境下所有前端入口。

## 访问入口

正式版后台：

- [https://m.yuexing1947.com/moon-star-admin/](https://m.yuexing1947.com/moon-star-admin/)

测试版后台：

- [https://m.yuexing1947.com/moon-star-admin-test/](https://m.yuexing1947.com/moon-star-admin-test/)

CloudBase Hosting 源站：

- 正式版路径：`/moon-star-admin`
- 测试版路径：`/moon-star-admin-test`

## 小程序代码同步

微搭小程序当前本地工作区路径：

```text
/Users/swift/.weda-workspaces/waterproof-3g9f7h9kdb626bb3/apps/app-7j15h0p1
```

仓库内保留的小程序源码快照路径：

```text
weda-client/app-7j15h0p1
```

说明：

- 微搭在线编辑器上的修改，不会自动进入本仓库。
- 当前仓库里的 `weda-client/app-7j15h0p1` 是一份可追踪的源码快照，用于 Git 备份和协作留档。
- 如果你先在微搭在线编辑器里改了页面，再需要同步回仓库，建议先从微搭拉到本地工作区，再覆盖到仓库内的 `weda-client/app-7j15h0p1`。
- 如果你先在仓库里改了 PC 端代码，发布后台时不影响微搭小程序端。

## 维护约定

- 工单状态、记录类型、角色配置集中在 `src/config/business.js`。
- CloudBase 前端环境配置集中在 `src/config/env.js`。
- 当前登录用户和 token 读取集中在 `src/utils/auth.js`。
- 新增页面权限时优先修改 `MENU_ITEMS`，不要在布局组件里重复硬编码角色。
