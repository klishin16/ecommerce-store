import React from "react";

export interface IBreadcrumbRoute {
    path: string,
    breadcrumbName: string,
}

export interface IAdminViewProps {
    breadcrumbPath: IBreadcrumbRoute[]
}

export enum EAdminViews {
    SETTINGS = "/admin/settings",
    USERS = "/admin/users",
    STATISTICS = "/admin/statistics",
    DEVICES = "/admin/devices",
    CATEGORIES = "/admin/categories",
    BRANDS = "/admin/brands",
    FILES = "/admin/files",
    OTHER = "/admin/other"
}

export interface ISidebarItem {
    title: string;
    icon: React.ReactNode;
    view: EAdminViews;
}
