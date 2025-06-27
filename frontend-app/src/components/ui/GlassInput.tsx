// src/components/ui/GlassInput.tsx

import React from 'react';
import styled from 'styled-components';
import { inputGlassmorphism, createGlassmorphismStyle } from '../../lib/glassmorphism';
import colors from '../../lib/colors';

interface GlassInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean; // ✅ تمت الإضافة هنا
  error?: string;
  className?: string;
  icon?: React.ReactNode;
  dir?: 'rtl' | 'ltr';
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth: boolean }>`
  position: relative;
  margin-bottom: 1.5rem;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  text-align: right;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: ${colors.text.light};
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasIcon: boolean; hasError: boolean }>`
  ${() => createGlassmorphismStyle(inputGlassmorphism)}
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: ${props => props.hasIcon ? '2.5rem' : '1rem'};
  border-radius: 8px;
  color: ${colors.text.light};
  font-size: 1rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.hasError ? colors.state.error : 'rgba(255, 255, 255, 0.2)'};

  &:focus {
    border-color: ${props => props.hasError ? colors.state.error : colors.primary.DEFAULT};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(3, 233, 244, 0.2)'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: ${colors.state.error};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const GlassInput: React.FC<GlassInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  required = false,
  disabled = false,
  readOnly = false, // ✅ تمت الإضافة هنا
  error,
  className = '',
  icon,
  dir = 'rtl',
  fullWidth = true,
}) => {
  return (
    <InputContainer className={`glass-input-container ${className}`} fullWidth={fullWidth}>
      {label && (
        <InputLabel htmlFor={name}>
          {label}
          {required && <span style={{ color: colors.state.error, marginRight: '0.25rem' }}>*</span>}
        </InputLabel>
      )}
      <InputWrapper>
        <StyledInput
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly} // ✅ تمت التمرير هنا
          className="glass-input"
          hasIcon={!!icon}
          hasError={!!error}
          dir={dir}
        />
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default GlassInput;
