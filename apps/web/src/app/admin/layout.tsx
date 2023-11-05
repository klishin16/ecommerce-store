'use client'
import React, { useEffect, useState } from 'react';
import { Layout, Menu, MenuProps, theme } from 'antd';
import styled from "styled-components";
import Link from "next/link";
import { sidebarItems } from "@/constants";
import { Content } from "antd/es/layout/layout";
import { usePathname } from "next/navigation"

const {Header, Footer, Sider} = Layout;

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, .2);
  border-radius: 6px;
`


export default function AdminLayout({children}: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const [collapseSide, setCollapseSide] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapseSide(collapsed)
  };

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  useEffect(() => {
    console.log(`Route changed to: ${ pathname }`);
    const index = Object.values(sidebarItems.map(v => v.view)).findIndex((route) => route === pathname ?? 0);
    console.log('Route index', index)
    setSelectedItem(index);
  }, [pathname]);

  const menuItems: MenuProps['items'] = sidebarItems.map((sidebarItem, index) => ({
    key: index,
    icon: sidebarItem.icon,
    label: <Link href={ sidebarItem.view }>{ sidebarItem.title }</Link>
  }))

  return (
    <Layout style={ {minHeight: '100vh'} }>
      <Sider collapsible collapsed={ collapseSide } onCollapse={ onCollapse }>
        <Logo/>

        { selectedItem !== null &&
          <Menu
            theme="dark"
            mode="inline"
            items={ menuItems }
            defaultSelectedKeys={ [selectedItem.toString()] }
          />
        }

      </Sider>

      <Layout>
        <Header style={ {padding: 0, background: colorBgContainer} }/>
        <Content style={ {margin: '0 16px'} }>
          { children }
        </Content>
        <Footer style={ {textAlign: 'center'} }>Ant Design ©2023 Created by klishin16</Footer>
      </Layout>
    </Layout>
  );
};
