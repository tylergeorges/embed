import { useRouteMatch } from 'react-router-dom';

interface Params {
  guild: string
  channel?: string
}

export const useRouter = () => {
  let params = useRouteMatch<Params>({path: '/:guild/:channel'})?.params
  if (!params) params = useRouteMatch<Params>({path: '/:guild'})?.params
  return params
}
