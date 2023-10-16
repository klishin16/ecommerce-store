'use client'
import styled from "styled-components";
import { useAppDispatch, useRequest } from "@/hooks";
import React from "react";
import { Button, Card, Col, Image, Row, Spin, Typography } from "antd";
import { ERoutes, IMAGE_STORAGE_URL } from "@/constants";
import { DevicesService } from "@/services";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import { basketActions } from "@/redux/features/basket.slice";
import { useRouter } from "next/navigation";
import { IDevice } from "@ecommerce-store/common";
import withSettings from "@/app/components/HOC/withSettings";

const { Title, Text } = Typography;

const DeviceDetailPageContainer = styled.div`
  width: 90vw;
  padding-top: 80px;
  padding-bottom: 16px;
  margin: 0 auto 0 auto;
  height: 100%;

  display: flex;
  flex-direction: column;
`

const DeviceDetailPage = ({ params }: { params: { device_id: number } }) => {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const [device, loading] = useRequest(() =>
        DevicesService.fetchOne(params.device_id)
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Device loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );
            })
    )

    const buyHandler = (device: IDevice) => {
        dispatch(basketActions.addDevice({ device, amount: 1 }))
    }

    const buyNowHandler = (device: IDevice) => {
        dispatch(basketActions.addDevice({ device, amount: 1 })).then((v) => {
            router.push(ERoutes.BASKET)
        })
    }

    if (!device || loading) {
        return <DeviceDetailPageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin/></DeviceDetailPageContainer>
    }

    return (
        <DeviceDetailPageContainer>
            <Card style={{flexGrow: 1 }}>
                <Row gutter={ 14 }>
                    <Col span={ 12 }>
                        <Image
                            width={ '100%' }
                            src={ IMAGE_STORAGE_URL + device.image_url + '/original' }
                            alt='Device image'
                            preview={ false }
                        ></Image>
                    </Col>
                    <Col span={ 12 }>
                        <Row>
                            <Title level={ 1 }>{ device.name }</Title>
                        </Row>
                        <Row>
                            <Title level={ 1 }>{ device.brand?.name ?? '' }</Title>
                        </Row>
                        <Row>
                            <Title level={ 1 }>{ device.description ?? '' }</Title>
                        </Row>
                        <Row>
                            <Title level={ 2 }>Price:ㅤ</Title>
                            { device.sale ?
                                <div style={ { display: "flex", gap: '4px' } }>
                                    <Title type='success'
                                           level={ 2 }>{ Math.floor(device.price * (100 - device.sale) / 100) } ₽</Title>
                                    <Text delete>{ device.price }</Text>
                                </div> :
                                <Title style={{ margin: 0 }} level={ 2 }>{ device.price } ₽</Title>
                            }
                        </Row>
                        <Row gutter={ 8 }>
                            <Col>
                                <Button
                                    size='large'
                                    onClick={ () => buyHandler(device) }
                                >
                                    Buy
                                </Button>

                            </Col>
                            <Col>
                                <Button
                                    size='large'
                                    type='primary'
                                    onClick={ () => buyNowHandler(device) }
                                >
                                    Buy now
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </DeviceDetailPageContainer>
    )
}

export default withSettings(DeviceDetailPage);
