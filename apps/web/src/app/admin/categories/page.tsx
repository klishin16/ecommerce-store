'use client'
import AppBreadcrumbs from "@/app/components/breadcrumbs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import type { DataNode } from 'antd/es/tree';
import { Button, Card, Row, Tree } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";
import { AppColors } from "@/constants";
import { useAppDispatch, useRequest } from "@/hooks";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import CategoriesCreationDrawer from "@/app/components/categories/categories-creation-drawer";
import { CategoriesService } from "@/services/categories.service";
import { ICategory, IUpdateCategoryDto } from "@ecommerce-store/common";
import withAuth from "@/app/components/HOC/withAuth";
import { useDrawer } from "@/hooks/useDrawer";


const CategoriesContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
`

interface ICategoryTreeNode extends ICategory {
    key: React.Key;
    title: string;
    children: ICategoryTreeNode[];
}

const createCategoriesTree = (dataset: ICategory[]): DataNode[] => {
    const treeNodesMap = new Map<number, ICategoryTreeNode>();
    dataset.forEach(category => treeNodesMap.set(category.id, {...category, key: category.id, title: category.name, children: []}));

    const dataTree: DataNode[] = [];
    dataset.forEach(category => {
        if(category.parentId) {
            treeNodesMap.get(category.parentId)?.children.push(treeNodesMap.get(category.id)!)
        } else {
            dataTree.push(treeNodesMap.get(category.id)!);
        }
    });
    return dataTree;
};

const AdminCategories = ({ token }: { token: string }) => {
    const dispatch = useAppDispatch();
    const { drawerProps, openDrawer } = useDrawer<IUpdateCategoryDto>({
        onClose: params => {
            if (params?.refreshItems) {
                refreshCategories();
            }
        }
    })

    const [categories, loading, refreshCategories] = useRequest(() =>
        CategoriesService.fetchAll()
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Categories loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );

                return []
            })
    )

    const [categoriesTree, setCategoriesTree] = useState<DataNode[] | null>(null);
    useEffect(() => {
        if (categories) {
            setCategoriesTree(createCategoriesTree(categories))
        }
    }, [categories])


    return (
        <>
            <AppBreadcrumbs/>

            <CategoriesContainer>
                <Card size={ "small" } style={ { marginBottom: 8 } }>
                    <Row justify={ "end" }>
                        <Button
                            color={ "blue" }
                            icon={ <RedoOutlined/> }
                            loading={ loading }
                            onClick={ () => refreshCategories() }
                        >Refresh</Button>
                        <Button onClick={ () => openDrawer() } style={ {
                            color: AppColors.GREEN,
                            borderColor: AppColors.GREEN,
                            marginLeft: '.5vw'
                        } }>Create</Button>
                    </Row>
                </Card>

                <Tree
                    defaultExpandAll
                    showLine
                    switcherIcon={ <DownOutlined/> }
                    treeData={ categoriesTree ?? [] }
                    blockNode
                />

                <CategoriesCreationDrawer token={token}  { ...drawerProps }  categories={ categories }/>
            </CategoriesContainer>
        </>
    )
}

export default withAuth(AdminCategories);
