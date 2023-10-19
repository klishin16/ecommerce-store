import styled from "styled-components";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

const CounterContainer = styled.div`
  height: 34px;
  display: flex;
  flex-direction: row;
`

const NumberBlock = styled.div`
  text-align: center;
  vertical-align: top;
  line-height: 29px;
  font-size: 16px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  width: 16px;
`

interface ICountPickerProps {
    onChange: (value: number) => void;
}

const CountPicker: React.FC<ICountPickerProps> = ({ onChange }) => {
    const [count, setCount] = React.useState<number>(1)

    const increase = () => {
        setCount(count + 1)
        // @ts-ignore
        window.ym(95089246,'reachGoal','countPicker')
        onChange(count);
    }

    const decrease = () => {
        // @ts-ignore
        window.ym(95089246,'reachGoal','countPicker')
        setCount(count - 1 || 1)
        onChange(count)
    }

    return (
        <CounterContainer>
            <Button
                style={ { borderRight: "none", borderTopRightRadius: 0, borderBottomRightRadius: 0, height: '100%' } }
                type="default" shape="default"
                icon={ <MinusOutlined/> }
                onClick={ decrease }/>
            <NumberBlock>{ count }</NumberBlock>
            <Button style={ { borderLeft: "none", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: '100%' } }
                    type="default" shape="default"
                    icon={ <PlusOutlined/> }
                    onClick={ increase }/>
        </CounterContainer>
    )
}

export default CountPicker;
