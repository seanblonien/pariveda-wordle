import {useCallback} from 'react';
import type {Initializer, InitializerUpdate, SetState} from '../types';

/**
 * Creates a hook that produces a setter that can be used to update a subset of state.
 *
 * This is used purely to reduce boilerplate and repeating the spread operator when updating nested state:
 *
 *  `setState(previous => ({...previous, key: previous.key + 1}))`
 *
 * becomes
 *
 *  `setState(previous => key: previous.key + 1)`
 *
 * @param useUpdate the hook to use to get the tracked updater from
 * @param key the key of the nested state object to track
 * @returns a setter hook for updating the subset of state in an isolated manner
 */
export const createUseTrackedUpdateByKey =
  <State, Key extends keyof State>(useUpdate: () => SetState<State>, key: Key) =>
  () => {
    const setState = useUpdate();
    return useCallback(
      (newVal: Initializer<State[Key]>) => {
        setState(oldVal => ({
          ...oldVal,
          [key]: typeof newVal === 'function' ? (newVal as InitializerUpdate<State[Key]>)(oldVal[key]) : newVal,
        }));
      },
      [setState],
    );
  };
