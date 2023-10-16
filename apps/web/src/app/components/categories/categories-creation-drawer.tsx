import React from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useAppDispatch } from "@/hooks";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import { ICreationDrawerProps } from "@/types";
import { CategoriesService } from "@/services/categories.service";
import { ICategory, IUpdateCategoryDto } from "@ecommerce-store/common";


interface ICategoryForm {
    name: string;
    parentCategoryId: number | null;
}

interface ICategoryCreationDrawerProps extends ICreationDrawerProps<IUpdateCategoryDto> {
    categories: ICategory[] | null
}

const CategoryCreationDrawer: React.FC<ICategoryCreationDrawerProps> = ({ params, categories, token, onClose }) => {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm<ICategoryForm>();

    const submitForm = (values: ICategoryForm) => {
        CategoriesService.create(token, values)
            .then(() => {
                dispatch(
                    addNotification({
                        title: 'Category',
                        message: 'Category created successfully',
                        type: 'success',
                    })
                );
                onClose({ refreshItems: true });
            })
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Category creation error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );
            })
    }

    const categories2options = (categories: ICategory[] | null) => categories?.map((category) => ({
        value: category.id,
        label: category.name
    }))

    return (
        <Drawer
            title="Create new category"
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
                            name="parentCategoryId"
                            label="Parent category"
                        >
                            <Select options={ categories2options(categories) ?? [] }></Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default CategoryCreationDrawer;
