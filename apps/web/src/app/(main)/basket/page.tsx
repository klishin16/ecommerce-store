'use client'
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { useBasket } from "@/hooks/useBasket";
import { Image } from "antd";
import Text from "antd/es/typography/Text";
import React, { useEffect, useState } from "react";
import { IMAGE_STORAGE_URL } from "@/constants";

const BasketPageContainer = styled.div`
  width: 40vw;
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

const BasketPage = () => {
    const { purchases } = useBasket();
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        setTotal(
            purchases.reduce<number>((acc, purchase) => {
                const price = Math.floor(purchase.device.price * (100 - (purchase.device?.sale ?? 0)) / 100);

                return acc + purchase.amount * price
            }, 0)
        )
    }, [purchases]);

    const purchasesCards = () => purchases.map((purchase) => (
        <PurchaseCard key={ purchase.id }>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <Image
                    width={ '90px' }
                    src={ IMAGE_STORAGE_URL + purchase.device.image_url + '/-/preview/500x500/' }
                    alt='Device image'
                    preview={false}
                />
                <Title style={{ margin: 0 }} level={3}>{ purchase.device.name }</Title>
                <Title style={{ margin: 0 }} level={4}>Amount: { purchase.amount }</Title>
            </div>
            { purchase.device.sale ?
                <div style={{ display: "flex", gap: '4px' }}>
                    <Title type='success' level={4} style={{ margin: 0 }}>
                        { Math.floor(purchase.device.price * (100 - purchase.device.sale) / 100) } ₽
                    </Title>
                    <Text delete>{ purchase.device.price }</Text>
                </div> :
                <Title level={4} style={{ margin: 0 }}>{ purchase.device.price } ₽</Title>
            }
        </PurchaseCard>
    ))

    return (
        <BasketPageContainer>
            <Title level={2}>Basket</Title>

            <PurchasesContainer style={{ marginBottom: 14 }}>
                { purchasesCards() }
            </PurchasesContainer>
            <PurchaseCard>
                <Title level={3} style={{ margin: 0 }}>Total:</Title>
                <Title level={3} style={{ margin: 0 }}>{ total } ₽</Title>
            </PurchaseCard>
        </BasketPageContainer>
    )
}

export default BasketPage;