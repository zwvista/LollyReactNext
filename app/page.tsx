'use client'

import * as React from 'react';
// import './App.css';

import { AppBar, Tab, Tabs } from '@mui/material';

import 'reflect-metadata';
import { container } from "tsyringe";
import { AppService } from '@/view-models/misc/app.service';
import Link from "next/link";

// import "font-awesome/css/font-awesome.min.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GlobalVars } from '@/common/common';
import Login from './Login';
import { useState } from "react";

export default function App() {
  const appService = container.resolve(AppService);
  console.log(appService);
  const items2 = [
    {label: 'Words in Unit', icon: 'bus', url: '/words-unit2'},
    {label: 'Phrases in Unit', icon: 'train', url: '/phrases-unit2'},
    {label: 'Words in Textbook', icon: 'car', url: '/words-textbook2'},
    {label: 'Phrases in Textbook', icon: 'taxi', url: '/phrases-textbook2'},
    {label: 'Words in Language', icon: 'plane', url: '/words-lang2'},
    {label: 'Phrases in Language', icon: 'rocket', url: '/phrases-lang2'},
    {label: 'Patterns in Language', icon: 'motorcycle', url: '/patterns2'},
    {label: 'Settings', icon: 'cog', url: '/settings'},
  ];
  const [indexTab2, setIndexTab2] = useState(0);
  library.add(fas as any, far as any, fab as any);

  const loggedIn = localStorage.getItem('userid');
  if (!loggedIn)
    return (<Login />);

  GlobalVars.userid = loggedIn!;
  appService.getData();
  return (
    <div className="App">
      <h2>Lolly React Next</h2>
      <AppBar position="static" color="default">
        <Tabs value={indexTab2} onChange={(e, v) => setIndexTab2(v)} indicatorColor="primary" textColor="primary">
          {items2.map((row: any) =>
            // https://stackoverflow.com/questions/65471275/material-ui-tabs-with-nextjs
            <Link href={row.url} passHref>
              <Tab key={row.label} label={<span><FontAwesomeIcon icon={row.icon} size="lg"/> {row.label}</span>} />
            </Link>
          )}
        </Tabs>
      </AppBar>}
      <Outlet/>
    </div>
  );
}
