import React from 'react';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { useAppDispatch } from "@/hooks";
import { BrandsService } from "@/services/brands.service";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import { ICreationDrawerProps } from "@/types";
import { IUpdateBrandDto } from "@ecommerce-store/common";


interface IBrandForm {
    name: string;
    description: string;
}

const BrandCreationDrawer: React.FC<ICreationDrawerProps<IUpdateBrandDto>> = ({ params, onClose, token }) => {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm<IBrandForm>();

    const submitForm = (values: IBrandForm) => {
        BrandsService.create(token, values)
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

    return (
        <Drawer
            title="Create new brand"
            width={ 320 }
            onClose={ () => onClose() }
            open={ params.open }
            bodyStyle={ { paddingBottom: 80 } }
            extra={
                <Space>
                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                        Create
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
