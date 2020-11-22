import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  --focus-color: blue;
  --invalid-color: red;

  box-sizing: border-box;
  padding: calc(0.5em - 1px) 0.5em;

  border-radius: 4px;
  outline: 0;

  display: block;
  width: 100%;
  
  border: 1px solid lightgray;
  background-color: lightgray;

  &:hover {
    border-bottom: 1px solid var(--focus-color);
  }

  &:focus {
    border-bottom: 1px solid var(--focus-color);
  }  

  &:invalid::not(::empty) {
    border-bottom: 1px solid var(--invalid-color);
  }

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: inset 0 0 999em rgba(128, 128, 128, 0.2);
  }
`

export interface TextInputProps {
  value?: string | number
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  placeholder?: string
}

export function TextInput ({
  value,
  onChange,
  placeholder,
  required,
  disabled
}: TextInputProps) {
  return (
    <StyledInput
      type='text'
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        onChange && onChange(event.target.value, event)
      }} />
  )
}
