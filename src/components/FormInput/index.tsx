import { Field } from 'formik';
import { InputHTMLAttributes } from 'react';
import './style.css';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  src: string;
  alt: string;
}

export const FormInput = ({
  className,
  name,
  type,
  placeholder,
  src,
  alt
}: FormInputProps) => {
  return (
    <div className="sec-input">
      <img className="svg" src={src} alt={alt} />

      <Field
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
