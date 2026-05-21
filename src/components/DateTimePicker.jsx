import { useState, useEffect } from 'react';
import { CalendarOutlined } from '@ant-design/icons';

function DateTimePicker({ value, onChange, placeholder }) {
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      setLocalValue(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      if (!newValue) {
        onChange(null);
        return;
      }
      const [datePart, timePart] = newValue.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);
      const timestamp = new Date(year, month - 1, day, hours, minutes).getTime();
      onChange(timestamp);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <CalendarOutlined 
        style={{ 
          position: 'absolute', 
          left: '12px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: '#64748b',
          pointerEvents: 'none'
        }} 
      />
      <input
        type="datetime-local"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: '32px',
          padding: '4px 12px 4px 36px',
          borderRadius: '6px',
          border: '1px solid #d9d9d9',
          fontSize: '14px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          outline: 'none',
          transition: 'all 0.3s',
          boxSizing: 'border-box'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#2563eb';
          e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d9d9d9';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

export default DateTimePicker;
