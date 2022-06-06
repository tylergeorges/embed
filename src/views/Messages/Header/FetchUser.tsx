import { useQuery } from "react-apollo-hooks";
import USER_TAG from './UserTag.graphql'
import { UserTag } from '@generated'
import { UserName } from "@ui/Header";

interface Props {
    user: string
}

export const FetchUser = ({ user }: Props) => {
    const { data: { userData } } = useQuery<UserTag>(USER_TAG, { variables: { user } });
    
    return <UserName>{userData ? `${userData.name}${userData.discrim !== '0000' ? '#'+userData.discrim : ''}` : 'User'}</UserName>
}
