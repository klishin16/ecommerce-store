'use client'
import React from 'react';
import {Button, Card, Col, Layout, Row, Space, Statistic} from "antd";
// import AdminViewHeader, {IBreadcrumbRoute} from "./AdminViewHeader";
import {Content} from "antd/es/layout/layout";
import {LikeOutlined} from '@ant-design/icons'


const StatisticView: React.FC = () => {
    // const currentBreadcrumbPath: IBreadcrumbRoute = {
    //     path: 'Statistic',
    //     breadcrumbName: 'Statistic'
    // }


    return (
        <Layout>
            {/*<AdminViewHeader title={"Statistic"} subTitle={"Shop statistic"}*/}
            {/*                 breadcrumbPath={[...breadcrumbPath, currentBreadcrumbPath]}/>*/}

            <Content>
                <Row gutter={16} justify={"center"} align={"middle"} style={{marginTop: '1.6vh'}}>
                    <Space />

                    <Col span={10} className="gutter-row">
                        <Card style={{height: '180px'}}>
                            <Row>
                                <Col span={12}>
                                    <Statistic title="Active Users" value={112893}/>
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Account Balance (CNY)" value={112893} precision={2}/>
                                    <Button style={{marginTop: 16}} type="primary">
                                        Recharge
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    {/*<Space direction={"horizontal"} />*/}

                    <Col span={10} className="gutter-row">
                        <Card style={{height: '180px'}}>
                            <Row>
                                <Col span={12}>
                                    <Statistic title="Feedback" value={1128} prefix={<LikeOutlined/>}/>
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Unmerged" value={93} suffix="/ 100"/>
                                </Col>
                            </Row>,
                        </Card>
                    </Col>

                    <Space />
                </Row>
            </Content>
        </Layout>
    );
};

export default StatisticView;
