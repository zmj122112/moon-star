export const assertFunctionSuccess = (result, fallbackMessage = '操作失败') => {
  const payload = result?.result || result;

  if (payload?.success === false || payload?.code >= 400) {
    throw new Error(payload?.message || fallbackMessage);
  }

  if (payload?.success === true || payload?.code === 200) {
    return payload;
  }

  return payload;
};

export const assertRecordAdded = (result, fallbackMessage = '流水记录新增失败') => {
  if (!result || result.id || result._id || result.data?._id || result.ids?.length > 0) {
    return result;
  }

  throw new Error(fallbackMessage);
};
