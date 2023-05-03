import "style/themes/cqgc/dist/antd.css";
import "style/themes/cqgc/main.scss";
import "./index.scss";

import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { kcContext as kcLoginThemeContext } from "./keycloak/KcContext";

const KcLoginThemeApp = lazy(() => import("keycloak/KcApp"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>
            {(()=>{

                if( kcLoginThemeContext !== undefined ){
                    return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
                }

                throw new Error(
                  "This app is a Keycloak theme" +
                  "It isn't meant to be deployed outside of Keycloak"
                );

            })()}
        </Suspense>
    </StrictMode>
);