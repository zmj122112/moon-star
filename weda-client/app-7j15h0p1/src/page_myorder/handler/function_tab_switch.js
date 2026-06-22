export default async function({event, data}) {
    try {
        // 1. 提取最纯净的值
        let selectedValue = event?.detail?.value;
        if (selectedValue === undefined || typeof selectedValue === 'object') {
            selectedValue = event?.value ?? event?.detail ?? "0";
        }
        const finalValue = String(selectedValue);
        // 2. 赋值给页面变量
        $w.page.dataset.state.activeTab = finalValue;
        // 🌟 3. 核心修复：延迟 100 毫秒刷新！
        // 打破“慢半拍”魔咒，等状态彻底同步到组件后再去查数据库
        setTimeout(() => {
            if ($w.listView1) {
                $w.listView1.refresh();
            }
        }, 100);
    } catch (e) {
        console.error("Tab切换报错:", e);
    }
}