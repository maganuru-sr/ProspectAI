import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const animProps = {
    top: { initial: { opacity: 0, y: 5, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 5, scale: 0.95 } },
    bottom: { initial: { opacity: 0, y: -5, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -5, scale: 0.95 } },
    left: { initial: { opacity: 0, x: 5, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 5, scale: 0.95 } },
    right: { initial: { opacity: 0, x: -5, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -5, scale: 0.95 } },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="tooltip"
            {...animProps[position]}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute z-50 whitespace-nowrap rounded-md bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 px-2.5 py-1.5 text-xs shadow-md border border-slate-800 dark:border-slate-200 pointer-events-none',
              positionClasses[position],
              className
            )}
          >
            {content}
            {/* Tooltip triangle indicator */}
            <span
              className={cn(
                'absolute w-1.5 h-1.5 bg-slate-900 dark:bg-slate-50 rotate-45 border-r border-b border-slate-800 dark:border-slate-200',
                position === 'top' && 'top-full left-1/2 -translate-x-1/2 -mt-1 border-l-0 border-t-0',
                position === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-r-0 border-b-0 border-l border-t',
                position === 'left' && 'left-full top-1/2 -translate-y-1/2 -ml-1 border-b-0 border-l-0 border-t border-r',
                position === 'right' && 'right-full top-1/2 -translate-y-1/2 -mr-1 border-t-0 border-r-0 border-l border-b'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Tooltip };
