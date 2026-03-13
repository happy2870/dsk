'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { Badge } from '../Badge';
import { Icon } from '../../icons';
import { AppTooltip } from '../AppTooltip';
import { TruncatedCell } from '../TruncatedCell';
import { cn } from '../../../utils';

// ─── Context ───────────────────────────────────────────────
type ConfigCardContextValue = {
  id: string | number;
};

const ConfigCardContext = createContext<ConfigCardContextValue | null>(null);

const useConfigCardContext = () => {
  const ctx = useContext(ConfigCardContext);
  if (!ctx) throw new Error('ConfigCard sub-components must be used within <ConfigCard>');
  return ctx;
};

// ─── Root ──────────────────────────────────────────────────
type ConfigCardRootProps = {
  id: number | string;
  className?: string;
  children: ReactNode;
};

const ConfigCardRoot = ({ id, className, children }: ConfigCardRootProps) => {
  return (
    <ConfigCardContext.Provider value={{ id }}>
      <div className={cn(
        'relative bg-C-White rounded-2xl shadow-[0px_1.25px_5px_0px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-C-White-Border flex flex-col justify-start items-start overflow-hidden',
        className,
      )}>
        {children}
      </div>
    </ConfigCardContext.Provider>
  );
};

// ─── Header ────────────────────────────────────────────────
type ConfigCardHeaderProps = {
  badge?: { variant: 'green' | 'blue' | 'gray' | 'yellow' | 'red' | 'white'; label: string };
  onEdit?: () => void;
  onDelete?: () => void;
  children: ReactNode;
};

const ConfigCardHeader = ({ badge, onEdit, onDelete, children }: ConfigCardHeaderProps) => {
  const { id } = useConfigCardContext();

  return (
    <div className="self-stretch inline-flex justify-between items-start">
      <div className="inline-flex flex-col justify-start items-start gap-2 min-w-0 flex-1 mr-4">
        {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
        <TruncatedCell
          value={typeof children === 'string' ? children : ''}
          maxWidth="max-w-full"
          className="text-C-Black text-xl font-bold font-['Pretendard'] leading-7"
        />
      </div>
      <div className="flex justify-start items-center gap-4">
        {onEdit && (
          <>
            <button
              data-tooltip-id={`config-edit-${id}`}
              data-tooltip-content="수정하기"
              className="group cursor-pointer"
              onClick={onEdit}
            >
              <Icon.Edit size={20} className="text-C-Gray-8 group-hover:text-black transition-colors" />
            </button>
            <AppTooltip id={`config-edit-${id}`} place="bottom" />
          </>
        )}
        {onDelete && (
          <>
            <button
              data-tooltip-id={`config-delete-${id}`}
              data-tooltip-content="삭제하기"
              className="group cursor-pointer"
              onClick={onDelete}
            >
              <Icon.Delete size={20} className="text-C-Gray-8 group-hover:text-black transition-colors" />
            </button>
            <AppTooltip id={`config-delete-${id}`} place="bottom" />
          </>
        )}
      </div>
    </div>
  );
};

// ─── Info ──────────────────────────────────────────────────
type ConfigCardInfoProps = {
  children: ReactNode;
  className?: string;
};

const ConfigCardInfo = ({ children, className }: ConfigCardInfoProps) => {
  return (
    <div className={cn('self-stretch flex flex-col justify-start items-start gap-1', className)}>
      {children}
    </div>
  );
};

// ─── InfoRow ───────────────────────────────────────────────
type ConfigCardInfoRowProps = {
  label: ReactNode;
  children: ReactNode;
};

const ConfigCardInfoRow = ({ label, children }: ConfigCardInfoRowProps) => {
  return (
    <div className="self-stretch min-h-6 inline-flex justify-start items-center gap-6">
      <div className="w-[120px] shrink-0 flex items-center text-C-Black text-sm font-bold font-['Pretendard'] leading-5">
        {label}
      </div>
      <div className="flex-1 flex items-center text-C-Black text-sm font-normal font-['Pretendard'] leading-5">
        {children}
      </div>
    </div>
  );
};

// ─── Body (wraps Header + Divider + Info) ──────────────────
type ConfigCardBodyProps = {
  children: ReactNode;
};

const ConfigCardBody = ({ children }: ConfigCardBodyProps) => {
  return (
    <div className="self-stretch flex-1 p-6 bg-C-White flex flex-col justify-start items-start gap-4">
      {children}
    </div>
  );
};

// ─── Divider ───────────────────────────────────────────────
const ConfigCardDivider = () => {
  return (
    <div className="self-stretch flex flex-col justify-start items-start">
      <div className="self-stretch h-px bg-C-Gray-E" />
    </div>
  );
};

// ─── Footer ────────────────────────────────────────────────
type ConfigCardFooterProps = {
  children: ReactNode;
};

const ConfigCardFooter = ({ children }: ConfigCardFooterProps) => {
  return (
    <div className="self-stretch mt-auto h-12 bg-C-Gray-E inline-flex justify-between items-center">
      {children}
    </div>
  );
};

// ─── FooterAction ──────────────────────────────────────────
type ConfigCardFooterActionProps = {
  icon: ReactNode;
  onClick: () => void;
  children: ReactNode;
};

const ConfigCardFooterAction = ({ icon, onClick, children }: ConfigCardFooterActionProps) => {
  return (
    <div
      className="group flex-1 flex justify-center items-center gap-1 cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <div className="justify-start text-C-Gray-8 group-hover:text-black transition-colors text-sm font-bold font-['Pretendard'] leading-5">
        {children}
      </div>
    </div>
  );
};

// ─── FooterDivider (between actions) ───────────────────────
const ConfigCardFooterDivider = () => {
  return (
    <div className="w-px h-4 inline-flex flex-col justify-start items-start">
      <div className="self-stretch flex-1 bg-C-Gray-C" />
    </div>
  );
};

// ─── Compound export ───────────────────────────────────────
export const ConfigCard = Object.assign(ConfigCardRoot, {
  Body: ConfigCardBody,
  Header: ConfigCardHeader,
  Divider: ConfigCardDivider,
  Info: ConfigCardInfo,
  InfoRow: ConfigCardInfoRow,
  Footer: ConfigCardFooter,
  FooterAction: ConfigCardFooterAction,
  FooterDivider: ConfigCardFooterDivider,
});

// 하위 호환용 types (deprecated)
export type ConfigCardInfoRow = { label: ReactNode; value: string };
export type ConfigCardFooterAction = { icon: ReactNode; label: string; onClick: () => void };
