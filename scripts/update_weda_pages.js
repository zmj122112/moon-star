import fs from 'fs';
import path from 'path';

const ROOT = '/Users/swift/.weda-workspaces/waterproof-3g9f7h9kdb626bb3/apps/app-7j15h0p1';
const SRC_ROOTS = [
  path.join(ROOT, 'src'),
  path.join(ROOT, 'apps/app-7j15h0p1/src')
];

const writeFileIfChanged = (filePath, content) => {
  const current = fs.readFileSync(filePath, 'utf8');
  if (current === content) return false;
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
};

const refreshLifecycleSource = ({ queryId = null, dataViewId = null, listViewId = null }) => `/*
* 可通过 $page 获取或修改当前页面的 变量 状态 handler lifecycle 等信息
* 可通过 app 获取或修改全局应用的 变量 状态 等信息
* 具体可以 console.info 在编辑器Console面板查看更多信息
* 如果需要 async-await，请在方法前 async
* 生命周期文档请参考：https://cloud.tencent.com/document/product/1301/71504
*/
async function refreshPageData() {
  try {
    ${queryId ? `if ($w.${queryId} && typeof $w.${queryId}.trigger === 'function') await $w.${queryId}.trigger();` : ''}
    ${dataViewId ? `if ($w.${dataViewId} && typeof $w.${dataViewId}.refresh === 'function') $w.${dataViewId}.refresh();` : ''}
    ${listViewId ? `if ($w.${listViewId} && typeof $w.${listViewId}.refresh === 'function') $w.${listViewId}.refresh();` : ''}
  } catch (e) {
    console.warn('页面刷新失败:', e);
  }
  try {
    if (typeof wx !== 'undefined' && typeof wx.stopPullDownRefresh === 'function') {
      wx.stopPullDownRefresh();
    }
  } catch (e) {
    console.warn('停止下拉刷新失败:', e);
  }
}

export default {
  onPageLoad(query) {
    //console.log('---------> LifeCycle onPageLoad', query)
  },
  async onPageShow() {
    await refreshPageData();
  },
  onPageReady() {
    //console.log('---------> LifeCycle onPageReady')
  },
  onPageHide() {
    //console.log('---------> LifeCycle onPageHide')
  },
  onPageUnload() {
    //console.log('---------> LifeCycle onPageUnload')
  },
  async onPullDownRefresh() {
    await refreshPageData();
  },
}`;

const reviewSummaryTextNode = {
  id: 'text9_review',
  component: 'WdText',
  attributes: {
    inheritColor: true,
    maxLines: '2',
    ':text': "$w.item_listView1.review_stars ? ('已评价 ' + $w.item_listView1.review_stars + ' 星' + ($w.item_listView1.customer_review ? '：' + $w.item_listView1.customer_review : '')) : ''",
    style: {
      color: 'rgb(56, 142, 60)',
      fontWeight: 'normal',
      fontSize: '12px'
    }
  },
  directives: {
    ':display': "$w.item_listView1.status === '90' && !!$w.item_listView1.review_stars"
  },
  extra: {
    attributeExtraData: {}
  }
};

const patchPageMyOrderJson = (filePath) => {
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const walk = (node, visitor) => {
    if (Array.isArray(node)) {
      node.forEach((item) => walk(item, visitor));
      return;
    }
    if (!node || typeof node !== 'object') return;
    visitor(node);
    Object.values(node).forEach((value) => walk(value, visitor));
  };

  let changed = false;
  let text9 = null;
  let container17 = null;

  walk(json, (node) => {
    if (node.id === 'text9') text9 = node;
    if (node.id === 'container17') container17 = node;
  });

  if (text9 && text9.directives?.[':display'] !== "$w.item_listView1.status === '90' && !$w.item_listView1.review_stars") {
    text9.directives[':display'] = "$w.item_listView1.status === '90' && !$w.item_listView1.review_stars";
    changed = true;
  }

  if (container17 && Array.isArray(container17.items) && !container17.items.some((item) => item.id === 'text9_review')) {
    container17.items.push(reviewSummaryTextNode);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  }
  return changed;
};

const patchDispatchWorkerHandler = (filePath) => {
  let source = fs.readFileSync(filePath, 'utf8');
  if (!source.includes('const formatDateTime = (value) => {')) {
    source = source.replace(
      "const loadLatestRecords = async (orderId) => {\n",
      "const formatDateTime = (value) => {\n" +
        "  const numeric = Number(value);\n" +
        "  if (!Number.isFinite(numeric) || numeric <= 0) return value;\n" +
        "  const date = new Date(numeric);\n" +
        "  const pad = (num) => String(num).padStart(2, '0');\n" +
        "  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;\n" +
        "};\n" +
        "const loadLatestRecords = async (orderId) => {\n"
    );
  }
  source = source.replace(
    "    const content = '项目经理已完成派工，施工师傅：' + (workerName || workerId) + '，预计进场时间：' + appointmentTime;\n",
    "    const content = '项目经理已完成派工，施工师傅：' + (workerName || workerId) + '，预计进场时间：' + formatDateTime(appointmentTime);\n"
  );
  return writeFileIfChanged(filePath, source);
};

let changedFiles = [];

for (const srcRoot of SRC_ROOTS) {
  const pageMyorderLifecycle = path.join(srcRoot, 'page_myorder/lifecycle.js');
  const pageOrderDetailLifecycle = path.join(srcRoot, 'page_order_detail/lifecycle.js');
  const pageMyorderJson = path.join(srcRoot, 'page_myorder/page.json');
  const dispatchWorkerHandler = path.join(srcRoot, 'page_master_order_detail/handler/function_dispatch_worker.js');

  if (writeFileIfChanged(pageMyorderLifecycle, refreshLifecycleSource({ listViewId: 'listView1' }))) {
    changedFiles.push(pageMyorderLifecycle);
  }
  if (writeFileIfChanged(pageOrderDetailLifecycle, refreshLifecycleSource({ queryId: 'query1', dataViewId: 'dataView1' }))) {
    changedFiles.push(pageOrderDetailLifecycle);
  }
  if (patchPageMyOrderJson(pageMyorderJson)) {
    changedFiles.push(pageMyorderJson);
  }
  if (patchDispatchWorkerHandler(dispatchWorkerHandler)) {
    changedFiles.push(dispatchWorkerHandler);
  }
}

console.log(JSON.stringify({ changedFiles }, null, 2));
