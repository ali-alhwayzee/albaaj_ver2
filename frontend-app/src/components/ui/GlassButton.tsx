import React from 'react';
import styled from 'styled-components';
import { buttonGlassmorphism, createGlassmorphismStyle, createGlassmorphismHoverStyle } from '../../lib/glassmorphism';
import theme from '../../lib/colors';

const glow = theme.shadows.glow;

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const getButtonStyles = (variant: string) => {
  const colors = theme.colors;
  switch (variant) {
    case 'primary':
      return `
        background: ${colors.gradients.button};
        color: ${colors.text.dark};
        &:hover { box-shadow: ${glow}; }
      `;
    case 'secondary':
      return `
        background: ${colors.background.DEFAULT};
        color: ${colors.text.light};
        &:hover { background: ${colors.background.dark}; }
      `;
    case 'outline':
      return `
        background: transparent;
        color: ${colors.primary.DEFAULT};
        border: 2px solid ${colors.primary.DEFAULT};
        &:hover {
          background: rgba(3, 233, 244, 0.1);
          box-shadow: ${glow};
        }
      `;
    case 'text':
      return `
        background: transparent;
        color: ${colors.primary.DEFAULT};
        box-shadow: none;
        &:hover { background: rgba(3, 233, 244, 0.1); }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: string) => {
  switch (size) {
    case 'sm': return `padding: 0.5rem 1rem; font-size: 0.875rem;`;
    case 'md': return `padding: 0.75rem 1.5rem; font-size: 1rem;`;
    case 'lg': return `padding: 1rem 2rem; font-size: 1.125rem;`;
    default: return '';
  }
};

const StyledButton = styled.button<{
  fullWidth: boolean;
  variant: string;
  size: string;
  iconOnly: boolean;
  disabled: boolean;
}>`
  ${() => createGlassmorphismStyle(buttonGlassmorphism)}
  ${() => createGlassmorphismHoverStyle({ ...buttonGlassmorphism, hoverEffect: true })}
  ${props => getButtonStyles(props.variant)}
  ${props => getButtonSize(props.size)}

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};

  ${props =>
    props.iconOnly &&
    `aspect-ratio: 1; padding: ${props.size === 'sm' ? '0.5rem' : props.size === 'md' ? '0.75rem' : '1rem'};`}

  ${props =>
    props.disabled &&
    `opacity: 0.6; cursor: not-allowed; &:hover { transform: none; box-shadow: none; }`}
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
}) => {
  const iconOnly = !children && !!icon;

  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`glass-button ${className}`}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      iconOnly={iconOnly}
    >
      {icon && iconPosition === 'left' && <IconWrapper>{icon}</IconWrapper>}
      {children}
      {icon && iconPosition === 'right' && <IconWrapper>{icon}</IconWrapper>}
    </StyledButton>
  );
};

export default GlassButton;