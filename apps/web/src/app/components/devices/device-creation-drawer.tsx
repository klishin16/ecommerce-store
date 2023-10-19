import React, { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Image, Input, InputNumber, Row, Select, Space, Upload } from 'antd';
import { useAppDispatch, useRequest } from "@/hooks";
import { devicesActions } from "@/redux/features/devices.slice";
import { BACKEND_URL, IMAGE_STORAGE_URL } from "@/constants";
import { UploadOutlined } from "@ant-design/icons";
import { ICreationDrawerProps } from "@/types";
import { BrandsService, CategoriesService, DevicesService } from "@/services";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions";
import { ICreateDeviceDto, IDeviceUpdateDto } from "@ecommerce-store/common";


interface IDeviceForm {
    name: string;
    price: number;
    availability: number;
    sale: number | null;
    brandId: number;
    categoryId: number;
    image_raw: Array<{ response: string }>
}

export const DeviceCreationDrawer: React.FC<ICreationDrawerProps<IDeviceUpdateDto>> = ({ params, onClose, token }) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [deviceId, setDeviceId] = useState<number | null>(null);
    const [form] = Form.useForm<IDeviceForm>();

    useEffect(() => {
        setOpen(params.open);
        setMode(params.mode);
        setDeviceId(params.data?.id || null);

        if (params.mode === 'edit' && params.data) {
            form.setFieldsValue({
                ...params.data
            });
        } else {
            form.resetFields();
        }

    }, [form, params]);

    const submitForm = (values: IDeviceForm) => {
        const payload: ICreateDeviceDto = {
            name: values.name,
            price: values.price,
            sale: values.sale,
            availability: values.availability,
            brandId: values.brandId,
            categoryId: values.categoryId,
            image_url: values.image_raw[0].response
        }

        if (mode === 'create') {
            dispatch(devicesActions.createDevice({ token, payload })).unwrap().then(() => {
                onClose({ refreshItems: true });
            })
        } else if (mode === 'edit' && deviceId) {
            DevicesService.update(token, { ...payload, id: deviceId })
                .then(() => {
                    dispatch(
                        addNotification({
                            title: 'User',
                            message: 'Device updated successfully',
                            type: 'success',
                        })
                    );
                    onClose({ refreshItems: true });
                })
                .catch((error) => {
                    dispatch(
                        addNotification({
                            title: 'Device update error',
                            message: errorHandler(error),
                            type: 'error'
                        })
                    );
                })
        }
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

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList
    };

    return (
        <Drawer
            title="Create new device"
            width={ 320 }
            onClose={ () => onClose() }
            open={ open }
            bodyStyle={ { paddingBottom: 80 } }
            extra={
                <Space>
                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                        Submit
                    </Button>
                </Space>
            }
        >
            <Form
                layout="vertical"
                requiredMark={false}
                form={form}
                onFinish={ submitForm }>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={ [{ required: true, message: 'Please enter user name' }] }
                        >
                            <Input placeholder="Please enter user name"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={ [{ required: true, message: 'Please enter device price' }] }
                        >
                            <InputNumber placeholder="Please enter device price" style={ { width: '100%' } } />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="sale"
                            label="Sale"
                            rules={ [{ required: true, message: 'Please enter device sale' }] }
                        >
                            <InputNumber placeholder="Please enter device sale" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="availability"
                            label="Availability"
                            rules={ [{ required: true, message: 'Please enter device availability' }] }
                        >
                            <InputNumber placeholder="Please enter device availability"  style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="brandId"
                            label="Brand"
                        >
                            <Select options={ brandsOptions ?? [] }></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="categoryId"
                            label="Category"
                        >
                            <Select options={ categoriesOptions ?? [] }></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Image
                            width={200}
                            alt='Device image'
                            src={ IMAGE_STORAGE_URL +  params.data?.image_url  + '/-/preview/500x500/' }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="image_raw"
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Upload device image"
                        >
                            <Upload name="image" action={ BACKEND_URL + 'files/upload' } listType="picture">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};
