import useMount from './useMount';
import useUnmount from './useUnmount';
import useUpdateEffect from './useUpdateEffect';

const useLogger = (componentName: string, ...rest: any[]): void => {
  useMount(() => {
    console.log(`${componentName} mounted`, ...rest);
  });
  useUpdateEffect(() => {
    console.log(`${componentName} updated`, ...rest);
  });
  useUnmount(() => {
    console.log(`${componentName} unmounted`, ...rest);
  });
};

export default useLogger;
