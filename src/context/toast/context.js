import React, { createContext, useState } from 'react'
import Toast from '../../components/styled/toast'

export const ToastContext = createContext({
    showToast: (toast) => { },
})

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(undefined)

    const showToast = (toast) => {
        setToast(toast)

        setTimeout(() => {
            setToast(undefined)
        }, 5000)
    }

    return (
        <ToastContext.Provider
            value={{
                showToast,
            }}
        >
            {toast && <Toast type={toast.type} message={toast.message} />}
            {children}
        </ToastContext.Provider>
    )
}
