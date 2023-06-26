import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'axios';
import { AxiosError } from 'axios';
import qs from 'qs';

import { RootState } from 'store/types';

import { TResetPasswordForm } from './types';

const resetPassword = createAsyncThunk<
  {},
  {
    resetPasswordForm: TResetPasswordForm;
    url: string;
  },
  { rejectValue: string; state: RootState }
>('user/resetPassword', async (args, thunkAPI) => {
  try {
    const response = await api({
      url: args.url,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
      },
      data: qs.stringify(args.resetPasswordForm),
    });

    const text = response.data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const type = eval(doc.getElementsByTagName('script')[0].text).message.type;

    if (type === 'success') {
      return thunkAPI.fulfillWithValue({ email: args.resetPasswordForm.username });
    } else {
      const errorMessage = eval(doc.getElementsByTagName('script')[0].text).message.summary;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  } catch (err: unknown) {
    if (err instanceof Error || err instanceof AxiosError) {
      return thunkAPI.rejectWithValue(err.message);
    }
    throw err;
  }
});
export { resetPassword };
