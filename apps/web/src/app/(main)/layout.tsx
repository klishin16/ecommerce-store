import React from "react";
import AppHeader from "@/app/components/header";


export default function StoreLayout({children}: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      { children }
      {/*<Footer style={ { textAlign: 'center' } }>Ant Design ©2021 Created by @klishin16"</Footer>*/ }
    </>
  )
}
