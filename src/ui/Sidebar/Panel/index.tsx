import * as React from 'react'

import {
	Auth,
	Avatar, Discriminator, UserButtons,
	LoggedInUser, LogOutIcon,
	Root,
	UserContainer, Username, UserTag,
	Version, UserButton, NotLoggedIn
} from './elements'
import {observer} from "mobx-react";
import {authStore} from "@store/auth";
import {login, logout} from "@views/Messages/Header";
import {Locale} from '@lib/Locale';
import {FiLogOut, FiLogIn} from 'react-icons/fi'
import Tooltip from 'rc-tooltip';
import getAvatar from "@utils/getAvatar";

const { version } = require('../../../../package.json');

console.log(`WidgetBot version: ${version}`)

const queryParams = new URLSearchParams(location.search)

@observer
export default class Panel extends React.Component<{}> {
	render(): React.ReactNode {
		const avatar = authStore.user
			? getAvatar(authStore.user, {animated: false})
			: null;

		return (
			<Root className="panel">
				<UserContainer>
					{authStore.user
						? (
							<LoggedInUser>
								<Avatar src={avatar} draggable={false} />
								<UserTag>
									<Username>{authStore.user.username}</Username>
									{("discriminator" in authStore.user && authStore.user.discriminator)
										&& (
											<Discriminator>#{authStore.user.discriminator}</Discriminator>
										)
									}
									{"guest" in authStore.user && (
										<Discriminator>Guest</Discriminator>
									)}
								</UserTag>
								<UserButtons>
									{queryParams.has('username') || // disable logout for dynamic usernames
										<Tooltip
											placement="top"
											overlay={Locale.translate('auth.logout')}
										>
											<UserButton onClick={logout}>
												<LogOutIcon />
											</UserButton>
										</Tooltip>
									}
								</UserButtons>
							</LoggedInUser>
						)
						: (
							<NotLoggedIn>
								<Auth onClick={login}>
									{Locale.translate('auth.login')}
								</Auth>
							</NotLoggedIn>
						)
					}
				</UserContainer>
				<Version
					href={`https://widgetbot.io`}
					target="_blank"
				>
					WidgetBot {version}
				</Version>
			</Root>
		)
	}
}

@observer
export class SingleChannelAuth extends React.Component<{}> {
	render(): React.ReactNode {
		if (queryParams.has('username')) return null

		return (
			<Tooltip placement="bottom" overlay={Locale.translate(`auth.${authStore.user ? 'logout' : 'login'}` as const)}>
				<Auth
					className="auth"
					target="_blank"
					onClick={login}
					style={{padding: '2px 0', minWidth: '28px'}}
				>
					{authStore.user ? <FiLogOut /> : <FiLogIn />}
				</Auth>
			</Tooltip>
		)
	}
}
