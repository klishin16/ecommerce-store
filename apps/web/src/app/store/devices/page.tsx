'use client'
import React, { useEffect } from 'react';
import { Spin } from "antd";
import { useAppDispatch, usePermission, useTypedSelector } from "@/hooks";
import styled from "styled-components";
import { devicesActions } from "@/redux/features/devices.slice";
import DevicesFilter from "@/app/components/devices/devices-filter";
import DeviceCard from "@/app/components/devices/device-card";
import withSettings from "@/app/components/HOC/withSettings";


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

const DeviceCardsContainer = styled.div`
  flex-basis: 300px;
  flex-grow: 1;
  align-self: flex-start;
  max-width: 80%;
  padding: 14px;
  border-radius: 8px;

  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, 230px);
  grid-template-rows: repeat(7, auto);
  justify-items: center;

  height: 100%;
  overflow-y: auto;
`

const DevicesPage = () => {
    const dispatch = useAppDispatch();
    const { isPermissionActive } = usePermission()
    const { devices, isLoading } = useTypedSelector(state => state.devices);

    useEffect(() => {
        dispatch(devicesActions.fetchDevices());
    }, [dispatch])

    const devicesCards = devices.map(device => <DeviceCard key={ device.id } device={device}></DeviceCard>)

    if (isLoading) {
        return (
            <DevicesPageContainer className='devices-page-container'>
                <Spin/>
            </DevicesPageContainer>
        )
    }

    return (
        <DevicesPageContainer className='devices-page-container'>
            { isPermissionActive('filters') && <DevicesFilter/> }

            <DeviceCardsContainer className='devices-cards-container'>
                { devicesCards }
            </DeviceCardsContainer>
        </DevicesPageContainer>
    );
};

export default withSettings(DevicesPage);
