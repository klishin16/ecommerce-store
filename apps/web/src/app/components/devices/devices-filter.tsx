import React from 'react';
import styled from "styled-components";
import { Button, Card, CardProps, Col, Form, InputNumber, Row, Select, Slider, Typography } from "antd";
import { useAppDispatch, useRequest, useTypedSelector } from "@/hooks";
import { BrandsService, CategoriesService } from "@/services";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import { devicesActions } from "@/redux/features/devices.slice";

const DeviceFilterContainer = styled((props: CardProps) => <Card {...props} />)`
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 20px 0;
  text-align: center;
  height: max-content;
`

const {Title} = Typography

const minPriceRange = 0;
const maxPriceRange = 10000;

interface IDevicesFiltersForm {
    minPrice: number;
    maxPrice: number;
}

const initialFilterState: IDevicesFiltersForm = {
    minPrice: 100,
    maxPrice: 1000
}

export interface IDevicesFilters {
    minPrice?: number;
    maxPrice?: number;
    categoriesIds?: number[];
    brandsIds?: number[];
}

const DevicesFilter = () => {
    const {isLoading} = useTypedSelector(state => state.devices);
    const dispatch = useAppDispatch();

    const [form] = Form.useForm<IDevicesFiltersForm>()
    const minPrice = Form.useWatch('minPrice', form);
    const maxPrice = Form.useWatch('maxPrice', form);
    const applyFilters = (values: IDevicesFiltersForm) => {
        // @ts-ignore
        window.ym(95089246,'reachGoal','filterButton')
        dispatch(devicesActions.fetchDevicesWithFilter(values))
    }

    const [brandsOptions] = useRequest(() =>
        BrandsService.fetchAll()
            .then((brands) => brands.map(brand => ({
                value: brand.id,
                label: brand.name
            })))
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Brands loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );

                return []
            })
    )

    const [categoriesOptions] = useRequest(() =>
        CategoriesService.fetchAll()
            .then((categories) => categories.map(category => ({
                value: category.id,
                label: category.name
            })))
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Categories loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );

                return []
            })
    )

    return (
        <DeviceFilterContainer headStyle={{fontSize: '1.2rem', fontWeight: 'lighter', letterSpacing: '1px'}}
                               title={"Filter"}>
            <Form
                layout="vertical"
                requiredMark={false}
                form={form}
                initialValues={ initialFilterState }
                onFinish={ applyFilters }>
                <Row>
                    <Title level={5}>Цена, ₽</Title>
                </Row>
                <Row justify={"space-between"}>
                    <Form.Item name='minPrice' style={{maxWidth: "45%"}}>
                        <InputNumber
                            size={"middle"}
                        />
                    </Form.Item>
                    <div><span>-</span></div>
                    <Form.Item name='maxPrice' style={{maxWidth: "45%"}}>
                        <InputNumber
                            size={"middle"}
                        />
                    </Form.Item>
                </Row>
                <Row>
                    <Slider
                        style={{width: '100%'}}
                        range
                        value={[
                            minPrice,
                            maxPrice
                        ]}
                        min={minPriceRange}
                        max={maxPriceRange}
                        onChange={value => {
                            form.setFieldValue('minPrice', value[0])
                            form.setFieldValue('maxPrice', value[1])
                        }}
                    />
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="brandsIds"
                            label="Brands"
                        >
                            <Select mode="multiple" options={ brandsOptions ?? [] }></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="categoriesIds"
                            label="Categories"
                        >
                            <Select mode="multiple" options={ categoriesOptions ?? [] }></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Button
                        loading={isLoading}
                        htmlType='submit'
                        type='primary'
                        size='large'
                        style={{width: '100%'}}
                    >Show</Button>
                </Row>
            </Form>
        </DeviceFilterContainer>
    );
};

export default DevicesFilter;
