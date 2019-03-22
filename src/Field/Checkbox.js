import _ from 'lodash';
import React from 'react';
import Label from './Label';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import FieldTemplate from '../FieldTemplate';
import { changeHandler, joinNames } from '../utils';

const Checkbox = ({ config, formik, value, error }) => {
    const {
        name,
        label,
        attributes,
        options = [],
        labelClass = '',
        formGroupClass = 'form-group',
        formCheckClass = 'form-check',
        fieldClass = 'form-check-input',
        template: Template = FieldTemplate,
        formCheckLabelClass = 'form-check-label',
    } = config;

    const { handleChange, handleBlur } = formik;
    const checkboxValue = value || [];
    return (
        <Template name={ name } label={ label } labelClass={ labelClass } formGroupClass={ formGroupClass }>
            { _.map(options, ({ value, label }, key, index ) => {
                let fieldName = _.kebabCase(name + ' ' + value);
                return (
                    <div key={ key } className={ formCheckClass }>
                        <label htmlFor={ fieldName } className={ formCheckLabelClass }>
                            <input
                                id={ fieldName }
                                name={ `${name}.${key}` }
                                className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                                type="checkbox"
                                checked={ checkboxValue[key] || false }
                                onChange={ event => {
                                    changeHandler(handleChange, formik, config, event);
                                    handleBlur(event);
                                }}
                                { ...attributes } /> { label }
                        </label>
                    </div>
                );
            })}
        </Template>
    );
}

Checkbox.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        options: PropTypes.array.isRequired,
        labelClass: PropTypes.string,
        fieldClass: PropTypes.string,
        formGroupClass: PropTypes.string,
        formCheckClass: PropTypes.string
    })
}

export default React.memo(Checkbox);