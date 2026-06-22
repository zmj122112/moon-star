export default async function({event, data}) {
    try {
        // 1. 拿到当前登录人的微信 OpenID (加上 ? 防报错)
        const currentOpenId = $w.auth.currentUser?.openId;
        if (!currentOpenId) return; // 没登录就不管
        // 2. 去 managers 表里查有没有这个 OpenID
        const staffRes = await $w.cloud.callDataSource({
            dataSourceName: 'managers',
            methodName: 'wedaGetRecords',
            params: {
                where: [{ key: "bind_openid", rel: "eq", val: currentOpenId }]
            }
        });
        // 3. 如果查到了（说明他绑定过了）
        if (staffRes.records && staffRes.records.length > 0) {
            const employee = staffRes.records[0];
            
            $w.page.dataset.state.isStaff = true;
            $w.page.dataset.state.staffRole = employee.role;
            
            // 🎯 【核心】：把 manager 表的 _id 死死攥在全局变量里！
            $w.app.dataset.state.myEmployeeId = employee._id;
            
            // 顺手同步全局角色，防止后续页面按 actualRole 查不到
            $w.app.dataset.state.actualRole = employee.role; 
            
        } else {
            $w.page.dataset.state.isStaff = false;
        }
    } catch (e) {
        console.error("静默查验师傅身份失败", e);
    }
}