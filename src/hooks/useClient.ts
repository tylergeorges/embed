import React from 'react';
import { Context } from 'urql';

export const useClient = () => React.useContext(Context);
