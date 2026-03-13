'use client';

import { useEffect, useRef, useCallback } from 'react';
import { driver, type DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';
import { isGuideShown, markGuideShown } from '../../utils';

type Props = {
  /** 가이드 고유 ID (localStorage에 저장) */
  guideId: string;
  /** driver.js 스텝 목록 */
  steps: DriveStep[];
  /** 데이터 로딩 여부 — 로딩 완료 후 가이드 실행 */
  isReady?: boolean;
  /** 가이드 실행 전 딜레이 ms (기본 500) */
  delay?: number;
  /** 수동 실행 ref — 부모에서 guide.start() 호출 가능 */
  onManualStart?: (start: () => void) => void;
};

export function PageGuide({ guideId, steps, isReady = true, delay = 500, onManualStart }: Props) {
  const guideTriggered = useRef(false);

  const start = useCallback(() => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      overlayColor: 'rgba(0,0,0,0.5)',
      popoverClass: `${guideId}-guide`,
      nextBtnText: '다음',
      prevBtnText: '이전',
      doneBtnText: '완료',
      progressText: '{{current}} / {{total}}',
      steps,
      onDestroyed: () => {
        markGuideShown(guideId);
      },
    });
    driverObj.drive();
  }, [guideId, steps]);

  // 부모에서 수동 실행 가능하도록 콜백 전달
  useEffect(() => {
    onManualStart?.(start);
  }, [onManualStart, start]);

  // 최초 진입 시 자동 실행 (한 번만)
  useEffect(() => {
    if (guideTriggered.current) return;
    if (!isReady) return;
    if (isGuideShown(guideId)) return;

    guideTriggered.current = true;
    const timer = setTimeout(() => start(), delay);
    return () => clearTimeout(timer);
  }, [isReady, guideId, delay, start]);

  return null;
}
