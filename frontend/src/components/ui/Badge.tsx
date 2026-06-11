import React from 'react';
import clsx from 'clsx';

type BadgeVariant = 'neutral' | 'accent';

export interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-surface text-text-secondary border border-border',
  accent: 'bg-accent/15 text-accent',
};

export function Badge({
  variant = 'neutral',
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
