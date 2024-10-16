import cn from '@utils/styleMerger';
import { PropsWithChildren } from 'react';

//##########################################################################################
// CANVASES TYPES
//##########################################################################################
type CanvasesProps = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>;

//##########################################################################################
// DEFAULT CANVAS STYLES
//##########################################################################################
const defaultCanvasStyles = 'flex w-full flex-col gap-5 p-5 rounded-lg';

//##########################################################################################
// LIGHT GRAY CANVAS
//##########################################################################################
export const LightGrayCanvas: React.FC<CanvasesProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={cn(defaultCanvasStyles, 'bg-gray-200/75', className)}
      style={style}
    >
      {children}
    </div>
  );
};

//##########################################################################################
// WHITE CANVAS
//##########################################################################################
export const WhiteCanvas: React.FC<CanvasesProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={cn(defaultCanvasStyles, 'bg-white', className)}
      style={style}
    >
      {children}
    </div>
  );
};

//##########################################################################################
// CANVASES COMPONENT
//##########################################################################################
const BlankCanvas: React.FC<CanvasesProps> = ({
  style,
  children,
  className,
}) => {
  return (
    <div className={cn(defaultCanvasStyles, className)} style={style}>
      {children}
    </div>
  );
};

export default BlankCanvas;
