import * as react_jsx_runtime from 'react/jsx-runtime';
import react__default from 'react';

type FormGroupProps = {
    label?: string;
    description?: string;
    error?: string;
    children?: react__default.ReactNode;
};
declare function FormGroup({ label, description, error, children }: FormGroupProps): react_jsx_runtime.JSX.Element;
type FormGroupDXPlusProps = {
    label?: string;
    required?: boolean;
    description?: string;
    error?: string;
    children?: react__default.ReactNode;
    spacing?: string | number;
};
declare const FormGroupDXPlus: react__default.FC<FormGroupDXPlusProps>;

export { FormGroup, FormGroupDXPlus };
