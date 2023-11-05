'use client'
import { errorHandler, generateTableConfig, transformTablePaginationToPagination } from "@/functions";
import { useAppDispatch } from "@/hooks";
import { Button, Card, Col, Row, Table } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { AppColors } from "@/constants";
import styled from "styled-components";
import AppBreadcrumbs from "@/app/components/breadcrumbs";
import { DevicesService } from "@/services";
import { addNotification } from "@/redux/features/notifications.slice";
import { DeviceCreationDrawer } from "@/app/admin/devices/device-creation-drawer";
import { IDevice, IDeviceUpdateDto } from "@ecommerce-store/common";
import { useDrawer } from "@/hooks/useDrawer";
import withAuth from "@/app/components/HOC/withAuth";
import React from "react";
import { useTable } from "@/hooks/useTable";


const DevicePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const DeviceContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  height: 100%;
`

interface IDevicesAdminPageProps {
  token: string;
}


const DevicesAdminPage: React.FC<IDevicesAdminPageProps> = ({token}) => {
  const dispatch = useAppDispatch();

  const {drawerProps, openDrawer} = useDrawer<IDeviceUpdateDto>();
  const { tableProps, loading, refresh } = useTable<IDevice>((pagination) => DevicesService.fetchWithPagination(transformTablePaginationToPagination(pagination)))

  const removeDeviceHandler = (device: IDevice) => {
    DevicesService.remove(token, device.id)
      .then(() => {
        refresh()
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
    {title: 'id'},
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
    <DevicePageContainer>
      <AppBreadcrumbs/>

      <DeviceContainer>
        <Card size={ "small" } style={ {marginBottom: 8} }>
          <Row justify={ "end" }>
            <Button
              color={ "blue" }
              icon={ <RedoOutlined/> }
              loading={ loading }
              onClick={ refresh }
            >Refresh</Button>
            <Button onClick={ () => openDrawer() } style={ {
              color: AppColors.GREEN,
              borderColor: AppColors.GREEN,
              marginLeft: '.5vw'
            } }>Create</Button>
          </Row>
        </Card>

        <Table
          columns={ columns }
          rowKey={ (device) => device.id }
          { ...tableProps }
        />

        <DeviceCreationDrawer token={ token } { ...drawerProps }></DeviceCreationDrawer>
      </DeviceContainer>
    </DevicePageContainer>
  );
}

export default withAuth(DevicesAdminPage)
