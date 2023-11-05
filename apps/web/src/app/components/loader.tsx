import React from 'react';
import { Spin } from "antd";
import styled from "styled-components";


const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Loader = () => {
  return (
    <LoaderContainer className='loader-container'>
      <Spin/>
    </LoaderContainer>
  );
};

export default Loader;
