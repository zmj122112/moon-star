import { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Image, 
  Divider, 
  Table, 
  Tag, 
  Spin, 
  Button,
  Select,
  Form,
  Input,
  Alert,
  Modal
} from 'antd';
import { 
  ArrowLeftOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined, 
  CalendarOutlined,
  WalletOutlined,
  MessageOutlined,
  SendOutlined,
  UserOutlined,
  XOutlined,
  FileImageOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { cloudbase, db } from '../cloudbase';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/Layout';
import DateTimePicker from '../components/DateTimePicker';
import { normalizePhotos, getVisiblePhotoUrls } from '../utils/photoUtils';
import {
  CLOUD_STORAGE_BUCKET,
  RECORD_TYPE_MAP,
  getLatestWorkflowRecord,
  getStatusInfo,
  hasLaterWorkflowRecord,
  isInternalRole
} from '../config/business';
import { getCurrentUser, getCurrentUserId, withAuth } from '../utils/auth';
import { assertFunctionSuccess } from '../utils/cloudResults';

const { TextArea } = Input;
const { Title, Text } = Typography;

const PRIMARY_COLOR = '#2563eb';
const PRIMARY_HOVER = '#1d4ed8';
const TEXT_COLOR = '#1e293b';
const TEXT_SECONDARY = '#64748b';

const isImageFile = (name = '') => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(name);
const isPdfFile = (name = '') => /\.pdf$/i.test(name);
const isOfficeFile = (name = '') => /\.(doc|docx|xls|xlsx|ppt|pptx)$/i.test(name);
const isVideoFile = (name = '') => /\.(mp4|mov|m4v|webm)$/i.test(name);

const formatTimestampText = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return value;
  return new Date(numeric).toLocaleString('zh-CN');
};

const formatRecordContent = (content = '') => String(content)
  .replace(/预计进场时间：(\d{11,13})/g, (_, value) => `预计进场时间：${formatTimestampText(value)}`)
  .replace(/预约施工时间：(\d{11,13})/g, (_, value) => `预约施工时间：${formatTimestampText(value)}`)
  .replace(/预约勘测时间：(\d{11,13})/g, (_, value) => `预约勘测时间：${formatTimestampText(value)}`);

function WorkOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const [records, setRecords] = useState([]);
  const [managers, setManagers] = useState([]);
  const [upgradeForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 获取当前用户角色
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUserRole(user.role);
      } catch (e) {
        console.error('解析用户信息失败:', e);
      }
    }
  }, []);

  // 检查用户是否是内部人员（管理员、项目经理、客服等）
  const isInternalUser = () => {
    if (!currentUserRole || currentUserRole.length === 0) return true;
    return isInternalRole(currentUserRole);
  };

  const fetchManagers = async () => {
    try {
      const res = await db.collection('managers').get();
      let data = [];
      if (res && res.data) {
        data = Array.isArray(res.data) ? res.data : [];
      }
      const projectManagers = data.filter(m => {
        const role = m.role;
        if (!role) return false;
        if (Array.isArray(role)) {
          return role.some(r => 
            r.includes('manager') || r.includes('项目经理')
          );
        } else if (typeof role === 'string') {
          return role.includes('manager') || role.includes('项目经理');
        }
        return false;
      });
      setManagers(projectManagers.map(m => ({ value: m._id, label: m.name })));
    } catch (err) {
      console.error('获取项目经理列表失败:', err);
    }
  };

  const loadRecordsForOrder = async () => {
    const res = await db.collection('wo_records')
      .where({ order_id: id })
      .orderBy('createdAt', 'desc')
      .get();
    
    let recordsData = [];
    if (res && res.data) {
      recordsData = Array.isArray(res.data) ? res.data : [];
    }

    return recordsData;
  };

  const loadCurrentOrder = async () => {
    const res = await db.collection('workorders').doc(id).get();
    if (Array.isArray(res?.data)) {
      return res.data[0] || null;
    }
    return res?.data || null;
  };

  const handleUpgradeToSurvey = async (values) => {
    setSubmitting(true);
    try {
      let visitTime = null;
      if (values.visit_time) {
        if (values.visit_time.valueOf) {
          visitTime = values.visit_time.valueOf();
        } else {
          visitTime = new Date(values.visit_time).getTime();
        }
      }
      
      const managerId = values.manager_id;
      const remark = values.remark;

      const manager = managers.find(m => m.value === managerId);
      const currentUser = getCurrentUser();
      const userId = getCurrentUserId(currentUser);
      const latestOrder = await loadCurrentOrder();
      const latestRecords = await loadRecordsForOrder();
      if (!latestOrder) {
        throw new Error('工单不存在，请刷新后重试');
      }
      if (!['10', '20'].includes(String(latestOrder.status))) {
        throw new Error('工单状态已变化，当前不可修改派单信息');
      }
      if (hasLaterWorkflowRecord(latestRecords, '0', latestOrder)) {
        await fetchOrder();
        await fetchRecords();
        throw new Error('项目经理已保存或提交勘测/后续节点，派单信息不可再修改。如需处理，请走运维退回。');
      }
      const recordData = {
        order_id: id,
        record_type: '0',
        creator_role: 'cs',
        creator_name: currentUser?.name || '客服',
        creator_id: userId,
        content: remark || '客服接单并派单',
        price: 0,
        manager_id: managerId,
        manager_name: manager?.label || '',
        visit_time: visitTime,
        createdAt: new Date().getTime(),
      };
      
      try {
        const existingRecord = getLatestWorkflowRecord(latestRecords, '0', latestOrder);
        const updateRecordResult = await cloudbase.callFunction({
          name: 'update-record',
          data: withAuth({
            collection: 'wo_records',
            docId: existingRecord?._id,
            orderId: id,
            recordType: '0',
            upsert: true,
            allowedStatuses: ['10', '20'],
            data: {
              content: recordData.content,
              price: recordData.price,
              manager_id: recordData.manager_id,
              manager_name: recordData.manager_name,
              visit_time: recordData.visit_time,
              creator_role: recordData.creator_role,
              creator_name: recordData.creator_name,
              creator_id: recordData.creator_id,
              createdAt: recordData.createdAt,
              updatedAt: new Date().getTime()
            }
          })
        });
        assertFunctionSuccess(updateRecordResult, existingRecord?._id ? '派单流水更新失败' : '派单流水新增失败');
      } catch (addErr) {
        console.error('记录插入失败:', addErr);
        throw new Error('记录插入失败: ' + (addErr.message || '未知错误'));
      }

      const result = await cloudbase.callFunction({
        name: 'update-workorder',
        data: withAuth({
          orderId: id,
          status: '20',
          visit_time: visitTime,
          manager_id: managerId,
          cs_remark: remark
        })
      });
      assertFunctionSuccess(result, '工单派单信息更新失败');

      upgradeForm.resetFields();
      await fetchOrder();
      await fetchRecords();
    } catch (err) {
      console.error('升级状态失败:', err);
      const errorMessage = err.message || '未知错误';
      if (errorMessage.includes('不可') || errorMessage.includes('已变化')) {
        await fetchOrder();
        await fetchRecords();
      }
      alert('保存失败: ' + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const getImageUrl = (cloudPath) => {
    if (!cloudPath) return '';
    
    let filePath = cloudPath;
    if (filePath.startsWith('cloud://')) {
      const pathWithoutPrefix = filePath.replace('cloud://', '');
      const firstSlashIndex = pathWithoutPrefix.indexOf('/');
      if (firstSlashIndex !== -1) {
        filePath = pathWithoutPrefix.substring(firstSlashIndex + 1);
      } else {
        filePath = pathWithoutPrefix;
      }
    }
    
    return `https://${CLOUD_STORAGE_BUCKET}.tcb.qcloud.la/${filePath}`;
  };

  const fetchOrder = async () => {
    try {
      const res = await db.collection('workorders').doc(id).get();
      
      let orderData = null;
      if (res && res.data) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          orderData = res.data[0];
        } else if (typeof res.data === 'object' && res.data !== null) {
          orderData = res.data;
        }
      }
      
      if (orderData) {
        setOrder(orderData);
      } else {
        setError('工单不存在');
      }
    } catch (err) {
      console.error('获取工单信息失败:', err);
      setError(err.message || '获取工单信息失败');
    }
  };

  const fetchRecords = async () => {
    try {
      const recordsData = await loadRecordsForOrder();
      
      for (const record of recordsData) {
        if (record.creator_id) {
          try {
            const managerRes = await db.collection('managers')
              .where({ _id: record.creator_id })
              .get();
            if (managerRes && managerRes.data && managerRes.data.length > 0) {
              record.creator_name = managerRes.data[0].name || record.creator_name;
            }
          } catch (err) {
            console.error('查询操作人姓名失败:', err);
          }
        }
      }
      
      setRecords(recordsData);
    } catch (err) {
      console.error('获取工单跟进记录失败:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchOrder();
    fetchRecords();
    fetchManagers();
  }, [id]);

  useEffect(() => {
    const refreshLatest = () => {
      fetchOrder();
      fetchRecords();
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshLatest();
      }
    };

    window.addEventListener('focus', refreshLatest);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    const timer = window.setInterval(refreshLatest, 30000);

    return () => {
      window.removeEventListener('focus', refreshLatest);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.clearInterval(timer);
    };
  }, [id]);

  useEffect(() => {
    if (!order) return;
    upgradeForm.setFieldsValue({
      visit_time: order.visit_time || null,
      manager_id: order.manager_id || undefined,
      remark: order.cs_remark || ''
    });
  }, [order, upgradeForm]);

  if (loading) {
    return (
      <AppLayout>
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <Spin size="large" />
        </div>
      </AppLayout>
    );
  }

  if (error || !order) {
    return (
      <AppLayout>
        <Alert message={error || '工单不存在'} type="error" showIcon />
      </AppLayout>
    );
  }

  const statusStr = String(order.status);
  const statusInfo = getStatusInfo(statusStr);
  const canEditAssignment = ['10', '20'].includes(statusStr) && !hasLaterWorkflowRecord(records, '0', order);

  const recordColumns = [
    {
      title: '跟进类型',
      dataIndex: 'record_type',
      key: 'record_type',
      width: 150,
      render: (type) => {
        const info = RECORD_TYPE_MAP[String(type)] || { label: type, color: 'gray' };
        return <Tag color={info.color}>{info.label}</Tag>;
      },
    },
    {
      title: '操作人',
      dataIndex: 'creator_name',
      key: 'creator_name',
      width: 100,
      render: (name, record) => {
        if (name) return name;
        const role = record.creator_role;
        if (role === 'cs') return '客服';
        if (role === 'manager') return '项目经理';
        if (role === 'client') return '客户';
        return role || '-';
      },
    },
    {
      title: '描述',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '照片',
      dataIndex: 'images',
      key: 'images',
      width: 120,
      render: (images) => {
        const normalized = normalizePhotos(images);
        const displayPhotos = isInternalUser() ? normalized : normalized.filter(p => p.visible);
        
        if (!displayPhotos || displayPhotos.length === 0) {
          return '-';
        }
        
        return (
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {displayPhotos.slice(0, 3).map((img, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <Image
                  src={getImageUrl(img.url || img)}
                  alt={`照片${idx + 1}`}
                  style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                  fallback="https://via.placeholder.com/36x36?text=图"
                />
                {isInternalUser() && !img.visible && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <EyeInvisibleOutlined style={{ color: 'white', fontSize: '14px' }} />
                  </div>
                )}
              </div>
            ))}
            {displayPhotos.length > 3 && (
              <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
                +{displayPhotos.length - 3}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: '附件',
      dataIndex: 'attachments',
      key: 'attachments',
      width: 180,
      render: (attachments) => {
        if (!attachments || !Array.isArray(attachments) || attachments.length === 0) {
          return <span style={{ color: '#9ca3af' }}>-</span>;
        }
        const getFileIcon = (fileName) => {
          const lowerName = (fileName || '').toLowerCase();
          if (lowerName.includes('.jpg') || lowerName.includes('.jpeg') || lowerName.includes('.png') || lowerName.includes('.gif') || lowerName.includes('.bmp')) {
            return <FileImageOutlined style={{ fontSize: '14px' }} />;
          }
          if (lowerName.includes('.pdf')) {
            return <FilePdfOutlined style={{ fontSize: '14px' }} />;
          }
          if (lowerName.includes('.doc') || lowerName.includes('.docx')) {
            return <FileTextOutlined style={{ fontSize: '14px' }} />;
          }
          return <FileOutlined style={{ fontSize: '14px' }} />;
        };

        const handlePreview = (file) => {
          const fileName = typeof file === 'string' ? file.split('/').pop().replace(/^\d+_/, '') : (file.name || '附件');
          const fileUrl = typeof file === 'string' ? getImageUrl(file) : (file.url ? getImageUrl(file.url) : '#');
          
          const lowerName = fileName.toLowerCase();
          if (lowerName.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
            setPreviewImage(fileUrl);
          } else {
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileName;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        };

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '4px 0' }}>
            {attachments.slice(0, 3).map((file, idx) => {
              const fileName = typeof file === 'string' ? file.split('/').pop().replace(/^\d+_/, '') : (file.name || `附件${idx + 1}`);
              const fileUrl = typeof file === 'string' ? getImageUrl(file) : (file.url ? getImageUrl(file.url) : '#');
              const lowerFileName = (fileName || '').toLowerCase();
              const isPreviewable = lowerFileName.match(/\.(jpg|jpeg|png|gif|bmp|pdf|doc|docx|xls|xlsx|ppt|pptx)$/) || 
                                   lowerFileName.match(/\.(jpg|jpeg|png|gif|bmp|pdf|doc|docx|xls|xlsx|ppt|pptx)/);
              
              const handleFileClick = () => {
                handlePreview(file);
              };
              
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
                  <span 
                    onClick={handleFileClick}
                    style={{ 
                      fontSize: '12px', 
                      color: '#2563eb', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flex: 1,
                      wordBreak: 'break-all',
                      whiteSpace: 'normal',
                      lineHeight: '1.4'
                    }}
                    title="点击打开"
                  >
                    {getFileIcon(fileName)}
                    {fileName.length > 18 ? fileName.substring(0, 18) + '...' : fileName}
                  </span>
                  <span
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = fileUrl;
                      link.download = fileName;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    style={{ 
                      fontSize: '14px', 
                      color: '#64748b',
                      width: '20px',
                      textAlign: 'center',
                      display: 'inline-block',
                      cursor: 'pointer'
                    }}
                    title="下载"
                  >
                    ↓
                  </span>
                </div>
              );
            })}
            {attachments.length > 3 && (
              <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px', display: 'block' }}>
                +{attachments.length - 3} 个附件
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price) => price ? `¥${price.toFixed(2)}` : '-',
    },
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (time) => new Date(time).toLocaleString('zh-CN'),
    },
  ];

  if (isMobile) {
    return (
      <AppLayout>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/admin')}
              style={{ marginRight: '12px', color: TEXT_SECONDARY }}
            />
            <Title level={2} style={{ marginBottom: '0', color: TEXT_COLOR, fontSize: '18px' }}>工单详情</Title>
          </div>

          {canEditAssignment && (
            <Card 
              title={statusStr === '20' ? '修改派单信息' : '安排勘测'} 
              style={{ 
                marginBottom: '16px', 
                borderLeft: '4px solid ' + PRIMARY_COLOR,
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
              }}
            >
              <Form
                form={upgradeForm}
                onFinish={handleUpgradeToSurvey}
                layout="vertical"
              >
                <Form.Item 
                  name="visit_time" 
                  label="预约勘测时间"
                  rules={[{ required: true, message: '请选择预约勘测时间' }]}
                >
                  <DateTimePicker placeholder="选择日期时间" />
                </Form.Item>
                <Form.Item 
                  name="manager_id" 
                  label="项目经理"
                  rules={[{ required: true, message: '请选择项目经理' }]}
                >
                  <Select 
                    style={{ width: '100%', borderRadius: '8px' }} 
                    placeholder="请选择项目经理"
                    options={managers}
                  />
                </Form.Item>
                <Form.Item name="remark" label="沟通备注">
                  <TextArea 
                    placeholder="请输入与客户沟通的信息..." 
                    rows={3} 
                    style={{ borderRadius: '8px', borderColor: '#e2e8f0' }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={submitting}
                    icon={<SendOutlined />}
                    style={{ 
                      width: '100%',
                      height: '48px',
                      backgroundColor: PRIMARY_COLOR,
                      borderColor: PRIMARY_COLOR,
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}
                  >
                    确认安排勘测
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          )}

          <Card style={{ marginBottom: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <Title level={2} style={{ color: TEXT_COLOR, fontSize: '18px' }}>{order.name || '未命名'} 的工单</Title>
                <Text style={{ color: TEXT_SECONDARY, fontSize: '13px' }}>工单编号：{order.order_no || order._id}</Text>
              </div>
              <Tag color={statusInfo?.color || 'gray'} style={{ fontSize: '14px', padding: '6px 12px' }}>
                {statusInfo?.label || order.status}
              </Tag>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>联系电话：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.phone || '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EnvironmentOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>地址：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.addresses || '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>预约勘测：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.visit_time ? new Date(order.visit_time).toLocaleString('zh-CN') : '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>项目经理：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.manager_id ? (managers.find(m => m.value === order.manager_id)?.label || order.manager_id) : '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>预约施工：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.date_appointment ? new Date(order.date_appointment).toLocaleString('zh-CN') : '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <WalletOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>总价：</Text>
                <Text style={{ fontSize: '18px', color: PRIMARY_COLOR, fontWeight: 'bold' }}>
                  ¥{(order.total_price || 0).toFixed(2)}
                </Text>
              </div>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div>
              <Text strong style={{ color: TEXT_COLOR }}>备注：</Text>
              <p style={{ margin: '8px 0', color: TEXT_COLOR }}>{order.description || '-'}</p>
            </div>
            <div>
              <Text strong style={{ color: TEXT_COLOR }}>客服备注：</Text>
              <p style={{ margin: '8px 0', color: PRIMARY_COLOR }}>{order.cs_remark || '-'}</p>
            </div>
            {order.review_stars && (
              <>
                <Divider />
                <div>
                  <Text strong style={{ color: TEXT_COLOR }}>客户评价：</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star} 
                        style={{ 
                          fontSize: '20px', 
                          color: star <= order.review_stars ? '#f59e0b' : '#e5e7eb' 
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {order.customer_review && (
                    <p style={{ margin: '8px 0', color: TEXT_COLOR }}>"{order.customer_review}"</p>
                  )}
                </div>
              </>
            )}
          </Card>

          {order.images && order.images.length > 0 && (() => {
              const normalized = normalizePhotos(order.images);
              const displayPhotos = isInternalUser() ? normalized : normalized.filter(p => p.visible);
              
              if (displayPhotos.length === 0) return null;
              
              return (
                <Card title="现场照片" style={{ marginBottom: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {displayPhotos.map((img, index) => (
                      <div key={index} style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <Image 
                          src={getImageUrl(img.url || img)} 
                          alt={`照片${index + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          fallback="https://via.placeholder.com/200x200?text=图片加载失败"
                        />
                        {isInternalUser() && !img.visible && (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <EyeInvisibleOutlined style={{ color: 'white', fontSize: '24px' }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })()}

          <Card title="工单跟进记录" style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
            {records.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {records.map((record, index) => {
                  const typeInfo = RECORD_TYPE_MAP[String(record.record_type)] || { label: record.record_type, color: 'gray' };
                  return (
                    <Card key={record._id || index} style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <Tag color={typeInfo.color}>{typeInfo.label}</Tag>
                        <Text style={{ fontSize: '12px', color: TEXT_SECONDARY }}>
                          {new Date(record.createdAt).toLocaleString('zh-CN')}
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <UserOutlined style={{ color: PRIMARY_COLOR }} />
                        <Text style={{ fontSize: '13px', color: TEXT_COLOR }}>
                          {record.creator_name || (record.creator_role === 'cs' ? '客服' : record.creator_role === 'manager' ? '项目经理' : '客户')}
                        </Text>
                      </div>
                      <p style={{ color: TEXT_COLOR, fontSize: '14px', marginBottom: '8px' }}>{formatRecordContent(record.content)}</p>
                      {record.price && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <WalletOutlined style={{ color: PRIMARY_COLOR }} />
                          <Text style={{ color: PRIMARY_COLOR, fontWeight: '500' }}>¥{record.price.toFixed(2)}</Text>
                        </div>
                      )}
                      {record.images && record.images.length > 0 && (() => {
                      const normalized = normalizePhotos(record.images);
                      const displayPhotos = isInternalUser() ? normalized : normalized.filter(p => p.visible);
                      
                      if (displayPhotos.length === 0) return null;
                      
                      return (
                        <div style={{ marginTop: '12px' }}>
                          <Text style={{ fontSize: '12px', color: TEXT_SECONDARY, marginBottom: '8px', display: 'block' }}>照片：</Text>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {displayPhotos.slice(0, 3).map((img, idx) => (
                              <div key={idx} style={{ position: 'relative' }}>
                                <Image
                                  src={getImageUrl(img.url || img)}
                                  alt={`照片${idx + 1}`}
                                  style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }}
                                />
                                {isInternalUser() && !img.visible && (
                                  <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    <EyeInvisibleOutlined style={{ color: 'white', fontSize: '16px' }} />
                                  </div>
                                )}
                              </div>
                            ))}
                            {displayPhotos.length > 3 && (
                              <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
                                +{displayPhotos.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                      {record.attachments && record.attachments.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          <Text style={{ fontSize: '12px', color: TEXT_SECONDARY, marginBottom: '8px', display: 'block' }}>附件：</Text>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {record.attachments.slice(0, 2).map((file, idx) => {
                              const fileName = typeof file === 'string' ? file.split('/').pop().replace(/^\d+_/, '') : (file.name || `附件${idx + 1}`);
                              const fileUrl = typeof file === 'string' ? getImageUrl(file) : (file.url ? getImageUrl(file.url) : '#');
                              
                              const handleFileClick = () => {
                                if (isImageFile(fileName)) {
                                  setPreviewImage(fileUrl);
                                } else if (isPdfFile(fileName) || isOfficeFile(fileName) || isVideoFile(fileName)) {
                                  setPreviewFile({ name: fileName, url: fileUrl });
                                  setPreviewModalVisible(true);
                                } else {
                                  const link = document.createElement('a');
                                  link.href = fileUrl;
                                  link.download = fileName;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }
                              };
                              
                              return (
                                <span
                                  key={idx}
                                  onClick={handleFileClick}
                                  style={{ fontSize: '13px', color: PRIMARY_COLOR, wordBreak: 'break-all', cursor: 'pointer' }}
                                >
                                  {fileName}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: TEXT_SECONDARY }}>
                <MessageOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <p>暂无跟进记录</p>
              </div>
            )}
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
      <AppLayout>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/admin')}
            style={{ marginRight: '12px', color: TEXT_SECONDARY }}
          >
            返回列表
          </Button>
          <Title level={2} style={{ marginBottom: '0', color: TEXT_COLOR }}>工单详情</Title>
        </div>

        {canEditAssignment && (
          <Card 
            title={statusStr === '20' ? '修改派单信息' : '安排勘测'} 
            style={{ 
              marginBottom: '24px', 
              borderLeft: '4px solid ' + PRIMARY_COLOR,
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
            }}
          >
            <Form
              form={upgradeForm}
              onFinish={handleUpgradeToSurvey}
              layout="vertical"
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item 
                    name="visit_time" 
                    label="预约勘测时间"
                    rules={[{ required: true, message: '请选择预约勘测时间' }]}
                  >
                    <DateTimePicker placeholder="选择日期时间" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item 
                    name="manager_id" 
                    label="项目经理"
                    rules={[{ required: true, message: '请选择项目经理' }]}
                  >
                    <Select 
                      style={{ width: '100%', borderRadius: '6px' }} 
                      placeholder="请选择项目经理"
                      options={managers}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item style={{ marginTop: '24px' }}>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={submitting}
                      icon={<SendOutlined />}
                      style={{ 
                        backgroundColor: PRIMARY_COLOR,
                        borderColor: PRIMARY_COLOR,
                        borderRadius: '6px',
                        boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
                      }}
                      hoverStyle={{ 
                        backgroundColor: PRIMARY_HOVER,
                        borderColor: PRIMARY_HOVER,
                        boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)'
                      }}
                    >
                      确认安排勘测
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="remark" label="沟通备注">
                <TextArea 
                  placeholder="请输入与客户沟通的信息..." 
                  rows={3} 
                  style={{ borderRadius: '6px', borderColor: '#e2e8f0' }}
                />
              </Form.Item>
            </Form>
          </Card>
        )}

        <Card style={{ marginBottom: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <Title level={2} style={{ color: TEXT_COLOR }}>{order.name || '未命名'} 的工单</Title>
              <Text style={{ color: TEXT_SECONDARY }}>工单编号：{order.order_no || order._id}</Text>
            </div>
            <Tag color={statusInfo?.color || 'gray'} style={{ fontSize: '16px', padding: '8px 16px' }}>
              {statusInfo?.label || order.status}
            </Tag>
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <PhoneOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>联系电话：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.phone || '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <EnvironmentOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>地址：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.addresses || '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <CalendarOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>预约勘测：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.visit_time ? new Date(order.visit_time).toLocaleString('zh-CN') : '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <UserOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>项目经理：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.manager_id ? (managers.find(m => m.value === order.manager_id)?.label || order.manager_id) : '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <CalendarOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>预约施工：</Text>
                <Text style={{ color: TEXT_COLOR }}>{order.date_appointment ? new Date(order.date_appointment).toLocaleString('zh-CN') : '-'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <WalletOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ color: TEXT_COLOR }}>总价：</Text>
                <Text style={{ fontSize: '18px', color: PRIMARY_COLOR, fontWeight: 'bold' }}>
                  ¥{(order.total_price || 0).toFixed(2)}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Text strong style={{ color: TEXT_COLOR }}>备注：</Text>
              <p style={{ margin: '8px 0', color: TEXT_COLOR }}>{order.description || '-'}</p>
              <Divider />
              <Text strong style={{ color: TEXT_COLOR }}>客服备注：</Text>
              <p style={{ margin: '8px 0', color: PRIMARY_COLOR }}>{order.cs_remark || '-'}</p>
              {order.review_stars && (
                <>
                  <Divider />
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong style={{ color: TEXT_COLOR }}>客户评价：</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span 
                          key={star} 
                          style={{ 
                            fontSize: '20px', 
                            color: star <= order.review_stars ? '#f59e0b' : '#e5e7eb' 
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    {order.customer_review && (
                      <p style={{ margin: '8px 0', color: TEXT_COLOR }}>"{order.customer_review}"</p>
                    )}
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Card>

        {order.images && order.images.length > 0 && (() => {
              const normalized = normalizePhotos(order.images);
              const displayPhotos = isInternalUser() ? normalized : normalized.filter(p => p.visible);
              
              if (displayPhotos.length === 0) return null;
              
              return (
                <Card title="现场照片" style={{ marginBottom: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {displayPhotos.map((img, index) => (
                      <div key={index} style={{ position: 'relative', width: '200px', height: '200px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <Image 
                          src={getImageUrl(img.url || img)} 
                          alt={`照片${index + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          fallback="https://via.placeholder.com/200x200?text=图片加载失败"
                        />
                        {isInternalUser() && !img.visible && (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <EyeInvisibleOutlined style={{ color: 'white', fontSize: '32px' }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })()}

        <Card title="工单跟进记录" style={{ borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
          {records.length > 0 ? (
            <Table
              dataSource={records.map((item, index) => ({ ...item, key: item._id || index }))}
              columns={recordColumns}
              pagination={false}
              bordered
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: TEXT_SECONDARY }}>
              <MessageOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <p>暂无跟进记录</p>
            </div>
          )}
        </Card>

        <Modal
          visible={previewModalVisible}
          title={previewFile?.name || '附件预览'}
          footer={null}
          onCancel={() => setPreviewModalVisible(false)}
          width="90%"
          destroyOnClose
          bodyStyle={{ padding: 0 }}
        >
          {previewFile && (
            <>
              {isImageFile(previewFile.name) ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px', padding: '20px' }}>
                  <Image
                    src={previewFile.url}
                    alt={previewFile.name}
                    style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
                    fallback="https://via.placeholder.com/400x300?text=图片加载失败"
                  />
                </div>
              ) : isVideoFile(previewFile.name) ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px', padding: '20px', background: '#000' }}>
                  <video
                    src={previewFile.url}
                    controls
                    preload="metadata"
                    style={{ width: '100%', maxHeight: '600px' }}
                  />
                </div>
              ) : isPdfFile(previewFile.name) ? (
                <div style={{ width: '100%', height: '600px' }}>
                  <embed
                    src={previewFile.url}
                    type="application/pdf"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              ) : isOfficeFile(previewFile.name) ? (
                <div style={{ width: '100%', height: '600px' }}>
                  <iframe
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(previewFile.url)}`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title={previewFile.name}
                  />
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                  <FileOutlined style={{ fontSize: '64px', color: '#9ca3af', marginBottom: '16px' }} />
                  <p style={{ color: '#6b7280', fontSize: '16px' }}>
                    该文件类型不支持在线预览
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '8px' }}>
                    {previewFile.name}
                  </p>
                  <Button
                    type="primary"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = previewFile.url;
                      link.download = previewFile.name;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    style={{ marginTop: '16px' }}
                  >
                    点击下载
                  </Button>
                </div>
              )}
            </>
          )}
        </Modal>

        <Modal
          open={!!previewImage}
          title="图片预览"
          footer={null}
          onCancel={() => setPreviewImage(null)}
          width="90%"
          destroyOnClose
          bodyStyle={{ padding: 0 }}
        >
          {previewImage && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', padding: '20px' }}>
              <Image
                src={previewImage}
                alt="预览"
                style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
              />
            </div>
          )}
        </Modal>
      </AppLayout>
  );
}

export default WorkOrderDetail;
