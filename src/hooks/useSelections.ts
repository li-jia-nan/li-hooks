import { useMemo, useState } from 'react';
import useMemoizedFn from './useMemoizedFn';

const useSelections = <T>(items: T[], defaultSelected: T[] = []) => {
  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const selectedSet = useMemo(() => new Set<T>(selected), [selected]);

  const isSelected = (item: T) => selectedSet.has(item);

  const select = (item: T) => {
    selectedSet.add(item);
    return setSelected([...selectedSet]);
  };

  const unSelect = (item: T) => {
    selectedSet.delete(item);
    return setSelected([...selectedSet]);
  };

  const toggle = (item: T) => {
    (isSelected(item) ? unSelect : select)(item);
  };

  const selectAll = () => {
    items.forEach(o => {
      selectedSet.add(o);
    });
    setSelected([...selectedSet]);
  };

  const unSelectAll = () => {
    items.forEach(o => {
      selectedSet.delete(o);
    });
    setSelected([...selectedSet]);
  };

  const noneSelected = useMemo(() => items.every(o => !selectedSet.has(o)), [items, selectedSet]);

  const allSelected = useMemo(() => items.every(o => selectedSet.has(o)), [items, selectedSet]);

  const partialSelected = useMemo(() => !noneSelected && !allSelected, [noneSelected, allSelected]);

  const toggleAll = () => {
    (allSelected ? unSelectAll : selectAll)();
  };

  return {
    selected,
    noneSelected,
    allSelected,
    partialSelected,
    setSelected,
    isSelected,
    select: useMemoizedFn(select),
    unSelect: useMemoizedFn(unSelect),
    toggle: useMemoizedFn(toggle),
    selectAll: useMemoizedFn(selectAll),
    unSelectAll: useMemoizedFn(unSelectAll),
    toggleAll: useMemoizedFn(toggleAll),
  } as const;
};

export default useSelections;
