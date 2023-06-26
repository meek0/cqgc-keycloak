import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'axios';
import { AxiosError } from 'axios';
import qs from 'qs';

import { RootState } from 'store/types';

import { TRegisterForm } from './types';

const register = createAsyncThunk<
  void,
  {
    registerForm: TRegisterForm;
    url: string;
  },
  { rejectValue: string; state: RootState }
>('user/register', async (args, thunkAPI) => {
  api({
    url: args.url,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
    },
    data: qs.stringify(args.registerForm, { arrayFormat: 'comma' }),
  })
    .then((response) => {
      const text = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const errorMessage = eval(doc.getElementsByTagName('script')[0].text).message.summary;
      const error = eval(doc.getElementsByTagName('script')[0].text).message.error; // Boolean

      if (!error) {
        window.location.href = response.request.responseURL;
      } else {
        thunkAPI.dispatch(register.rejected(new Error(errorMessage), errorMessage, args));
      }
    })
    .catch((err: Error | AxiosError) => {
      thunkAPI.dispatch(register.rejected(new Error(err.message), err.message, args));
    });
});
export { register };
