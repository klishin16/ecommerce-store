import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ERoutes } from "@/constants";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import { EUserRoles, IUser } from "@ecommerce-store/common";
import { notificationsActions } from "@/redux/features/notifications.slice";
import { authActions } from "@/redux/features/auth.slice";
import Loader from "@/app/components/loader";


const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & {
    token: string
  }>, allow_roles?: EUserRoles[]) => {
    const AuthenticatedComponent = (props: P) => {
      const dispatch = useAppDispatch();
      const router = useRouter();
      const pathname = usePathname();
      const { token, isAuthenticated, user } = useTypedSelector(state => state.auth);

      const redirectToLogin = () => {
        return router.push(ERoutes.LOGIN + `?continue=${ pathname }`);
      }

      const checkUserRoleAccess = (user: IUser) => !allow_roles || (allow_roles.includes(user.role));

      const canActivate = () => {
        if (isAuthenticated && user) {
          console.log('user', user)
          /** Если авторизованы, проверяем соответствие роли */
          if (!checkUserRoleAccess(user)) {
            throw new Error('No role access')
          }
        } else {
          /** Иначе, авторизуем пользователя */
          dispatch(authActions.authenticate())
        }
      }

      useEffect(() => {
          try {
            canActivate()
            console.log('withAuth', token, isAuthenticated, user)
          } catch (e) {
            if (e instanceof Error) {
              dispatch(notificationsActions.addNotification({
                title: 'Auth error',
                message: e.message,
                type: 'error'
              }))
            }
            redirectToLogin();
          }
        }
      )

      if (!!token && isAuthenticated && !!user) {
        return <WrappedComponent { ...props } token={ token }/>
      }

      return <Loader />
    };

    return AuthenticatedComponent;
  }
;

export default withAuth;
