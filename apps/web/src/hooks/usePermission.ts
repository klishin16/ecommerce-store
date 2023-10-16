import { useTypedSelector } from "@/hooks/index";

export const usePermission = () => {
    const {optionalFunctions} = useTypedSelector(state => state.settings);

    const isPermissionActive = (key: string) => {
        return optionalFunctions.find(v => v.key === key)?.value.isActive;
    }

    return {
        isPermissionActive
    }
}
