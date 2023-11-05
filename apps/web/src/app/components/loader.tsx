import React from 'react';
import { Spin } from "antd";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";


const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Loader = () => {
  return (
    <LoaderContainer className='loader-container'>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size='large' />
    </LoaderContainer>
  );
};

export default Loader;
