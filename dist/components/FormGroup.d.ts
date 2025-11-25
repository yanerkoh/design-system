import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type FormGroupProps = {
    label?: string;
    description?: string;
    error?: string;
    children?: React.ReactNode;
};
declare function FormGroup({ label, description, error, children }: FormGroupProps): react_jsx_runtime.JSX.Element;
type FormGroupDXPlusProps = {
    label?: string;
    required?: boolean;
    description?: string;
    error?: string;
    children?: React.ReactNode;
    spacing?: string | number;
};
declare const FormGroupDXPlus: React.FC<FormGroupDXPlusProps>;

export { FormGroup, FormGroupDXPlus };
