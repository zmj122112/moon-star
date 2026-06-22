export const CLOUDBASE_ENV_ID = import.meta.env.VITE_CLOUDBASE_ENV_ID || 'waterproof-3g9f7h9kdb626bb3';
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';
export const APP_NAME = import.meta.env.VITE_APP_NAME || '月星防水管理平台';

export const isDevEnv = APP_ENV === 'development';
