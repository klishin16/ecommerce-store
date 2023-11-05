import React, { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import { settingsActions } from "@/redux/features/settings.slice";
import Loader from "@/app/components/loader";


const withSettings = <P extends NonNullable<unknown>>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithSettings = (props: P) => {
        const dispatch = useAppDispatch();
        const settings = useTypedSelector(state => state.settings);

        useEffect(() => {
            const loadSettings = () => {
                if (settings.isLoaded) {
                    return
                }

                console.log('No settings in store, trying load...');

                dispatch(settingsActions.loadSettings())
            }

            loadSettings();
        }, []);

        if (!settings.isLoaded) {
            return <Loader />
        }

        return <WrappedComponent { ...props } settings={ settings }/>
    };

    return ComponentWithSettings;
};

export default withSettings;
