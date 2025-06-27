import React from 'react';
import styled from 'styled-components';
import { createGlassmorphismStyle, cardGlassmorphism } from '../../lib/glassmorphism';
import colors from '../../lib/colors';

type VariantType = 'primary' | 'accent' | 'success' | 'warning';

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  variant?: VariantType;
}

const Card = styled.div<{ $variant: VariantType }>`
  ${() => createGlassmorphismStyle(cardGlassmorphism)}
  border-right: 5px solid ${props => colors[props.$variant]?.main || colors.primary.main};
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  direction: rtl;
`;

const IconWrapper = styled.div`
  font-size: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.text.light};
`;

const Value = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.text.light};
`;

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, variant = 'primary' }) => {
  return (
    <Card $variant={variant}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <Content>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </Content>
    </Card>
  );
};

export default StatCard;
