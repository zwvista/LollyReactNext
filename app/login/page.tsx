'use client'

import 'reflect-metadata';
import * as React from 'react';
// import './Common.css'
import { container } from "tsyringe";
import { GlobalVars } from '@/common/common';
import { LoginService } from '@/view-models/misc/login.service';
import { ChangeEvent, useReducer } from "react";
import { Button, TextField } from "@mui/material";
import { useCookies } from 'next-client-cookies';

export default function Login() {
  const cookies = useCookies();
  const loginService = container.resolve(LoginService);
  const [, forceUpdate] = useReducer(x => x + 1, 0, x => 0);

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    loginService.item.USERNAME = e.target.value;
    forceUpdate();
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    loginService.item.PASSWORD = e.target.value;
    forceUpdate();
  };

  const login = async () => {
    const userid = await loginService.login();
    if (userid) {
      cookies.set('userid', userid);
      GlobalVars.userid = userid;
      window.location.reload();
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-3/6">
        <div className="flex items-center mb-4">
          <label className="w-1/3 align-content-center" htmlFor="username">USERNAME:</label>
          <div className="w-2/3">
            <TextField id="username" style={{width: '100%'}} value={loginService.item.USERNAME} onChange={onChangeUsername} />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <label className="w-1/3 align-content-center" htmlFor="password">PASSWORD:</label>
          <div className="w-2/3">
            <TextField type="password" id="password" style={{width: '100%'}} value={loginService.item.PASSWORD} onChange={onChangePassword} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/3"></div>
          <div className="w-2/3">
            <Button variant="contained" onClick={login}>Login</Button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        html, body, #root {
          height: 100%;
        }
        input {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
