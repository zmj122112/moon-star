import { parseRoles } from '../config/business';

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
  }
};

export const getCurrentUserId = (user = getCurrentUser()) => {
  return user?.userId || user?.id || user?._id || user?.user_id || user?.phone || '';
};

export const getCurrentToken = () => {
  return localStorage.getItem('token') || getCurrentUser()?.token || '';
};

export const getCurrentRoles = (user = getCurrentUser()) => {
  return parseRoles(user?.role);
};

export const withOperator = (data = {}) => {
  const user = getCurrentUser();
  return {
    ...data,
    operatorId: getCurrentUserId(user),
    operatorName: user?.name || '',
    operatorToken: getCurrentToken(),
  };
};

export const withAuth = (data = {}) => {
  const user = getCurrentUser();
  return {
    ...data,
    userId: getCurrentUserId(user),
    token: getCurrentToken(),
  };
};
