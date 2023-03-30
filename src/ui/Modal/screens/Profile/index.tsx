import { store } from "@models"
import { Root, Tag, Avatar, Top, Badges, BadgeImage, Discrim, ProfileButton } from "./elements"
import { authStore, generalStore } from "@store"
import { NavLink } from "react-router-dom"
import Tooltip from "rc-tooltip"
import { Views } from "@ui/Sidebar"
import { useMutation } from "react-apollo-hooks";
import BLOCK_USER from './BlockUser.graphql';
import { observer } from "mobx-react";
import { login } from "@views/Messages/Header"
import getAvatar from "@utils/getAvatar"
import ChatTag from "@ui/Messages/ChatTag";
import { useEffect, useState } from "react"

// badges
import staff from '@images/discordAssets/48d5bdcffe9e7848067c2e187f1ef951.svg'
import partner from '@images/discordAssets/34306011e46e87f8ef25f3415d3b99ca.svg'
import modProgramsAlumni from '@images/discordAssets/b945002f0e0fd7f11990d800e98b5504.svg'
import hypesquadEvents from '@images/discordAssets/e666a84a7a5ea2abbbfa73adf22e627b.svg'
import bravery from '@images/discordAssets/efcc751513ec434ea4275ecda4f61136.svg'
import brilliance from '@images/discordAssets/ec8e92568a7c8f19a052ef42f862ff18.svg'
import balance from '@images/discordAssets/9f00b18e292e10fc0ae84ff5332e8b0b.svg'
import bugHunter1 from '@images/discordAssets/8353d89b529e13365c415aef08d1d1f4.svg'
import bugHunter2 from '@images/discordAssets/f599063762165e0d23e8b11b684765a8.svg'
import activeDeveloper from '@images/discordAssets/26c7a60fb1654315e0be26107bd47470.svg'
import earlyVerifiedBotDev from '@images/discordAssets/4441e07fe0f46b3cb41b79366236fca6.svg'
import earlySupporter from '@images/discordAssets/b802e9af134ff492276d94220e36ec5c.svg'

interface BadgeProps {
  flag: number
  name: string
  image: string
}

const Profile = observer(() => {
  const blockUser = useMutation<boolean>(BLOCK_USER);

  const useBlockUser = async (block: boolean) => {
    await blockUser({
      variables: { user: store.modal.id, active: block },
    });

    const newBlockedUsers = block
      ? [...authStore.blockedUsers, store.modal.id]
      : authStore.blockedUsers.filter(r => r !== store.modal.id);

    authStore.setBlockedUsers(newBlockedUsers);
  };

  const isBlocked = authStore.blockedUsers.includes(store.modal.id);

  const userID = authStore.user && ('id' in authStore.user && authStore.user.id || '_id' in authStore.user && authStore.user._id)

  let root: HTMLDivElement

  const [height, setHeight] = useState(0)
  useEffect(() => {
    setHeight(root?.getBoundingClientRect().height ?? 0)
  }, [root?.getBoundingClientRect().height])

  const x = Math.min(store.modal.x, innerWidth - 310) // width = 300
  const y = Math.min(store.modal.y, innerHeight - height - 10)

  const Badge = ({ flag, name, image }: BadgeProps) => {
    if (store.modal.flags & 1 << flag)
      return <Tooltip overlay={name} placement="top"><BadgeImage src={image} /></Tooltip>

    return null
  }

  return (
    <Root x={x} y={y} innerRef={ref => root = ref}>
      <Top>
        <Avatar height={92} width={92} src={getAvatar({ avatarUrl: store.modal.avatarUrl }, { size: 256 })} />
        <Badges>
          <Badge flag={0} name="Discord Staff" image={staff} />
          <Badge flag={1} name="Partnered Server Owner" image={partner} />
          <Badge flag={18} name="Moderator Programs Alumni" image={modProgramsAlumni} />
          <Badge flag={2} name="HypeSquad Events" image={hypesquadEvents} />
          <Badge flag={6} name="HypeSquad Bravery" image={bravery} />
          <Badge flag={7} name="HypeSquad Brilliance" image={brilliance} />
          <Badge flag={8} name="HypeSquad Balance" image={balance} />
          <Badge flag={3} name="Discord Bug Hunter" image={bugHunter1} />
          <Badge flag={14} name="Discord Bug Hunter" image={bugHunter2} />
          <Badge flag={22} name="Active Developer" image={activeDeveloper} />
          <Badge flag={17} name="Early Verified Bot Developer" image={earlyVerifiedBotDev} />
          <Badge flag={9} name="Early Supporter" image={earlySupporter} />
        </Badges>
      </Top>
      <Tag>
        {store.modal.username}
        {/* {store.modal.discrim !== '0000' ? <Discrim>#{store.modal.discrim}</Discrim> : null} */}
        <ChatTag author={store.modal} crosspost={store.modal.crosspost} referenceGuild={store.modal.referenceGuild} guest={store.modal.guest} />
      </Tag>
      {generalStore.settings?.directEnabled && (/* !store.modal.bot || */store.modal.guest) && !store.modal.system && userID !== store.modal.id && (
        authStore.user ? <>
          {!isBlocked && <NavLink
            to={`./@${store.modal.id}`}
            children={<ProfileButton variant="large" onClick={() => {
              store.modal.close()
              generalStore.setSidebarView(Views.Chats)
            }}>Message @{store.modal.username}</ProfileButton>}
          />}

          <ProfileButton id="profile-block-button" variant="large" color="#d83c3e" onClick={() => useBlockUser(!isBlocked)}>
            {isBlocked ? 'Unblock' : 'Block'} @{store.modal.username}
          </ProfileButton>
        </>
        : <ProfileButton variant="large" onClick={login}>
          Log in to message
        </ProfileButton>
      )}

      <style>{`
          .modal {
              background: none;
          }
      `}</style>
    </Root>
  );
});

export default Profile
