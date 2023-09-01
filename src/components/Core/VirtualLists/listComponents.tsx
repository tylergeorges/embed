import * as LoadingStyles from '@components/Overlays/Loading/styles';
import { APIMessage } from 'discord-api-types/v10';
import { Components } from 'react-virtuoso';

export function FetchingDataSpinner() {
  return (
    <LoadingStyles.SpinnerWrapper isFetchingMessages>
      <LoadingStyles.Spinner isFetchingMessages />
    </LoadingStyles.SpinnerWrapper>
  );
}

type ListComponents = Components<APIMessage[], any> | undefined;

export const listComponents: ListComponents = { Header: FetchingDataSpinner };
