import "./LoadingSpinner.less"

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="loading-spinner" role="status">
      <div className="spinner" />
      <div className="loading-text">{message}</div>
    </div>
  )
}