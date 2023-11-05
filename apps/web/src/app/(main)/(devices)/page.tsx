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

    const devicesContainer = (
        <DevicesScrollableContainer>
            { isPermissionActive('sales-section') && devicesWithSale.length && devicesWithoutSale.length ?
                <>
                    <Card size='small'><Title level={ 3 }
                                              style={ {margin: 0, color: AppColors.GREEN} }>DISCOUNTS</Title></Card>
                    <DeviceCardsContainer className='devices-cards-container--sales-sections'>
                        { devicesWithSale.map(device => <DeviceCard key={ device.id + '1' }
                                                                    device={ device }></DeviceCard>) }
                    </DeviceCardsContainer>

                    <Card size='small'><Title level={ 3 } style={ {margin: 0} }>NO DISCOUNTS</Title></Card>
                    <DeviceCardsContainer className='devices-cards-container'>
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
        </DevicesScrollableContainer>
    )

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
            { devices.length ? devicesContainer :
                <EmptyContainer>
                    <Empty description='No products'>
                        <Button type='primary' onClick={ resetFilters }>Reset filters</Button>
                    </Empty>
                </EmptyContainer> }
        </DevicesPageContainer>
    );
};

export default withSettings(DevicesPage);
