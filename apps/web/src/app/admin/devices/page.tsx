'use client'
import { errorHandler, generateTableConfig } from "@/functions";
import Link from "next/link";
import { useAppDispatch, useRequest } from "@/hooks";
import { Button, Card, Col, Row, Table } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { AppColors } from "@/constants";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import AppBreadcrumbs from "@/app/components/breadcrumbs";
import { DevicesService } from "@/services";
import { addNotification } from "@/redux/features/notifications.slice";
import { DeviceCreationDrawer } from "@/app/components/devices/device-creation-drawer";
import { IDevice, IDeviceUpdateDto } from "@ecommerce-store/common";
import { useDrawer } from "@/hooks/useDrawer";
import withAuth from "@/app/components/HOC/withAuth";
import React from "react";

const DeviceContainer = styled.div`
    padding: 14px;
    background-color: rgb(255, 255, 255);
`

interface IDevicesAdminPageProps {
    token: string;
}

const DevicesAdminPage: React.FC<IDevicesAdminPageProps> = ({token}) => {
    const dispatch = useAppDispatch();
    const current_path = usePathname();

    const {drawerProps, openDrawer} = useDrawer<IDeviceUpdateDto>();

    const [devices, loading, refreshDevices] = useRequest(() =>
        DevicesService.fetchAll()
            .catch((e) => {
                dispatch(
                    addNotification({
                        title: 'Devices loading error',
                        message: errorHandler(e),
                        type: 'error'
                    })
                );
            })
    )

    const removeDeviceHandler = (device: IDevice) => {
        DevicesService.remove(token, device.id)
            .then(() => {
                refreshDevices()
            })
            .catch((e) => {
                dispatch(
                    addNotification({
                        title: 'Device removing error',
                        message: errorHandler(e),
                        type: 'error'
                    })
                );
            })
    }

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link href={ current_path + '/' + id }>{ id }</Link>
        },
        {title: 'name'},
        {title: 'price'},
        {title: 'sale'},
        {
            title: 'operation',
            render: (_: never, device: IDevice) => {
                return (
                    <Row gutter={ 16 }>
                        <Col>
                            <Button onClick={ () => openDrawer(device) }>
                                Edit
                            </Button>
                        </Col>
                        <Col>
                            <Button danger onClick={ () => removeDeviceHandler(device) }>
                                Delete
                            </Button>
                        </Col>
                    </Row>
                )
            },
        },
    ])


    return (
        <>
            <AppBreadcrumbs/>

            <DeviceContainer>
                <Card size={ "small" } style={ {marginBottom: 8} }>
                    <Row justify={ "end" }>
                        <Button
                            color={ "blue" }
                            icon={ <RedoOutlined/> }
                            loading={ loading }
                            onClick={ () => refreshDevices() }
                        >Refresh</Button>
                        <Button onClick={ () => openDrawer() } style={ {
                            color: AppColors.GREEN,
                            borderColor: AppColors.GREEN,
                            marginLeft: '.5vw'
                        } }>Create</Button>
                    </Row>
                </Card>

                <Table loading={ loading } columns={ columns } dataSource={ devices ?? [] }/>

                <DeviceCreationDrawer token={ token } { ...drawerProps }></DeviceCreationDrawer>
            </DeviceContainer>
        </>
    );
}

export default withAuth(DevicesAdminPage)
