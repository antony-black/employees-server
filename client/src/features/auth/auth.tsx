import { useCurrentUserQuery } from '../../app/auth';

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return <span>...loading</span>;
  }

  return children;
};
