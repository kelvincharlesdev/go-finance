import './style.css';

export type ErrorMessageType = string | false | undefined;

interface ErrorMessageProps {
  message: ErrorMessageType;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <span className="msg-error">{message}</span>;
};
