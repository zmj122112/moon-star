export default function({event, data}) {
    try {
        const toTimestamp = (value) => {
            if (value === null || value === undefined || value === '') return 0;
            if (typeof value === 'number') return isFinite(value) ? value : 0;
            if (value instanceof Date) return value.getTime();
            if (typeof value === 'object') {
                if (value.$numberLong !== undefined) return Number(value.$numberLong) || 0;
                if (value.$numberDouble !== undefined) return Number(value.$numberDouble) || 0;
                if (value.$numberInt !== undefined) return Number(value.$numberInt) || 0;
                const primitive = typeof value.valueOf === 'function' ? value.valueOf() : value;
                if (primitive !== value) return toTimestamp(primitive);
                const parsed = Number(typeof value.toString === 'function' ? value.toString() : '');
                return isFinite(parsed) ? parsed : 0;
            }
            const parsed = Number(value);
            return isFinite(parsed) ? parsed : 0;
        };
        const getRecordTime = (record = {}) => Math.max(
            toTimestamp(record.createdAt),
            toTimestamp(record.updatedAt),
            toTimestamp(record.updateTime)
        );
        const normalizeMedia = (value) => {
            if (!value) return [];
            let items = value;
            if (typeof value === 'string') {
                try { items = JSON.parse(value); } catch(e) { items = [value]; }
            }
            if (!Array.isArray(items)) items = [items];
            return items.map((item) => {
                if (typeof item === 'string') return item;
                return item?.url || item?.fileID || item?.fileId || item?.cloudPath || '';
            }).filter(Boolean);
        };
        var rawStatus = "";
        if ($w.dataView1 && $w.dataView1.record) {
            rawStatus = $w.dataView1.record.status;
        }
        
        // 强制转字符串，防止格式灵异事件
        var orderStatus = String(rawStatus);
        
        const order = $w.dataView1?.record || {};
        const employeeId = String($w.app?.dataset?.state?.myEmployeeId || "");
        const isAssignedWorker = employeeId && String(order.worker_id || "") === employeeId;
        const isAssignedManager = employeeId && String(order.manager_id || "") === employeeId;
        const managerStage = ['20', '30', '40', '45'].includes(orderStatus);
        const role = managerStage && isAssignedManager
            ? "manager"
            : (isAssignedWorker ? "worker" : (isAssignedManager ? "manager" : ""));
        console.log("当前状态：", orderStatus, "，当前工单身份：", role);
        const records = $w.listView1?.records || [];
        const rollbackAt = toTimestamp($w.dataView1?.record?.rollback_at);
        const hasConstructionStarted = records.some(record => {
            return getRecordTime(record) >= rollbackAt && ['4', '5', '6', '9', '10'].includes(String(record.record_type));
        });
        // ==========================================
        // 🚨 核心修复 1：终极【白名单】拦截门卫（与UI禁用逻辑完全一致）
        // 只有下面这些情况才允许通行，其他一律拉闸！
        const canOperate =
            (['20', '30', '40', '45'].includes(orderStatus) && role === 'manager') ||
            (orderStatus === '50' && ['manager', 'worker'].includes(role)) ||
            (['60', '70'].includes(orderStatus) && role === 'worker');
        
        if (!canOperate) {
            console.log("🚨 拦截成功：状态或权限不符，拉闸停电！");
            $w.utils.showToast({ title: '当前环节不可操作', icon: 'none' });
            return; // 遇到 return，后面的开窗代码绝对不会执行！
        }
        if (orderStatus === '50' && role === 'manager' && hasConstructionStarted) {
            $w.utils.showToast({ title: '施工准备已提交，派工信息不可修改', icon: 'none' });
            return;
        }
        if (orderStatus === '40' && role === 'manager') {
            const latestQuote = records
                .filter((record) => getRecordTime(record) >= rollbackAt && String(record.record_type) === '2')
                .sort((a, b) => getRecordTime(b) - getRecordTime(a))[0];
            try { $w.inputNumber1?.setValue(Number($w.dataView1?.record?.total_price || latestQuote?.price) || undefined); } catch(e) {}
            try { $w.uploadImage1?.setValue(normalizeMedia(latestQuote?.images)); } catch(e) {}
            try { $w.uploadFile1?.setValue(normalizeMedia(latestQuote?.attachments)); } catch(e) {}
        }
        if (orderStatus === '70' && role === 'worker') {
            const latestCompletion = records
                .filter((record) => getRecordTime(record) >= rollbackAt && String(record.record_type) === '6')
                .sort((a, b) => getRecordTime(b) - getRecordTime(a))[0];
            try { $w.textarea1?.setValue(latestCompletion?.content || ''); } catch(e) {}
            try { $w.uploadImage1?.setValue(normalizeMedia(latestCompletion?.images)); } catch(e) {}
            try { $w.uploadVideo1?.setValue(normalizeMedia(latestCompletion?.attachments)); } catch(e) {}
            try { $w.switch1?.setValue(true); } catch(e) {}
        }
        // ==========================================
        // 2. 智能开窗逻辑
        // 🚨 核心修复 2：多角色判断（用 includes 替代 ===）
        // 45(待派工)，或 50(施工准备)但工人还没提交施工准备时，项目经理打开 modal2 (派单弹窗)
        if ((orderStatus === '45' || (orderStatus === '50' && !hasConstructionStarted)) && role === 'manager') {
            if (!$w.modal2) throw new Error("找不到派单弹窗 modal2");
            $w.modal2.open(); 
        } else {
            // 其他合法状态，统统打开 modal1 (打卡弹窗)
            if (!$w.modal1) throw new Error("找不到打卡弹窗 modal1");
            $w.modal1.open(); 
        }
    } catch (e) {
        if (typeof wx !== 'undefined' && wx.showModal) {
            wx.showModal({ title: '拦截异常', content: e.message, showCancel: false });
        } else if ($w.utils && $w.utils.showModal) {
            $w.utils.showModal({ title: '拦截异常', content: e.message, showCancel: false });
        }
    }
}
