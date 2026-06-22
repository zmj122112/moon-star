export default async function({event, data}) {
    try {
        // 1. 先看看手里有没有师傅 ID
        let empId = $w.app.dataset.state.myEmployeeId;
        // 2. 如果手里没有（比如刚打开小程序），就必须原地等它查出来！
        if (!empId) {
            const currentOpenId = $w.auth.currentUser.openId;
            if (!currentOpenId) return;
            // await 关键字的意思是：必须等这步查完，不许往下走！
            const staffRes = await $w.cloud.callDataSource({
                dataSourceName: 'managers',
                methodName: 'wedaGetRecords',
                params: {
                    where: [{ key: "bind_openid", rel: "eq", val: currentOpenId }]
                }
            });
            if (staffRes.records && staffRes.records.length > 0) {
                empId = staffRes.records[0]._id;
                // 存入全局变量，给外面的可视化面板使用
                $w.app.dataset.state.myEmployeeId = empId;
            } else {
                console.log("非师傅账号");
                return; // 不是师傅，直接终止
            }
        }
        // 3. 走到这里，100% 保证手里已经捏着师傅 ID 了！
        // 稍微停顿 50 毫秒，给微搭的 UI 反应时间，然后强行开枪拉数据！
        setTimeout(() => {
            if ($w.listView1) {
                console.log("ID已就位，强行刷新列表！使用的ID是:", $w.app.dataset.state.myEmployeeId);
                $w.listView1.refresh(); 
            }
        }, 50);
    } catch (e) {
        console.error("加载工作台数据异常:", e);
    }
}