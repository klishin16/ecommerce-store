'use client'
import { Button, Col, Image, Row, Space } from "antd";
import { ERoutes, IMAGE_STORAGE_URL } from "@/constants";
import Text from "antd/es/typography/Text";
import CountPicker from "@/app/components/count-picker";
import React, { useState } from "react";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import { basketActions } from "@/redux/features/basket.slice";
import { useAppDispatch, usePermission } from "@/hooks";
import { IDevice } from "@ecommerce-store/common";

const DeviceCardContainer = styled.div`
  width: 100%;

  padding: 12px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 5px;
  position: relative;
`

interface IDeviceCardProps {
    device: IDevice
}

const DeviceCard: React.FC<IDeviceCardProps> = ({ device }) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { isPermissionActive } = usePermission()

    const [amount, setAmount] = useState<number>(1);

    const amountChangeHandler = (v: number) => {
        setAmount(v);
    }

    const buyHandler = (device: IDevice) => {
        dispatch(basketActions.addDevice({ device, amount }))
    }

    const buyNowHandler = (device: IDevice) => {
        dispatch(basketActions.addDevice({ device, amount })).then((v) => {
            router.push(ERoutes.BASKET)
        })
    }

    const deviceClickHandler = (device: IDevice) => {
        if (isPermissionActive('device-detail')) {
            router.push(pathname + '/' + device.id)
        }
    }

    return (
        <DeviceCardContainer>
            <Image
                alt='Device image'
                width={ '100%' }
                src={ IMAGE_STORAGE_URL + device.image_url + '/original' }
            />
            <Title style={{ cursor: 'pointer' }} level={ 4 } onClick={ () => deviceClickHandler(device) }>
                { device.name }
            </Title>

            <Row style={{ marginBottom: 8 }}>

                { device.sale ?
                    <>
                        <Title type='success'
                               level={ 3 }
                               style={{ margin: 0 }}
                        >{ Math.floor(device.price * (100 - device.sale) / 100) } ₽</Title>
                        <Space></Space>
                        <Text delete>{ device.price }</Text>
                    </> :
                    <Title level={ 3 } style={{ margin: 0 }}>{ device.price } ₽</Title>
                }
            </Row>

            { isPermissionActive('buy-counter') &&
                <Row style={ { marginBottom: 8 } }>
                    <CountPicker onChange={ amountChangeHandler }/>
                </Row>
            }

            <Row gutter={ 8 } style={{ marginBottom: 8 }}>
                <Col>
                    <Button
                        onClick={ () => buyHandler(device) }
                    >
                        Buy
                    </Button>

                </Col>
                { isPermissionActive('buy-now') &&
                    <Col>
                        <Button
                            type='primary'
                            onClick={ () => buyNowHandler(device) }
                        >
                            Buy now
                        </Button>
                    </Col>
                }
            </Row>
        </DeviceCardContainer>
    )
}

export default DeviceCard;