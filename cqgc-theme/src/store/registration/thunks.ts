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
    redirectUrl: string;
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
      window.location.href = response.request.responseURL;
    })
    .catch((err: Error | AxiosError) => {
      //XHR forced to follow redirect 302, which results at the end in a CORS error.Only way to catch this, its to verify if response is undefined.
      if (api.isAxiosError(err)) {
        if (!err.response) {
          window.location.href = args.redirectUrl;
          return;
        }
      }

      thunkAPI.dispatch(register.rejected(new Error(err.message), err.message, args));
    });
});
export { register };
