import React, { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import { Spin } from "antd";
import styled from "styled-components";
import { SettingsService } from "@/services/settings.service";
import { settingsActions } from "@/redux/features/settings.slice";

const SettingsLoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const withSettings = <P extends NonNullable<unknown>>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithSettings = (props: P) => {
        const dispatch = useAppDispatch();
        const settings = useTypedSelector(state => state.settings);

        useEffect(() => {
            const loadSettings = () => {
                console.log('111')
                if (settings.isLoaded) {
                    return
                }

                console.log('No settings in store, trying load');

                dispatch(settingsActions.loadSettings())
            }

            loadSettings();
        }, []);

        if (!settings.isLoaded) {
            return (
                <SettingsLoaderContainer className='auth-loader-container'>
                    <Spin/>
                </SettingsLoaderContainer>
            )
        }

        return <WrappedComponent { ...props } settings={ settings }/>
    };

    return ComponentWithSettings;
};

export default withSettings;
