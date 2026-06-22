export const STATUS_MAP = {
  '10': { color: 'orange', label: '待接单' },
  '20': { color: 'cyan', label: '待勘测' },
  '30': { color: 'gold', label: '待报价' },
  '40': { color: 'lime', label: '待确认报价' },
  '45': { color: 'magenta', label: '待派工' },
  '50': { color: 'blue', label: '施工准备' },
  '60': { color: 'purple', label: '施工中' },
  '65': { color: 'volcano', label: '重新报价' },
  '70': { color: 'geekblue', label: '待验收' },
  '80': { color: 'red', label: '待支付' },
  '90': { color: 'green', label: '已结单' },
};

export const RECORD_TYPE_MAP = {
  '0': { label: '客服接单及派单', color: 'blue' },
  '1': { label: '上门勘测打卡', color: 'cyan' },
  '2': { label: '提交方案及报价', color: 'purple' },
  '3': { label: '客户确认报价', color: 'green' },
  '3_1': { label: '客户确认变更报价', color: 'green' },
  '3_5': { label: '项目经理派工', color: 'magenta' },
  '4': { label: '施工准备', color: 'orange' },
  '5': { label: '施工进度汇报', color: 'gold' },
  '6': { label: '提交完工验收', color: 'pink' },
  '7': { label: '内部沟通备注', color: 'gray' },
  '9': { label: '客户完工验收', color: 'purple' },
  '10': { label: '已付款结单', color: 'green' },
  'rollback': { label: '运维退回', color: 'red' },
  '客户驳回': { label: '客户驳回', color: 'red' },
};

export const ROLE_OPTIONS = [
  { value: 'manager', label: '项目经理', color: 'orange' },
  { value: 'worker', label: '工人', color: 'cyan' },
  { value: 'cs', label: '客服', color: 'blue' },
  { value: 'management', label: '公司管理层', color: 'gold' },
  { value: 'admin', label: '管理员', color: 'purple' },
];

export const ROLE_LABELS = ROLE_OPTIONS.reduce((map, item) => {
  map[item.value] = item.label;
  map[item.label] = item.label;
  return map;
}, {});

export const ROLE_ALIASES = {
  admin: ['admin', '管理员'],
  cs: ['cs', '客服'],
  manager: ['manager', '项目经理'],
  worker: ['worker', '工人', '施工工人'],
  management: ['management', '公司管理层'],
};

export const MENU_ITEMS = [
  { key: '/admin', label: '客服项目', roles: ['admin', 'cs', 'management'] },
  { key: '/project-manager', label: '项目经理', roles: ['admin', 'manager', 'management'] },
  { key: '/dashboard', label: '统计中心', roles: ['admin', 'management'] },
  { key: '/users', label: '用户管理', roles: ['admin'] },
  { key: '/operations/rollback', label: '运维退回', roles: ['admin', 'management'] },
  { key: '/profile', label: '个人设置', roles: ['*'] },
  { key: '/settings', label: '系统设置', roles: ['admin'] },
];

export const CLOUD_STORAGE_BUCKET = '7761-waterproof-3g9f7h9kdb626bb3-1257706342';

export const WORKFLOW_NEXT_RECORD_TYPES = {
  '0': ['1', '2', '3', '3_1', '3_5', '4', '5', '6', '9', '10', '客户驳回'],
  '1': ['2', '3', '3_1', '3_5', '4', '5', '6', '9', '10', '客户驳回'],
  '2': ['3', '3_1', '3_5', '4', '5', '6', '9', '10', '客户驳回'],
  '3': ['3_5', '4', '5', '6', '9', '10'],
  '3_1': ['5', '6', '9', '10'],
  '3_5': ['4', '5', '6', '9', '10'],
  '4': ['5', '6', '9', '10'],
  '5': ['6', '9', '10'],
  '6': ['9', '10'],
};

export const toWorkflowTimestamp = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value === 'bigint') return Number(value);
  if (value instanceof Date) return value.getTime();

  if (typeof value === 'object') {
    if (value.$numberLong !== undefined) return Number(value.$numberLong) || 0;
    if (value.$numberDouble !== undefined) return Number(value.$numberDouble) || 0;
    if (value.$numberInt !== undefined) return Number(value.$numberInt) || 0;

    const primitive = typeof value.valueOf === 'function' ? value.valueOf() : value;
    if (primitive !== value) {
      return toWorkflowTimestamp(primitive);
    }

    const text = typeof value.toString === 'function' ? value.toString() : '';
    const parsed = Number(text);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const getWorkflowRecordTime = (record = {}) => {
  return Math.max(
    toWorkflowTimestamp(record.createdAt),
    toWorkflowTimestamp(record.updatedAt),
    toWorkflowTimestamp(record.updateTime)
  );
};

export const getActiveWorkflowRecords = (records = [], order = {}) => {
  const rollbackAt = toWorkflowTimestamp(order?.rollback_at);
  return records.filter((record) => getWorkflowRecordTime(record) >= rollbackAt);
};

export const hasLaterWorkflowRecord = (records = [], recordType, order = {}) => {
  const nextTypes = WORKFLOW_NEXT_RECORD_TYPES[String(recordType)] || [];
  const activeRecords = getActiveWorkflowRecords(records, order);
  const latestCurrentRecordTime = String(recordType) === '2'
    ? activeRecords
      .filter((record) => String(record.record_type) === '2')
      .reduce((latest, record) => Math.max(latest, getWorkflowRecordTime(record)), 0)
    : 0;
  return activeRecords.some((record) => (
    nextTypes.includes(String(record.record_type)) &&
    (String(recordType) !== '2' || getWorkflowRecordTime(record) > latestCurrentRecordTime)
  ));
};

export const getLatestWorkflowRecord = (records = [], recordType, order = {}) => {
  return getActiveWorkflowRecords(records, order)
    .filter((record) => String(record.record_type) === String(recordType))
    .sort((a, b) => getWorkflowRecordTime(b) - getWorkflowRecordTime(a))[0];
};

export const getStatusInfo = (status) => {
  const key = String(status ?? '');
  return STATUS_MAP[key] || { color: 'gray', label: status || '-' };
};

export const getRoleOption = (role) => {
  const key = normalizeRole(role);
  return ROLE_OPTIONS.find((item) => item.value === key || item.label === key);
};

export const normalizeRole = (role) => {
  const text = String(role ?? '').replace(/\[|\]|\(|\)/g, '').trim();
  if (!text) return '';

  for (const [canonical, aliases] of Object.entries(ROLE_ALIASES)) {
    if (aliases.some((alias) => text.includes(alias))) {
      return canonical;
    }
  }

  return text;
};

export const parseRoles = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map(normalizeRole).filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(normalizeRole).filter(Boolean);
      }
    } catch {
      // Fall through to delimiter parsing.
    }

    const separator = value.includes(';') ? ';' : ',';
    return value.split(separator).map(normalizeRole).filter(Boolean);
  }

  return [normalizeRole(value)].filter(Boolean);
};

export const hasAnyRole = (userRoles, allowedRoles) => {
  if (allowedRoles.includes('*')) return true;
  const normalized = parseRoles(userRoles);
  return allowedRoles.some((role) => normalized.includes(normalizeRole(role)));
};

export const isInternalRole = (roles) => {
  return hasAnyRole(roles, ['admin', 'manager', 'cs', 'management', 'worker']);
};

export const toRoleLabels = (roles) => {
  return parseRoles(roles).map((role) => ROLE_LABELS[role] || role);
};
