import React, { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { useAppDispatch } from "@/hooks";
import { BrandsService } from "@/services/brands.service";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import { ICreationDrawerProps } from "@/types";
import { ICreateBrandDto, IUpdateBrandDto } from "@ecommerce-store/common";


interface IBrandForm {
    name: string;
    description: string;
}

const BrandCreationDrawer: React.FC<ICreationDrawerProps<IUpdateBrandDto>> = ({ params, onClose, token }) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [brandId, setBrandId] = useState<number | null>(null);
    const [form] = Form.useForm<IBrandForm>();

    useEffect(() => {
        setOpen(params.open);
        setMode(params.mode);
        setBrandId(params.data?.id || null);

        if (params.mode === 'edit' && params.data) {
            form.setFieldsValue({
                ...params.data
            });
        } else {
            form.resetFields();
        }

    }, [form, params]);

    const submitForm = (values: IBrandForm) => {
        const payload: ICreateBrandDto = {
            ...values
        }
        if (mode === 'create') {
            BrandsService.create(token, payload)
                .then(() => {
                    dispatch(
                        addNotification({
                            title: 'Brand',
                            message: 'Brand created successfully',
                            type: 'success',
                        })
                    );
                    onClose({ refreshItems: true });
                })
                .catch((error) => {
                    dispatch(
                        addNotification({
                            title: 'Brand creation error',
                            message: errorHandler(error),
                            type: 'error'
                        })
                    );
                })
        }
        else if (mode === 'edit' && brandId) {
            BrandsService.update(token, { ...payload, id: brandId })
                .then(() => {
                    dispatch(
                        addNotification({
                            title: 'Brand',
                            message: 'Brand updated successfully',
                            type: 'success',
                        })
                    );
                    onClose({ refreshItems: true });
                })
                .catch((error) => {
                    dispatch(
                        addNotification({
                            title: 'Brand update error',
                            message: errorHandler(error),
                            type: 'error'
                        })
                    );
                })
        }
    }

    return (
        <Drawer
            title={ mode === 'create' ? 'Create new brand' : 'Edit brand' }
            width={ 320 }
            onClose={ () => onClose() }
            open={ open }
            bodyStyle={ { paddingBottom: 80 } }
            extra={
                <Space>
                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                        { mode === 'create' ? 'Create' : 'Save' }
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
                            rules={ [{ required: true, message: 'Please enter brand name' }] }
                        >
                            <Input placeholder="Please enter brand name"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={ [{ required: true, message: 'Please enter brand description' }] }
                        >
                            <Input placeholder="Please enter brand description"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default BrandCreationDrawer;
