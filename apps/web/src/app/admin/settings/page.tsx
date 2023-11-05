'use client'
import React, { useEffect } from 'react';
import { Button, Card, Col, Divider, Form, Input, Row, Space, Switch, Typography } from "antd";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import { settingsActions } from "@/redux/features/settings.slice";
import { ESettingsKinds, EThemes, ISettingsSaveDto } from "@ecommerce-store/common";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { notificationsActions } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions";
import withSettings from "@/app/components/HOC/withSettings";
import styled from "styled-components";
import AppBreadcrumbs from "@/app/components/breadcrumbs";


const SettingsContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
`

interface IOptionalFunctionsForm {
    optionalFunctions: Array<{
        key: string;
        isActive: boolean;
    }>
}

const AdminSettings = () => {
    const {Text, Title} = Typography;

    const {theme, optionalFunctions} = useTypedSelector(state => state.settings);
    const dispatch = useAppDispatch();
    const [optionalFunctionsForm] = Form.useForm<IOptionalFunctionsForm>();

    const changeTheme = () => {
        dispatch(settingsActions.setTheme(theme === EThemes.LIGHT ? EThemes.DARK : EThemes.LIGHT));
    }

    useEffect(() => {
        console.log('h', optionalFunctions.map(v => ({
            key: v.key,
            isActive: v.value.isActive
        })))
        optionalFunctionsForm.setFieldValue(
            'optionalFunctions',
            optionalFunctions.map(v => ({
                key: v.key,
                isActive: v.value.isActive
            }))
        )
    }, [optionalFunctions]);

    const submitOptionalFunctionsFormHandler = (values: IOptionalFunctionsForm) => {
        console.log('Received values of form:', values);
        const payload: ISettingsSaveDto = {
            settings: values.optionalFunctions.map((optionalFunction) => ({
                key: optionalFunction.key,
                kind: ESettingsKinds.OPTIONAL_FUNCTION,
                value: {
                    isActive: optionalFunction.isActive
                }
            }))
        }
        dispatch(settingsActions.saveSettings(payload)).unwrap()
            .then(() => {
                dispatch(notificationsActions.addNotification({
                    title: 'Settings',
                    message: 'Settings saved successfully',
                    type: 'success'
                }))
            })
            .catch((e) => {
                dispatch(notificationsActions.addNotification({
                    title: 'Settings save error',
                    message: errorHandler(e),
                    type: 'error'
                }))
            })
    };

    return (
        <>
            <AppBreadcrumbs/>

            <SettingsContainer>
                <Card>
                    <Row>
                        <Title level={ 4 } style={ {margin: 0} }>Settings</Title>
                    </Row>

                    {/* Theme */ }
                    <Divider orientation='left'>Theme</Divider>
                    <Row gutter={ 8 }>
                        <Col span={ 22 }>
                            <Text>Dark mode</Text>
                        </Col>
                        <Col span={ 2 }>
                            <Switch checked={ theme === EThemes.DARK } onChange={ changeTheme }/>
                        </Col>
                    </Row>

                    {/* Test functional */ }
                    <Divider orientation='left'>Test functions</Divider>
                    <Row>
                        <Form
                            form={ optionalFunctionsForm }
                            onFinish={ submitOptionalFunctionsFormHandler }
                            style={ {maxWidth: 600} }
                        >
                            <Form.List name="optionalFunctions">
                                { (fields, {add, remove}, {errors}) => (
                                    <>
                                        { fields.map(({key, name, ...rest}, index) => (
                                            <Space key={ key } style={ {display: 'flex', marginBottom: 8} }
                                                   align="baseline">
                                                <Row gutter={ 12 } align='middle'>
                                                    <Col span={ 12 }>
                                                        <Form.Item
                                                            { ...rest }
                                                            name={ [name, 'key'] }
                                                            validateTrigger={ ['onChange', 'onBlur'] }
                                                            rules={ [
                                                                {
                                                                    required: true,
                                                                    whitespace: false,
                                                                    message: "Input key",
                                                                },
                                                            ] }
                                                            noStyle
                                                        >
                                                            <Input placeholder="Optional fuction key"/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={ 8 }>
                                                        <Form.Item
                                                            { ...rest }
                                                            name={ [name, 'isActive'] }
                                                            label="Is active"
                                                            style={ {margin: 0} }
                                                            initialValue={ false }
                                                            valuePropName="checked">
                                                            <Switch />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={ 2 }>
                                                        <CloseOutlined
                                                            onClick={ () => remove(name) }
                                                            hidden={ fields.length <= 1 }
                                                        />
                                                    </Col>
                                                </Row>
                                            </Space>
                                        )) }

                                        {/* Добавить ключ */ }
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={ () => add() }
                                                icon={ <PlusOutlined/> }
                                            >
                                                Add key
                                            </Button>
                                            <Form.ErrorList errors={ errors }/>
                                        </Form.Item>
                                    </>
                                ) }
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                    </Row>
                </Card>
            </SettingsContainer>
        </>
    );
};

export default withSettings(AdminSettings);
