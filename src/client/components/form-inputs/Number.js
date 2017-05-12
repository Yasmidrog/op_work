import NumberInput from 'react-number-input';
import React from 'react'
import { FormInput } from 'react-form'

export default ({field, ...rest}) => {
    return (
        <FormInput field={field}>
            {({ setValue, getValue}) => {
                return (
                    <NumberInput type="number"
                        {...rest}
                        value={getValue()}
                        onChange={val => setValue(val)}
                    />
                )
            }}
        </FormInput>
    )
}