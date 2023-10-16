'use client'
import styled from "styled-components";
import { Button, Card, CardProps, Form, Input } from "antd";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import { register } from "@/redux/features/auth.slice";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import Link from "next/link";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import { IRegisterPayload } from "@ecommerce-store/common";

const RegisterPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #a0d7e7, #6c5dd3);
`

const RegistrationCard = styled((props: CardProps) => <Card {...props}/>)`
  width: 300px;
  display: flex;
  flex-direction: column;
`

const RegisterPage = () => {
    const { isLoading } = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const submitForm = (data: IRegisterPayload) => {
        const payload: IRegisterPayload = {
            email: data.email,
            password: data.password
        }

        dispatch(register(payload)).unwrap()
            .then(() => {
                dispatch(addNotification({
                    title: 'Registration',
                    message: 'Successfully registered',
                    type: 'success',
                }));
            })
            .catch((e) => {
                dispatch(addNotification({
                    title: 'Registration error',
                    message: errorHandler(e),
                    type: 'error',
                }));
            })
    };


    return (
        <RegisterPageWrapper>
            <RegistrationCard title="React store"
                              headStyle={ { display: "flex", justifyContent: "center", fontSize: "1.6rem" } }
                              bordered={ true }
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={ { remember: true } }
                    onFinish={ submitForm }
                >
                    <Form.Item
                        name="email"
                        rules={ [{ required: true, message: 'Please input your Email!' }] }
                    >
                        <Input prefix={ <MailOutlined/> } placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={ [{ required: true, message: 'Please input your Password!' }] }
                    >
                        <Input
                            prefix={ <LockOutlined className="site-form-item-icon"/> }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item noStyle>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={ isLoading }>
                            Register
                        </Button>
                        <span style={ { marginLeft: '8px' } }>Or <Link href="/auth/login/">login!</Link></span>
                    </Form.Item>
                </Form>
            </RegistrationCard>
        </RegisterPageWrapper>
    );
};

export default RegisterPage;
