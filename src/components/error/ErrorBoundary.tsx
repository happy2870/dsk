'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '../icons';
import { cn } from '../../utils';
import Link from 'next/link';

type ErrorBoundaryVariant = 'fullscreen' | 'page' | 'section';

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
  variant?: ErrorBoundaryVariant;
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  logPrefix?: string;
};

export function ErrorBoundary({
  error,
  reset,
  variant = 'section',
  title = '문제가 발생했습니다',
  description = '일시적인 문제가 발생했습니다. 다시 시도해주세요.',
  showHomeButton = false,
  showBackButton = false,
  logPrefix = 'Error',
}: ErrorBoundaryProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(`${logPrefix}:`, error);
  }, [error, logPrefix]);

  // Variant별 스타일 설정
  const containerStyles = {
    fullscreen: 'flex min-h-screen items-center justify-center bg-gray-50 px-4',
    page: 'flex min-h-[600px] items-center justify-center px-4',
    section: 'flex min-h-[400px] items-center justify-center px-4',
  };

  const cardStyles = {
    fullscreen: 'w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg',
    page: 'w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm',
    section: 'w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center',
  };

  const iconStyles = {
    fullscreen: 'mx-auto mb-4 h-16 w-16 text-red-500',
    page: 'mx-auto mb-4 h-14 w-14 text-red-500',
    section: 'mx-auto mb-3 h-12 w-12 text-red-500',
  };

  const titleStyles = {
    fullscreen: 'mb-2 text-2xl font-bold text-gray-900',
    page: 'mb-2 text-xl font-bold text-gray-900',
    section: 'mb-2 text-lg font-bold text-gray-900',
  };

  const descriptionStyles = {
    fullscreen: 'mb-6 text-gray-600',
    page: 'mb-6 text-gray-600',
    section: 'mb-4 text-sm text-gray-600',
  };

  const errorMessageStyles = {
    fullscreen: 'mb-6 rounded-lg bg-red-50 p-4 text-left',
    page: 'mb-6 rounded-lg bg-red-50 p-4 text-left',
    section: 'mb-4 rounded-lg bg-red-50 p-3 text-left',
  };

  const buttonContainerStyles = {
    fullscreen: 'flex gap-3',
    page: 'flex gap-3',
    section: showHomeButton || showBackButton ? 'flex gap-3' : 'w-full',
  };

  const buttonStyles = {
    fullscreen: 'px-4 py-3',
    page: 'px-4 py-2.5',
    section: 'px-4 py-2',
  };

  return (
    <div className={containerStyles[variant]}>
      <div className={cardStyles[variant]}>
        <Icon.ErrorTriangle className={iconStyles[variant]} />

        <h1 className={titleStyles[variant]}>{title}</h1>

        <p className={descriptionStyles[variant]}>{description}</p>

        {process.env.NODE_ENV === 'development' && (
          <div className={errorMessageStyles[variant]}>
            <p className={cn(
              'font-mono text-red-800',
              variant === 'section' ? 'text-xs' : 'text-sm'
            )}>
              {error.message}
            </p>
          </div>
        )}

        <div className={buttonContainerStyles[variant]}>
          <button
            onClick={reset}
            className={cn(
              'rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700',
              buttonStyles[variant],
              (showHomeButton || showBackButton) ? 'flex-1' : 'w-full'
            )}
          >
            다시 시도
          </button>

          {showBackButton && (
            <button
              onClick={() => router.back()}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 font-medium text-gray-700 transition hover:bg-gray-50',
                buttonStyles[variant]
              )}
            >
              <Icon.GoMove size={20} />
              이전
            </button>
          )}

          {showHomeButton && (
            <Link
              href="/"
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 font-medium text-gray-700 transition hover:bg-gray-50',
                buttonStyles[variant]
              )}
            >
              <Icon.Dashboard size={20} />
              홈으로
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
