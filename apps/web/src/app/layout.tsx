import './global.css';
import { StyledComponentsRegistry } from './registry';
import { ReduxProvider } from "@/redux/redux-provider";
import { Notifications } from "@/app/components";
import React from "react";

export const metadata = {
    title: 'Welcome to demo2',
    description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <StyledComponentsRegistry>
            <ReduxProvider>
                { children }
                <Notifications/>
            </ReduxProvider>
        </StyledComponentsRegistry>
        </body>
        </html>
    );
}
