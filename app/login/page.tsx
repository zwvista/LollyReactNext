import * as React from 'react';
// import './Common.css'
import { container } from "tsyringe";
import { GlobalVars } from '@/common/common';
import { LoginService } from '@/view-models/misc/login.service';
import { ChangeEvent, useReducer } from "react";
import { Button, TextField } from "@mui/material";

export default function Login() {
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
      localStorage.setItem('userid', userid);
      GlobalVars.userid = userid;
      window.location.reload();
    }
  };

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="container w-50">
        <div className="row mb-4">
          <label className="col-4 align-content-center" htmlFor="username">USERNAME:</label>
          <div className="col">
            <TextField id="username" value={loginService.item.USERNAME} onChange={onChangeUsername} />
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-4 align-content-center" htmlFor="password">PASSWORD:</label>
          <div className="col">
            <TextField type="password" id="password" style={{width: '100%'}} value={loginService.item.PASSWORD} onChange={onChangePassword} />
          </div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col">
            <Button label="Login" onClick={login} />
          </div>
        </div>
      </div>
      {/*<style jsx global>{`*/}
      {/*  html, body, #root {*/}
      {/*    height: 100%;*/}
      {/*  }*/}
      {/*  input {*/}
      {/*    width: 100%;*/}
      {/*  }*/}
      {/*`}</style>*/}
    </div>
  );
}
