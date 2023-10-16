'use client'
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Breadcrumb } from "antd";


function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const AppBreadcrumbs = () => {
    const [breadcrumbs, setBreadcrumbs] = useState<Array<{ breadcrumb: string; href: string }> | null>(null)
    const pathname = usePathname()
    useEffect(() => {
        if (pathname) {
            const linkPath = pathname.split("/")
            linkPath.shift()
            const pathArray = linkPath.map((path, i) => {
                return {
                    breadcrumb: capitalizeFirstLetter(path),
                    href: "/" + linkPath.slice(0, i + 1).join("/"),
                }
            })
            setBreadcrumbs(pathArray)
        }
    }, [pathname])
    if (!breadcrumbs) {
        return null
    }
    return (
        <Breadcrumb style={ { margin: '16px 0' } }>
            <Breadcrumb.Item key={-1}><Link href="/">Home</Link></Breadcrumb.Item>
            { breadcrumbs.map((breadcrumb, index) => {
                return (
                    <Breadcrumb.Item key={index}>
                        <Link href={ breadcrumb.href }>{ breadcrumb.breadcrumb }</Link>
                    </Breadcrumb.Item>
                )
            }) }
        </Breadcrumb>
    )
}
export default AppBreadcrumbs
