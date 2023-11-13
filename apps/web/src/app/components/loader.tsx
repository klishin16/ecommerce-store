import React from 'react';
import { Button, Spin } from "antd";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/hooks";
import { taskActions } from "@/redux/features/task.slice";


const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Loader = () => {
  const dispatch = useAppDispatch();
  const showTaskHandler = () => {
    dispatch(taskActions.showModal())
  }

  return (
    <LoaderContainer className='loader-container'>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size='large' />
      <div>Пока сайт загружается можно посмотреть <Button type='primary' size='small' onClick={ showTaskHandler }>Задание</Button></div>
    </LoaderContainer>
  );
};

export default Loader;
