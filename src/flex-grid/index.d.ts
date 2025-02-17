import * as React from 'react';
import { BlockProps, Responsive, Scale } from '../block';

export interface FlexGridProps extends BlockProps {
  flexGridColumnCount?: Responsive<number>;
  flexGridColumnGap?: Responsive<Scale>;
  flexGridRowGap?: Responsive<Scale>;
}

export declare const FlexGrid: React.FC<FlexGridProps>;

export interface FlexGridItemProps extends FlexGridProps {
  flexGridItemIndex?: number;
  flexGridItemCount?: number;
}

export declare const FlexGridItem: React.FC<FlexGridItemProps>;
