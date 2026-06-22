import { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Tag, 
  Button, 
  Form, 
  Input, 
  InputNumber,
  Table,
  Divider,
  message,
  Space,
  Descriptions,
  Image,
  Upload,
  Modal,
  Checkbox
} from 'antd';
import { 
  ArrowLeftOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined, 
  CalendarOutlined,
  DollarOutlined,
  SendOutlined,
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { cloudbase, db, storage, uploadFileViaCloudFunction } from '../cloudbase';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/Layout';
import { normalizePhotos, updatePhotoVisibility, formatForStorage } from '../utils/photoUtils';
import {
  CLOUD_STORAGE_BUCKET,
  RECORD_TYPE_MAP,
  getLatestWorkflowRecord,
  getWorkflowRecordTime,
  getStatusInfo,
  hasLaterWorkflowRecord
} from '../config/business';
import { getCurrentUser, getCurrentUserId, withAuth } from '../utils/auth';
import { assertFunctionSuccess } from '../utils/cloudResults';

const { TextArea } = Input;
const { Title, Text } = Typography;

const imageUploadProps = {
  name: 'file',
  action: '',
  listType: 'picture-card',
  accept: 'image/*',
  multiple: true,
  beforeUpload: () => false,
};

const attachmentUploadProps = {
  name: 'file',
  action: '',
  accept: '.doc,.docx,.pdf,.xls,.xlsx,.zip,.rar',
  multiple: true,
  beforeUpload: () => false,
};

const PRIMARY_COLOR = '#2563eb';
const PRIMARY_HOVER = '#1d4ed8';
const TEXT_COLOR = '#1e293b';
const TEXT_SECONDARY = '#64748b';

const formatTimestampText = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return value;
  return new Date(numeric).toLocaleString('zh-CN');
};

const formatRecordContent = (content = '') => String(content)
  .replace(/预计进场时间：(\d{11,13})/g, (_, value) => `预计进场时间：${formatTimestampText(value)}`)
  .replace(/预约施工时间：(\d{11,13})/g, (_, value) => `预约施工时间：${formatTimestampText(value)}`)
  .replace(/预约勘测时间：(\d{11,13})/g, (_, value) => `预约勘测时间：${formatTimestampText(value)}`);

const isImageFile = (name = '') => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(name);
const isPdfFile = (name = '') => /\.pdf$/i.test(name);
const isOfficeFile = (name = '') => /\.(doc|docx|xls|xlsx|ppt|pptx)$/i.test(name);
const isVideoFile = (name = '') => /\.(mp4|mov|m4v|webm)$/i.test(name);

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

function ProjectManagerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [quoteForm] = Form.useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedAttachments, setUploadedAttachments] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [filePreviewVisible, setFilePreviewVisible] = useState(false);
  
  // 照片可见性编辑相关状态（保留但不再使用模态框）
  const [photoEditModalVisible, setPhotoEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editingPhotos, setEditingPhotos] = useState([]);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    
    fetchOrder();
    fetchRecords();
  }, []);

  useEffect(() => {
    if (!order || records.length === 0) return;
    const latestQuote = getLatestWorkflowRecord(records, '2', order);
    if (!latestQuote) return;
    quoteForm.setFieldsValue({
      price: latestQuote.price || order.total_price || 0,
      scheme: latestQuote.content || '',
      remark: ''
    });
  }, [order, records, quoteForm]);

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
        setError('项目不存在');
      }
    } catch (err) {
      console.error('获取项目信息失败:', err);
      setError(err.message || '获取项目信息失败');
    } finally {
      setLoading(false);
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
    }
  };

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

  const handleQuoteSubmit = async (values) => {
    if (!order || !currentUser) return;

    setSubmitting(true);
    try {
      console.log('=== 开始提交报价 ===');
      console.log('当前用户:', currentUser);
      console.log('订单信息:', order);
      console.log('表单值:', values);
      console.log('待上传图片:', uploadedImages.length);
      console.log('待上传附件:', uploadedAttachments.length);

      const userId = getCurrentUserId(currentUser);
      const latestOrder = await loadCurrentOrder();
      const latestRecords = await loadRecordsForOrder();
      if (!latestOrder) {
        throw new Error('工单不存在，请刷新后重试');
      }
      if (!['30', '40'].includes(String(latestOrder.status))) {
        await fetchOrder();
        await fetchRecords();
        throw new Error('工单状态已变化，当前不可修改报价信息');
      }
      const existingQuoteRecord = getLatestWorkflowRecord(latestRecords, '2', latestOrder);
      if (hasLaterWorkflowRecord(latestRecords, '2', latestOrder)) {
        await fetchOrder();
        await fetchRecords();
        throw new Error('客户或后续节点已经处理，当前报价不可修改');
      }

      const imageUrls = [];
      if (uploadedImages.length > 0) {
        console.log('开始上传图片...');
        for (const file of uploadedImages) {
          if (file.originFileObj) {
            console.log('上传图片:', file.name, file.originFileObj.size);
            try {
              const url = await uploadFileViaCloudFunction(file.originFileObj, 'quote/images');
              imageUrls.push(url);
              console.log('图片上传成功:', url);
            } catch (err) {
              console.error('图片上传失败:', err.message, err.stack);
              message.warning(`图片 ${file.name} 上传失败，已跳过: ${err.message}`);
            }
          }
        }
      }

      const attachmentUrls = [];
      if (uploadedAttachments.length > 0) {
        console.log('开始上传附件...');
        for (const file of uploadedAttachments) {
          if (file.originFileObj) {
            console.log('上传附件:', file.name, file.originFileObj.size);
            try {
              const url = await uploadFileViaCloudFunction(file.originFileObj, 'quote/attachments');
              attachmentUrls.push(url);
              console.log('附件上传成功:', url);
            } catch (err) {
              console.error('附件上传失败:', err.message, err.stack);
              message.warning(`附件 ${file.name} 上传失败，已跳过: ${err.message}`);
            }
          }
        }
      }

      const recordData = {
        order_id: latestOrder._id || order._id,
        record_type: '2',
        creator_role: 'manager',
        creator_name: currentUser?.name || '项目经理',
        creator_id: userId,
        content: `提交报价方案：${values.scheme || ''}，报价金额：¥${values.price || 0}，备注：${values.remark || ''}`,
        price: values.price || 0,
        manager_name: currentUser?.name || '',
        createdAt: new Date().getTime(),
        images: imageUrls.length > 0 ? imageUrls : (existingQuoteRecord?.images || []),
        attachments: attachmentUrls.length > 0 ? attachmentUrls : (existingQuoteRecord?.attachments || []),
      };

      console.log(existingQuoteRecord?._id ? '通过报价事务修改报价...' : '通过报价事务提交报价...');
      const updateResult = await cloudbase.callFunction({
        name: 'quote-workflow',
        data: withAuth({
          action: 'save_initial',
          orderId: latestOrder._id || order._id,
          actorId: userId,
          expectedStatus: String(latestOrder.status),
          expectedQuoteVersion: latestOrder.quote_version === undefined || latestOrder.quote_version === null || latestOrder.quote_version === ''
            ? undefined
            : Number(latestOrder.quote_version),
          expectedQuoteUpdatedAt: getWorkflowRecordTime(existingQuoteRecord || {}),
          expectedPrice: Number(latestOrder.total_price || 0),
          price: recordData.price,
          content: recordData.content,
          images: recordData.images,
          attachments: recordData.attachments,
          creatorName: recordData.creator_name
        })
      });
      assertFunctionSuccess(updateResult, existingQuoteRecord?._id ? '报价记录更新失败' : '报价记录新增失败');

      message.success(existingQuoteRecord?._id ? '报价修改成功' : '报价提交成功');
      setUploadedImages([]);
      setUploadedAttachments([]);
      navigate('/project-manager');
    } catch (err) {
      console.error('报价提交失败:', err);
      message.error(err.message || '报价提交失败');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUploadChange = ({ fileList }) => {
    setUploadedImages(fileList);
  };

  const handleImageRemove = (file) => {
    const newList = uploadedImages.filter(item => item.uid !== file.uid);
    setUploadedImages(newList);
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url || getImageUrl(file.response));
    setPreviewVisible(true);
  };

  const handleAttachmentUploadChange = ({ fileList }) => {
    setUploadedAttachments(fileList);
  };

  const handleAttachmentRemove = (file) => {
    const newList = uploadedAttachments.filter(item => item.uid !== file.uid);
    setUploadedAttachments(newList);
  };

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
      render: (content) => formatRecordContent(content),
    },
    {
      title: '照片',
      dataIndex: 'images',
      key: 'images',
      width: 180,
      render: (images, record) => {
        const normalizedImages = normalizePhotos(images);
        if (!normalizedImages || normalizedImages.length === 0) {
          return '-';
        }
        
        const toggleVisibility = async (index) => {
          const docId = record._id || record.id;
          const currentImages = normalizePhotos(record.images);
          const newPhotos = [...currentImages];
          newPhotos[index].visible = !newPhotos[index].visible;
          
          try {
            const updatedPhotos = formatForStorage(newPhotos);
            
            const res = await db.collection('wo_records').doc(docId).update({
              images: updatedPhotos,
              updateTime: db.serverDate()
            });
            
            if (res.stats && res.stats.updated > 0) {
              updateLocalRecords(docId, updatedPhotos);
              message.success(newPhotos[index].visible ? '照片已设为可见' : '照片已设为隐藏');
            } else {
              await updateViaCloudFunction(docId, updatedPhotos, newPhotos[index].visible);
            }
          } catch (error) {
            await updateViaCloudFunction(docId, formatForStorage(newPhotos), newPhotos[index].visible);
          }
        };
        
        const updateLocalRecords = (docId, updatedPhotos) => {
          setRecords(prev => prev.map(r => {
            const rId = r._id || r.id;
            if (rId === docId) {
              return { ...r, images: updatedPhotos };
            }
            return r;
          }));
        };
        
        const updateViaCloudFunction = async (docId, updatedPhotos, isVisible) => {
          try {
            const result = await cloudbase.callFunction({
              name: 'update-record',
              data: withAuth({
                collection: 'wo_records',
                docId: docId,
                orderId: record.order_id,
                recordType: String(record.record_type || ''),
                data: {
                  images: updatedPhotos,
                  updateTime: new Date().getTime()
                }
              })
            });
            
            if (result && result.result && result.result.success) {
              updateLocalRecords(docId, updatedPhotos);
              message.success(isVisible ? '照片已设为可见' : '照片已设为隐藏');
            } else {
              message.error(result?.result?.message || '更新失败，请联系管理员');
            }
          } catch (error) {
            message.error('更新失败: ' + error.message);
          }
        };
        
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {normalizedImages.slice(0, 3).map((img, idx) => {
                const isVisible = img.visible !== false;
                return (
                  <div key={idx} style={{ position: 'relative', width: '48px', height: '48px' }}>
                    <Image
                      src={getImageUrl(img.url || img)}
                      alt={`照片${idx + 1}`}
                      style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
                      fallback="https://via.placeholder.com/48x48?text=图"
                    />
                    {!isVisible && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: 'white', fontSize: '16px' }}>●</span>
                      </div>
                    )}
                    <button
                      onClick={() => toggleVisibility(idx)}
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        border: '2px solid white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isVisible ? '#22c55e' : '#dc2626',
                        color: 'white',
                        fontSize: '11px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                        zIndex: 10,
                        padding: 0
                      }}
                      title={isVisible ? '点击隐藏此照片' : '点击显示此照片'}
                    >
                      {isVisible ? '👁' : '👁‍🗨'}
                    </button>
                  </div>
                );
              })}
              {normalizedImages.length > 3 && (
                <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
                  +{normalizedImages.length - 3}
                </span>
              )}
            </div>
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
      title: '附件',
      dataIndex: 'attachments',
      key: 'attachments',
      width: 180,
      render: (attachments) => {
        if (!attachments || !Array.isArray(attachments) || attachments.length === 0) {
          return <span style={{ color: '#9ca3af' }}>-</span>;
        }
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '4px 0' }}>
            {attachments.slice(0, 3).map((file, idx) => {
              const fileName = file.split('/').pop().replace(/^\d+_/, '');
              const fileUrl = getImageUrl(file);
              
              const handleFileClick = () => {
                if (isImageFile(fileName)) {
                  setPreviewImage(fileUrl);
                  setPreviewVisible(true);
                } else if (isPdfFile(fileName) || isOfficeFile(fileName) || isVideoFile(fileName)) {
                  setPreviewFile({ name: fileName, url: fileUrl });
                  setFilePreviewVisible(true);
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
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
                  <span 
                    onClick={handleFileClick}
                    style={{ 
                      fontSize: '12px', 
                      color: '#2563eb', 
                      cursor: 'pointer',
                      wordBreak: 'break-all',
                      flex: 1,
                      whiteSpace: 'normal',
                      lineHeight: '1.4'
                    }}
                    title="点击打开"
                  >
                    📎 {fileName.length > 18 ? fileName.substring(0, 18) + '...' : fileName}
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
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (time) => time ? new Date(time).toLocaleString('zh-CN') : '-',
    },
  ];

  const handleGoBack = () => {
    navigate('/project-manager');
  };

  if (loading) {
    return (
      <AppLayout>
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <Title level={3}>加载中...</Title>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <Title level={3} style={{ color: '#dc2626' }}>{error}</Title>
        </div>
      </AppLayout>
    );
  }

  const statusInfo = getStatusInfo(order?.status);
  const canEditQuote = ['30', '40'].includes(String(order?.status)) && !hasLaterWorkflowRecord(records, '2', order);

  return (
    <AppLayout>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            style={{ marginRight: '16px' }}
          >
            返回列表
          </Button>
          <Title level={2} style={{ margin: 0 }}>项目详情</Title>
        </div>

        <Card 
          style={{ 
            marginBottom: '24px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
          }}
        >
          <Title level={4} style={{ marginBottom: '20px' }}>基本信息</Title>
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="联系人" span={2}>
              <span style={{ fontWeight: '500', fontSize: '15px' }}>{order.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label="联系电话">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PhoneOutlined style={{ color: TEXT_SECONDARY }} />
                {order.phone}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="项目地址" span={2}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <EnvironmentOutlined style={{ color: TEXT_SECONDARY }} />
                {order.addresses}
              </span>
            </Descriptions.Item>
            
            <Descriptions.Item label="当前状态">
              <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="预约勘测">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CalendarOutlined style={{ color: TEXT_SECONDARY }} />
                {order.visit_time ? new Date(order.visit_time).toLocaleString('zh-CN') : '-'}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="预约施工">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CalendarOutlined style={{ color: TEXT_SECONDARY }} />
                {order.date_appointment ? new Date(order.date_appointment).toLocaleString('zh-CN') : '-'}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="总价" span={2}>
                <span style={{ color: PRIMARY_COLOR, fontWeight: '600', fontSize: '16px' }}>
                  ¥{(order.final_price || order.total_price || 0).toFixed(2)}
                </span>
              </Descriptions.Item>
            {order.cs_remark && (
              <Descriptions.Item label="客服备注" span={2}>{order.cs_remark}</Descriptions.Item>
            )}
            {order.manager_remark && (
              <Descriptions.Item label="项目经理备注" span={2}>{order.manager_remark}</Descriptions.Item>
            )}
            {order.review_stars && (
              <Descriptions.Item label="客户评价" span={2}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star} 
                      style={{ 
                        fontSize: '18px', 
                        color: star <= order.review_stars ? '#f59e0b' : '#e5e7eb' 
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {order.customer_review && (
                  <p style={{ margin: '8px 0 0', color: TEXT_COLOR }}>"{order.customer_review}"</p>
                )}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="创建时间">
              {order.createdAt ? new Date(order.createdAt).toLocaleString('zh-CN') : '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {canEditQuote && (
          <Card 
            style={{ 
              marginBottom: '24px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
            }}
          >
            <Title level={4} style={{ marginBottom: '20px' }}>
              {String(order.status) === '40' ? '修改报价方案' : '提交报价方案'}
            </Title>
            <Form
              form={quoteForm}
              layout="vertical"
              onFinish={handleQuoteSubmit}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="报价金额（元）"
                    name="price"
                    rules={[{ required: true, message: '请输入报价金额' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      min={0}
                      precision={2}
                      placeholder="请输入报价金额"
                      formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/¥\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                label="方案说明"
                name="scheme"
                rules={[{ required: true, message: '请输入方案说明' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="请详细描述施工方案、材料清单、施工工艺等"
                />
              </Form.Item>

              <Form.Item
                label="备注"
                name="remark"
              >
                <TextArea
                  rows={3}
                  placeholder="其他补充说明（选填）"
                />
              </Form.Item>

              <Form.Item label="方案图片">
                <Upload
                  {...imageUploadProps}
                  fileList={uploadedImages}
                  onChange={handleImageUploadChange}
                  onRemove={handleImageRemove}
                  onPreview={handlePreview}
                >
                  {uploadedImages.length >= 6 ? null : (
                    <div style={{ padding: '32px' }}>
                      <PlusOutlined style={{ fontSize: '24px', color: '#999' }} />
                      <p style={{ marginTop: '8px', color: '#999' }}>点击上传图片</p>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item label="方案附件">
                <Upload
                  {...attachmentUploadProps}
                  fileList={uploadedAttachments}
                  onChange={handleAttachmentUploadChange}
                  onRemove={handleAttachmentRemove}
                >
                  <Button icon={<PlusOutlined />}>
                    点击上传附件
                  </Button>
                </Upload>
                <p style={{ marginTop: '8px', color: '#999', fontSize: '12px' }}>
                  支持上传 .doc .docx .pdf .xls .xlsx .zip .rar 格式文件
                </p>
              </Form.Item>

              <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                <Space>
                  <Button onClick={handleGoBack}>
                    取消
                  </Button>
                  <Button type="primary" htmlType="submit" loading={submitting} icon={<SendOutlined />}>
                    {String(order.status) === '40' ? '保存修改' : '提交报价'}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        )}

        <Card 
          style={{ 
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
          }}
        >
          <Title level={4} style={{ marginBottom: '20px' }}>工单跟进记录</Title>
          <Table
            dataSource={records.map((item, index) => ({ ...item, key: item._id || index }))}
            columns={recordColumns}
            pagination={false}
            bordered={false}
            size="middle"
          />
        </Card>

        <Modal
            visible={previewVisible}
            footer={null}
            onCancel={() => setPreviewVisible(false)}
          >
            <Image 
              alt="预览图片" 
              src={previewImage} 
              style={{ width: '100%' }} 
            />
          </Modal>

          <Modal
            visible={filePreviewVisible}
            title={previewFile?.name || '附件预览'}
            footer={null}
            onCancel={() => setFilePreviewVisible(false)}
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
                    <p style={{ color: '#6b7280', fontSize: '16px' }}>
                      该文件类型不支持在线预览
                    </p>
                    <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '8px' }}>
                      {previewFile.name}
                    </p>
                  </div>
                )}
              </>
            )}
          </Modal>
      </div>
      </AppLayout>
  );
}

export default ProjectManagerDetail;
