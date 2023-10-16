'use client'
import {
    FileOutlined,
    GiftOutlined,
    MobileOutlined,
    PieChartOutlined,
    SettingOutlined,
    TeamOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import React from "react";
import { EAdminViews, ISidebarItem } from "@/types";

export const sidebarItems: ISidebarItem[] = [
    {
        title: 'Statistics',
        icon: <PieChartOutlined/>,
        view: EAdminViews.STATISTICS
    },

    {
        title: "Users",
        icon: <TeamOutlined/>,
        view: EAdminViews.USERS
    },
    {
        title: "Devices",
        icon: <GiftOutlined/>,
        view: EAdminViews.DEVICES
    },
    {
        title: "Categories",
        icon: <UnorderedListOutlined/>,
        view: EAdminViews.CATEGORIES
    },
    {
        title: "Brands",
        icon: <MobileOutlined/>,
        view: EAdminViews.BRANDS
    },
    {
        title: "Settings",
        icon: <SettingOutlined/>,
        view: EAdminViews.SETTINGS
    },
    {
        title: "Files",
        icon: <FileOutlined/>,
        view: EAdminViews.FILES
    }
]
