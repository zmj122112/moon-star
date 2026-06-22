import cloudbase from '@cloudbase/js-sdk';
import { CLOUDBASE_ENV_ID } from './config/env';
import { withAuth } from './utils/auth';

const app = cloudbase.init({
  env: CLOUDBASE_ENV_ID
});

const db = app.database();

let auth = null;
let authReadyPromise = null;
try {
  auth = app.auth({ persistence: 'local' });
} catch (e) {
  console.log('Auth initialization skipped:', e.message);
}

let storage = null;
try {
  storage = app.storage();
} catch (e) {
  console.log('Storage initialization skipped:', e.message);
}

const ensureCloudbaseAuth = async () => {
  if (!auth) return;

  if (!authReadyPromise) {
    authReadyPromise = (async () => {
      let loginState = null;
      if (typeof auth.getLoginState === 'function') {
        try {
          loginState = await auth.getLoginState();
        } catch (error) {
          console.warn('CloudBase login state check failed, retrying anonymous sign-in:', error?.message || error);
        }
      }

      if (!loginState && typeof auth.signInAnonymously === 'function') {
        await auth.signInAnonymously();
      }
    })().catch((error) => {
      authReadyPromise = null;
      throw error;
    });
  }

  return authReadyPromise;
};

const rawCallFunction = app.callFunction.bind(app);

const callFunction = async (options) => {
  await ensureCloudbaseAuth();

  try {
    return await rawCallFunction(options);
  } catch (error) {
    const message = String(error?.message || error || '');
    const shouldRetry = /network request error|ERR_CONNECTION_CLOSED|login|auth/i.test(message);

    if (!shouldRetry) {
      throw error;
    }

    authReadyPromise = null;
    await ensureCloudbaseAuth();
    return rawCallFunction(options);
  }
};

app.callFunction = callFunction;

const uploadFileViaCloudFunction = async (file, folder) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        console.log('开始上传文件:', file.name);
        const base64Data = e.target.result.split(',')[1];
        console.log('文件Base64长度:', base64Data?.length);
        
        const result = await app.callFunction({
          name: 'upload-file',
          data: withAuth({
            fileName: file.name,
            fileContent: base64Data,
            folder: folder
          })
        });

        console.log('云函数返回结果:', result);

        if (result && result.result && result.result.success) {
          resolve(result.result.url);
        } else {
          const errorMsg = result?.result?.message || '上传失败';
          console.error('云函数返回失败:', errorMsg);
          reject(new Error(errorMsg));
        }
      } catch (error) {
        console.error('云函数调用异常:', error);
        reject(error);
      }
    };
    reader.onerror = (error) => {
      console.error('文件读取失败:', error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export { app as cloudbase, db, auth, storage, ensureCloudbaseAuth, callFunction, uploadFileViaCloudFunction };
