import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'axios';
import { AxiosError } from 'axios';
import qs from 'qs';

import { RootState } from 'store/types';

import { TUpdatePasswordForm } from './types';

const updatePassword = createAsyncThunk<
  {},
  {
    updatePasswordForm: TUpdatePasswordForm;
    url: string;
    redirectUrl: string;
  },
  { rejectValue: string; state: RootState }
>('user/updatePassword', async (args, thunkAPI) => {
  try {
    const response = await api({
      url: args.url,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
      },
      data: qs.stringify(args.updatePasswordForm),
    });

    window.location.href = response.request.responseURL;
    const text = response.data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const type = eval(doc.getElementsByTagName('script')[0].text).message.type;

    if (type === 'success') {
      return thunkAPI.fulfillWithValue(true);
    } else {
      const errorMessage = eval(doc.getElementsByTagName('script')[0].text).message.summary;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  } catch (err: unknown) {
    if (api.isAxiosError(err)) {
      if (
        (err.code && err.code === 'ERR_NETWORK') ||
        (err.response && err.response.status === 401)
      ) {
        window.location.href = args.redirectUrl;
        return;
      }
    }
    if (err instanceof Error || err instanceof AxiosError) {
      return thunkAPI.rejectWithValue(err.message);
    }
    throw err;
  }
});
export { updatePassword };
