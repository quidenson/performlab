import React from "react"
import "./ErrorHandler.less"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"

// interface SerializedError {
//     name?: string
//     message?: string
//     stack?: string
//     code?: string
//   }

interface IErrorHandlerProps {
  error?: Partial<FetchBaseQueryError & SerializedError>
}

export const ErrorHandler: React.FC<IErrorHandlerProps> = ({ error }) => {
  const status = error?.status || error?.code || error?.name

  const message =
    typeof error?.data === "string"
      ? error.data
      : (error?.data as any)?.message ||
        (error?.data as any)?.error ||
        error?.message ||
        "Unknown error occurred"

  return (
    <div className="error-message">
      {status && <div className="error-status">{status}</div>}
      <p className="error-text">{message}</p>
    </div>
  )
}
