'use client'
import React, { useEffect } from 'react';
import { Button, Card, Empty, Form } from "antd";
import { useAppDispatch, usePermission, useTypedSelector } from "@/hooks";
import styled from "styled-components";
import { devicesActions } from "@/redux/features/devices.slice";
import DevicesFilter, { IDevicesFiltersForm } from "@/app/components/devices/devices-filter";
import DeviceCard from "@/app/components/devices/device-card";
import withSettings from "@/app/components/HOC/withSettings";
import Title from "antd/es/typography/Title";
import { AppColors } from "@/constants";
import Loader from "@/app/components/loader";


const DevicesPageContainer = styled("div")`
  width: 100vw;
  padding-top: 72px;
  padding-bottom: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const DevicesFiltersContainer = styled.div`
  flex-basis: 300px;
  flex-shrink: 0;
  padding-left: 50px;
`

const DevicesScrollableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const DeviceCardsContainer = styled.div`
  padding: 8px;
  //border-radius: 8px;

  //display: grid;
  //grid-gap: 25px;
  //grid-template-columns: repeat(auto-fit, 230px);
  //grid-template-rows: repeat(auto);
  //justify-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
`

const DevicesSectionCard = styled.div`
  width: 100%;
  padding: 8px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 20px 0;
`

const EmptyContainer = styled.div`
  width: 100%;
`

const DevicesPage = () => {
  const dispatch = useAppDispatch();
  const {isPermissionActive} = usePermission()
  const {devices, isLoading} = useTypedSelector(state => state.devices);

  useEffect(() => {
    dispatch(devicesActions.fetchDevices());
  }, [dispatch])

  const [form] = Form.useForm<IDevicesFiltersForm>()
  const resetFilters = () => {
    form.resetFields();
    form.submit()
  }

  const devicesWithSale = devices.filter(device => !!device.sale);
  const devicesWithoutSale = devices.filter(device => !device.sale);

  if (isLoading) {
    return (
      <DevicesPageContainer className='devices-page-container'>
        <Loader/>
      </DevicesPageContainer>
    )
  }

  return (
    <DevicesPageContainer className='devices-page-container'>
      { isPermissionActive('filters') &&
        <DevicesFiltersContainer>
          <DevicesFilter form={ form }/>
        </DevicesFiltersContainer>
      }

      { devices.length ?
        <DevicesScrollableContainer>
          { isPermissionActive('sales-section') && devicesWithSale.length && devicesWithoutSale.length ?
            <>
              <DeviceCardsContainer className='devices-cards-container--sales-sections'>
                <DevicesSectionCard style={{ marginBottom: 4 }}>
                  <Title level={ 3 } style={ {margin: 0, color: AppColors.GREEN} }>DISCOUNTS</Title>
                </DevicesSectionCard>
                { devicesWithSale.map(device => <DeviceCard key={ device.id + '1' }
                                                            device={ device }></DeviceCard>) }
                <DevicesSectionCard style={{ marginTop: 4, marginBottom: 4 }}>
                  <Title level={ 3 } style={ {margin: 0} }>NO DISCOUNTS</Title>
                </DevicesSectionCard>
                { devicesWithoutSale.map(device => <DeviceCard key={ device.id + '2' }
                                                               device={ device }></DeviceCard>) }
              </DeviceCardsContainer>
            </> :
            <>
              <DeviceCardsContainer className='devices-cards-container'>
                { devices.map(device => <DeviceCard key={ device.id + '3' } device={ device }></DeviceCard>) }
              </DeviceCardsContainer>
            </>
          }
        </DevicesScrollableContainer> :
        <EmptyContainer>
          <Empty description='No products'>
            <Button type='primary' onClick={ resetFilters }>Reset filters</Button>
          </Empty>
        </EmptyContainer> }
    </DevicesPageContainer>
  );
};

export default withSettings(DevicesPage);
