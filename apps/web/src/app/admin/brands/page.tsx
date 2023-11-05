'use client'
import React from 'react';
import { Button, Card, Col, Row, Table } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { errorHandler, generateTableConfig, transformTablePaginationToPagination } from "@/functions";
import BrandCreationDrawer from "@/app/admin/brands/brand-creation-drawer";
import { AppColors } from "@/constants";
import { BrandsService } from "@/services/brands.service";
import styled from "styled-components";
import AppBreadcrumbs from "@/app/components/breadcrumbs";
import withAuth from "@/app/components/HOC/withAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { EUserRoles, IBrand, IUpdateBrandDto } from "@ecommerce-store/common";
import { useTable } from "@/hooks/useTable";
import { addNotification } from "@/redux/features/notifications.slice";
import { useDispatch } from "react-redux";


const BrandsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const BrandsContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  height: 100%;
`

const AdminBrands: React.FC<{ token: string }> = ({token}) => {
  const dispatch = useDispatch();

  const {drawerProps, openDrawer} = useDrawer<IUpdateBrandDto>({
    onClose: params => {
      if (params?.refreshItems) {
        refresh();
      }
    }
  })

  const { tableProps, loading, refresh } = useTable<IBrand>((pagination) =>
    BrandsService.fetchWithPagination(transformTablePaginationToPagination(pagination))
  )

  const removeDeviceHandler = (brand: IBrand) => {
    BrandsService.remove(token, brand.id)
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
    {
      title: 'id'
    },
    {
      title: 'name'
    },
    {
      title: 'description'
    },
    {
      title: 'operation',
      render: (_: never, brand: IBrand) => {
        return (
          <Row gutter={ 16 }>
            <Col>
              <Button onClick={ () => openDrawer(brand) }>
                Edit
              </Button>
            </Col>
            <Col>
              <Button danger onClick={ () => removeDeviceHandler(brand) }>
                Delete
              </Button>
            </Col>
          </Row>

        )
      },
    },
  ])

  return (
    <BrandsPageContainer>
      <AppBreadcrumbs/>

      <BrandsContainer>
        <Card size={ "small" } style={ {marginBottom: 8} }>
          <Row justify={ "end" }>
            <Button
              color={ "blue" }
              icon={ <RedoOutlined/> }
              loading={ loading }
              onClick={ () => refresh() }
            >Refresh</Button>
            <Button onClick={ () => openDrawer() } style={ {
              color: AppColors.GREEN,
              borderColor: AppColors.GREEN,
              marginLeft: '.5vw'
            } }>Create</Button>
          </Row>
        </Card>

        <Table
          rowKey={ 'id' }
          columns={ columns }
          { ...tableProps }
        />

        <BrandCreationDrawer token={ token } { ...drawerProps } />
      </BrandsContainer>
    </BrandsPageContainer>
  );
};

export default withAuth(AdminBrands, [EUserRoles.EDITOR, EUserRoles.ADMIN]);
