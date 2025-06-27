// src/components/ui/ChartCard.tsx
import React from 'react';
import styled from 'styled-components';
import { cardGlassmorphism, createGlassmorphismStyle } from '../../lib/glassmorphism';
import colors from '../../lib/colors';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  height?: string;
}

const tooltipStyle = createGlassmorphismStyle({
  background: 'rgba(0, 0, 0, 0.8)',
  blur: '5px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  shadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
});

const CardContainer = styled.div<{ height: string }>`
  ${() => createGlassmorphismStyle({
    ...cardGlassmorphism,
    background: 'rgba(0, 0, 0, 0.5)',
  })}
  border-radius: 15px;
  padding: 1.5rem;
  color: ${colors.text.light};
  transition: all 0.3s ease;
  text-align: right;
  direction: rtl;
  height: ${props => props.height || 'auto'};
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.text.light};
  margin: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  background: rgba(3, 233, 244, 0.2);
  color: ${colors.primary.DEFAULT};
  font-size: 1.25rem;
`;

const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;

  .recharts-wrapper {
    width: 100% !important;
    height: 100% !important;
  }

  .recharts-surface {
    overflow: visible;
  }

  .recharts-tooltip-wrapper {
    ${tooltipStyle}
    border-radius: 8px;
    color: ${colors.text.light};
  }

  .recharts-default-tooltip {
    background-color: transparent !important;
    border: none !important;
    color: ${colors.text.light} !important;
  }

  .recharts-tooltip-item {
    color: ${colors.text.light} !important;
  }

  .recharts-cartesian-axis-tick-value {
    fill: ${colors.text.light};
    opacity: 0.7;
    font-size: 0.75rem;
  }

  .recharts-legend-item-text {
    color: ${colors.text.light} !important;
  }
`;

const CardFooter = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;
  color: ${colors.text.light};
  opacity: 0.8;
`;

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className = '',
  icon,
  footer,
  height = 'auto',
}) => {
  return (
    <CardContainer className={`chart-card ${className}`} height={height}>
      <CardHeader>
        <Title>{title}</Title>
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </CardHeader>

      <ChartContainer>
        {children}
      </ChartContainer>

      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default ChartCard;
