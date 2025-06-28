import React from 'react';
import styled from 'styled-components';
import { selectGlassmorphism, createGlassmorphismStyle } from '../../lib/glassmorphism';
import theme from '../../lib/colors';

const { colors } = theme;
interface Option {
  value: string | number;
  label: string;
}

interface GlassSelectProps {
  label?: string;
  options: Option[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  placeholder?: string;
  dir?: 'rtl' | 'ltr';
  fullWidth?: boolean;
}

const SelectContainer = styled.div<{ fullWidth: boolean }>`
  position: relative;
  margin-bottom: 1.5rem;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  text-align: right;
`;

const SelectLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: ${colors.text.light};
  font-weight: 500;
`;

const StyledSelect = styled.select<{ hasError: boolean }>`
  ${() => createGlassmorphismStyle(selectGlassmorphism)}
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: ${colors.text.light};
  font-size: 1rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.hasError ? colors.state.error : 'rgba(255, 255, 255, 0.2)'};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  padding-right: 2.5rem;
  
  &:focus {
    border-color: ${props => props.hasError ? colors.state.error : colors.primary.DEFAULT};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(3, 233, 244, 0.2)'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  option {
    background-color: #1f2937;
    color: ${colors.text.light};
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.state.error};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const GlassSelect: React.FC<GlassSelectProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  required = false,
  disabled = false,
  error,
  className = '',
  placeholder,
  dir = 'rtl',
  fullWidth = true,
}) => {
  return (
    <SelectContainer className={`glass-select-container ${className}`} fullWidth={fullWidth}>
      {label && (
        <SelectLabel htmlFor={name}>
          {label}
          {required && <span style={{ color: colors.state.error, marginRight: '0.25rem' }}>*</span>}
        </SelectLabel>
      )}
      <StyledSelect
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="glass-select"
        hasError={!!error}
        dir={dir}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectContainer>
  );
};

export default GlassSelect;
