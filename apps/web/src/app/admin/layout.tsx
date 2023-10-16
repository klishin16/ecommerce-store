'use client'
import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import styled from "styled-components";
import { useTypedSelector } from "@/hooks";
import Link from "next/link";
import { sidebarItems } from "@/constants";
import { Content } from "antd/es/layout/layout";

const { Header, Footer, Sider } = Layout;

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, .2);
  border-radius: 6px;
`


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { user } = useTypedSelector(state => state.auth)

    const [collapseSide, setCollapseSide] = useState(false)

    const onCollapse = (collapsed: boolean) => {
        setCollapseSide(collapsed)
    };

    const menuItems = () => sidebarItems.map((menuItem, index) => (
        <Menu.Item key={ index } icon={ menuItem.icon }>
            <Link href={ menuItem.view }>{ menuItem.title }</Link>
        </Menu.Item>
    ))


    return (
        <Layout style={ { minHeight: '100vh' } }>
            <Sider collapsible collapsed={ collapseSide } onCollapse={ onCollapse }>
                <Logo/>

                <Menu
                    theme="dark"
                    defaultSelectedKeys={ ['0'] }
                    mode="inline"
                >
                    { menuItems() }
                </Menu>
            </Sider>

            <Layout>
                <Header style={ { padding: 0, background: colorBgContainer } }/>
                <Content style={ { margin: '0 16px' } }>
                    { children }
                </Content>
                <Footer style={ { textAlign: 'center' } }>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>

            {/*<Layout className="site-layout">*/ }
            {/*    <AdminPageHeader className="site-layout-background">*/ }
            {/*        <Row style={ { height: '100%' } } justify={ "end" } align={ "middle" }>*/ }
            {/*            { user && <Text>{ user.email }</Text> }*/ }
            {/*            <Button style={ { marginLeft: '1vw', marginRight: '1vw' } } danger ghost={ true }*/ }
            {/*                    onClick={ logout }>Logout</Button>*/ }
            {/*        </Row>*/ }
            {/*    </AdminPageHeader>*/ }

            {/*    */ }
            {/*    <Footer style={ { textAlign: 'center' } }>©2021 Created by klishin16</Footer>*/ }
            {/*</Layout>*/ }
        </Layout>
    );
};
