const GUIDE_STORAGE_KEY = 'app-guide-shown';

type GuideState = Record<string, boolean>;

function getGuideState(): GuideState {
  try {
    const raw = localStorage.getItem(GUIDE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** 특정 가이드가 이미 표시되었는지 확인 */
export function isGuideShown(guideId: string): boolean {
  return !!getGuideState()[guideId];
}

/** 특정 가이드를 표시 완료로 마킹 */
export function markGuideShown(guideId: string): void {
  const state = getGuideState();
  state[guideId] = true;
  localStorage.setItem(GUIDE_STORAGE_KEY, JSON.stringify(state));
}

/** 특정 가이드의 표시 상태를 초기화 */
export function resetGuide(guideId: string): void {
  const state = getGuideState();
  delete state[guideId];
  localStorage.setItem(GUIDE_STORAGE_KEY, JSON.stringify(state));
}
