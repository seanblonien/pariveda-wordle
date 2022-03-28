/**
 * An initializer function that returns a value of type T.
 */
export type InitializerUpdate<T> = (value: T) => void;
/**
 * An initializer value of function that returns a value of type T. This is the same type as the
 * first argument used by the `useState` hook.
 */
export type Initializer<T> = T | InitializerUpdate<T>;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type ModalInstanceProps = {
  isOpen: boolean;
  close: () => void;
};

export type GameStats = {
  winDistribution: number[];
  gamesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalGames: number;
  successRate: number;
};

export type AlertStatus = 'success' | 'error' | undefined;

export type AlertOptions = {
  persist?: boolean;
  delayMs?: number;
  durationMs?: number;
  onClose?: () => void;
};
