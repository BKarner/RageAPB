import React from 'react';
import ReactDOM from 'react-dom/client';

import * as ALL_PAGES from './pages';

import { createGlobalStyle } from 'styled-components';
import { useImmer } from 'use-immer';
import { UI_RPC } from '@shared/constants/rpc';
import { useEventHandler } from './hooks';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: transparent !important;
    }
        
    #root {
        width: 100vw;
        height: 100vh;
    }
        
    * {
        box-sizing: border-box;
    }
`;

interface Pages {
    [properties: string]: any
}

function Main() {
    const [pages, setPages] = useImmer<Pages>({ });

    function showActivePages() {
        return Object.entries(pages).map(([name, props]) => {
            const Component = (ALL_PAGES as any)[name];

            return (
                <Component
                    key = { name }
                    { ...props }
                />
            )
        })
    }

    useEventHandler(UI_RPC.SHOW_PAGE, ([name, props]: [string, any]) => {
        setPages(draft => {
            draft[name] = props || {};
        });
    }, []);

    return(
        <React.Fragment>
            <GlobalStyle />

            { showActivePages() }

        </React.Fragment>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
)
