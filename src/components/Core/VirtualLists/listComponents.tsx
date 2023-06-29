import * as LoadingStyles from '@components/Overlays/Loading/styles';
import { APIMessage } from 'discord-api-types/v10';
import { Components } from 'react-virtuoso';

const FetchingDataSpinner = () => (
  <LoadingStyles.SpinnerWrapper type="fetchingMessages">
    <LoadingStyles.Spinner type="fetchingMessages" />
  </LoadingStyles.SpinnerWrapper>
);

type ListComponents = Components<APIMessage[], any> | undefined;

export const listComponents: ListComponents = { Header: FetchingDataSpinner };
