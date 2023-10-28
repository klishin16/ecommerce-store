'use client'
import React, { useEffect } from 'react';
import { Card, Spin } from "antd";
import { useAppDispatch, usePermission, useTypedSelector } from "@/hooks";
import styled from "styled-components";
import { devicesActions } from "@/redux/features/devices.slice";
import DevicesFilter from "@/app/components/devices/devices-filter";
import DeviceCard from "@/app/components/devices/device-card";
import withSettings from "@/app/components/HOC/withSettings";
import Title from "antd/es/typography/Title";
import { AppColors } from "@/constants";


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
  margin: auto;
  flex-basis: 300px;
  flex-grow: 1;
  align-self: flex-start;
  max-width: 80%;
  padding: 14px;
  border-radius: 8px;

  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, 230px);
  grid-template-rows: repeat(auto);
  justify-items: center;
`

const DevicesPage = () => {
  const dispatch = useAppDispatch();
  const {isPermissionActive} = usePermission()
  const {devices, isLoading} = useTypedSelector(state => state.devices);

  useEffect(() => {
    dispatch(devicesActions.fetchDevices());
  }, [dispatch])

  const devicesWithSale = devices.filter(device => !!device.sale);
  const devicesWithoutSale = devices.filter(device => !device.sale);

  const devicesCards = devices.map(device => <DeviceCard key={ device.id } device={ device }></DeviceCard>)

  if (isLoading) {
    return (
      <DevicesPageContainer className='devices-page-container'>
        <Spin/>
      </DevicesPageContainer>
    )
  }

  return (
    <DevicesPageContainer className='devices-page-container'>
      { isPermissionActive('filters') &&
        <DevicesFiltersContainer>
          <DevicesFilter/>
        </DevicesFiltersContainer>
      }

      <DevicesScrollableContainer>
        { isPermissionActive('sales-section') ?
          <>
            <Card size='small'><Title level={3} style={{ margin: 0, color: AppColors.GREEN }}>DISCOUNTS</Title></Card>
            <DeviceCardsContainer className='devices-cards-container--sales-sections'>
              { devicesWithSale.map(device => <DeviceCard key={ device.id } device={ device }></DeviceCard>) }
            </DeviceCardsContainer>

            <Card size='small'><Title level={3} style={{ margin: 0 }}>NO DISCOUNTS</Title></Card>
            <DeviceCardsContainer className='devices-cards-container'>
              { devicesWithoutSale.map(device => <DeviceCard key={ device.id } device={ device }></DeviceCard>) }
            </DeviceCardsContainer>
          </> :
          <>
            <DeviceCardsContainer className='devices-cards-container'>
              { devices.map(device => <DeviceCard key={ device.id } device={ device }></DeviceCard>) }
            </DeviceCardsContainer>
          </>
        }
      </DevicesScrollableContainer>
    </DevicesPageContainer>
  );
};

export default withSettings(DevicesPage);