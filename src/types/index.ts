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
}
