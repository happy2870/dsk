import { create, StateCreator } from 'zustand';
import { devtools, persist, PersistOptions } from 'zustand/middleware';

const isDev = process.env.NODE_ENV === 'development';

/**
 * 개발 환경에서만 devtools가 적용되는 store 생성 헬퍼
 */
export const createStore = <T>(
  name: string,
  initializer: StateCreator<T, [], []>
) => {
  if (isDev) {
    return create<T>()(devtools(initializer, { name }));
  }
  return create<T>()(initializer);
};

/**
 * persist + devtools가 적용되는 store 생성 헬퍼
 * 개발 환경에서만 devtools 적용
 */
export const createPersistStore = <T, U = T>(
  name: string,
  initializer: StateCreator<T, [['zustand/persist', unknown]], []>,
  persistOptions: PersistOptions<T, U>
) => {
  if (isDev) {
    return create<T>()(
      devtools(
        persist(initializer, persistOptions),
        { name }
      )
    );
  }

  return create<T>()(persist(initializer, persistOptions));
};
