import { useState, useEffect } from 'react';
import { Table, Card, Tag } from 'antd';

function ResponsiveTable({ dataSource, columns, title, pagination = false }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div style={{ marginTop: '16px' }}>
        {title && (
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '12px' }}>
            {title}
          </h3>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {dataSource.map((item, index) => {
            const key = item.key || item._id || index;
            return (
              <Card 
                key={key} 
                style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {columns.map((col) => {
                    const cellValue = item[col.dataIndex];
                    let renderedValue = cellValue;
                    
                    if (col.render) {
                      try {
                        renderedValue = col.render(cellValue, item);
                      } catch (e) {
                        renderedValue = cellValue;
                      }
                    }
                    
                    if (renderedValue === null || renderedValue === undefined || renderedValue === '-') {
                      return null;
                    }
                    
                    return (
                      <div key={col.dataIndex} style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#64748b', 
                          marginBottom: '2px',
                          fontWeight: '500'
                        }}>
                          {col.title}
                        </span>
                        <span style={{ 
                          fontSize: '14px', 
                          color: '#1e293b',
                          wordBreak: 'break-all'
                        }}>
                          {renderedValue}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={pagination}
      bordered
    />
  );
}

export default ResponsiveTable;
