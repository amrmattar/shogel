import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMessages } from '../../core/redux/reducers/Messages/Messages.core';

function MyApp({ message, type, clickMe }) {
    const dispatch = useDispatch()
    const elementRef = useRef();
    const any = useCallback(
        () => {
            clickMe && elementRef.current.click()
            dispatch(getMessages({ messages: message, messageType: type, messageClick: false }))
        },
        [clickMe, dispatch, message, type],
    )
    useEffect(() => {
        any()
    }, [any])
    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    return (
        <Button ref={elementRef} className="d-none" id='x' onClick={handleClickVariant(type)}></Button>
    );
}
export default React.memo(function UserFeedBackShared({ message, type, clickMe }) {
    const [state] = useState({
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal } = state;
    return (
        <SnackbarProvider autoHideDuration={2000} maxSnack={1} anchorOrigin={{ vertical, horizontal }}>
            { clickMe && <MyApp message={message} type={type} clickMe={clickMe} /> }
        </SnackbarProvider>
    )
})
