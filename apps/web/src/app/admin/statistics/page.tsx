'use client'
import React from 'react';
import { Card, Col, Layout, Row, Space, Statistic } from "antd";
import { Content } from "antd/es/layout/layout";
import { useRequest } from "@/hooks";
import { StatisticsService } from "@/services/statistics.service";
import { IStatistics } from "@ecommerce-store/common";

const StatisticView: React.FC = () => {
    const [statistics, loading] = useRequest<IStatistics>(() =>
        StatisticsService.fetch()
    )

    if (loading || !statistics) {
        return <></>
    }


    return (
        <Layout>
            <Content>
                <Row gutter={16} justify={"center"} align={"middle"} style={{marginTop: '1.6vh'}}>
                    <Space />

                    <Col span={10} className="gutter-row">
                        <Card style={{height: '180px'}}>
                            <Row>
                                <Col span={12}>
                                    <Statistic title="Active Users" value={statistics.users}/>
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Devices" value={statistics.devices}/>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    {/*<Space direction={"horizontal"} />*/}

                    <Col span={10} className="gutter-row">
                        <Card style={{height: '180px'}}>
                            <Row>
                                <Col span={12}>
                                    <Statistic title="Brands" value={statistics.brands}/>
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Categories" value={statistics.categories}/>
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
