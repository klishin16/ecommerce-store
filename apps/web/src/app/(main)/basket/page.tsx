'use client'
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { Col, Image, Row } from "antd";
import Text from "antd/es/typography/Text";
import React, { useEffect, useState } from "react";
import { IMAGE_STORAGE_URL } from "@/constants";
import withBasket from "@/app/components/HOC/withBasket";
import { IPurchase } from "@ecommerce-store/common";

const BasketPageContainer = styled.div`
  width: 50vw;
  height: 100%;
  margin: auto;
  padding-top: 90px;
  padding-bottom: 10px;

  display: flex;
  flex-direction: column;
`

const PurchasesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const PurchaseCard = styled.div`
  width: 100%;
  padding: 14px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`


const BasketPage = ({purchases}: { purchases: IPurchase[] | null }) => {
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    setTotal(
      purchases?.reduce<number>((acc, purchase) => {
        const price = Math.floor(purchase.device.price * (100 - (purchase.device?.sale ?? 0)) / 100);

        return acc + purchase.amount * price
      }, 0) ?? 0
    )
  }, [purchases]);

  const purchasesCards = () => purchases?.map((purchase) => (
    <PurchaseCard key={ purchase.id }>
      <Row gutter={8} align={"middle"} style={{ width: '100%' }}>
        {/* Image */}
        <Col span={4}>
          <Image
            width={ '90px' }
            src={ IMAGE_STORAGE_URL + purchase.device.image_url + '/-/preview/500x500/' }
            alt='Device image'
            preview={ false }
          />
        </Col>

        {/* Name */}
        <Col span={12}>
          <Title style={{ margin: 0 }} level={ 3 }>{ purchase.device.name }</Title>
        </Col>

        {/* Amount */}
        <Col span={4}>
          <Title style={ {margin: 0} } level={ 4 }>Amount: { purchase.amount }</Title>
        </Col>

        {/* Price */}
        <Col span={4}>
          { purchase.device.sale ?
            <div style={{ flex: '1 1 120px', display: "flex", gap: '4px'} }>
              <Title type='success' level={ 4 } style={ {margin: 0} }>
                { Math.floor(purchase.device.price * (100 - purchase.device.sale) / 100) } ₽
              </Title>
              <Text delete>{ purchase.device.price }</Text>
            </div> :
            <Title level={ 4 } style={ {margin: 0} }>{ purchase.device.price } ₽</Title>
          }
        </Col>
      </Row>
    </PurchaseCard>
  ))

  return (
    <BasketPageContainer>
      <Title level={ 2 }>Cart</Title>

      <PurchasesContainer style={ {marginBottom: 14} }>
        { purchasesCards() }
      </PurchasesContainer>
      <PurchaseCard>
        <Title level={ 3 } style={ {margin: 0} }>Total:</Title>
        <Title level={ 3 } style={ {margin: 0} }>{ total } ₽</Title>
      </PurchaseCard>
    </BasketPageContainer>
  )
}

//@ts-ignore
export default withBasket(BasketPage);
