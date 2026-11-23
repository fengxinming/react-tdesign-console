import type { ReactElement } from 'react';
import type { ButtonProps } from 'tdesign-react';

export type IconButtonProps = Omit<ButtonProps, 'icon' | 'onClick' | 'className'> & {
  icon: ReactElement;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
};

export interface SearchResult {
  key: string;
  name: string;
}
