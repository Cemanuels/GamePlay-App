import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ImageBackground,
	FlatList,
	Alert,
	Share,
	Platform,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';

import BannerImg from '../../assets/banner.png';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { api } from '../../services/api';

type Params = {
	guildSelected: AppointmentProps;
};

type GuildWidget = {
	id: string;
	name: string;
	instant_invite: string;
	members: MemberProps[];
	presence_count: number;
};

export function AppointmentDetails() {
	const routes = useRoute();
	const { goBack } = useNavigation();
	const { guildSelected } = routes.params as Params;

	const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
	const [loading, setLoading] = useState<boolean>(true);

	async function fetchGuildWidget() {
		try {
			const response = await api.get(
				`/guilds/${guildSelected.guild.id}/widget.json`
			);
			setWidget(response.data);
		} catch (error) {
			Alert.alert(
				'Erro',
				'Verifique as configurações do servidor. Será que o widget está habilitado?',
				[{ text: 'voltar', onPress: () => goBack() }]
			);
		} finally {
			setLoading(false);
		}
	}

	function handleShareInvitation() {
		const message =
			Platform.OS === 'ios'
				? `Junte-se a ${guildSelected.guild.name}`
				: `${widget.instant_invite}`;
			console.log(widget.instant_invite)
		Share.share({
			message,
			url: widget.instant_invite,
		});
	}

	useEffect(() => {
		fetchGuildWidget();
	}, []);

	return (
		<Background>
			<Header
				title="Detalhes"
				action={
					guildSelected.guild.owner &&
					<BorderlessButton onPress={handleShareInvitation}>
						<Fontisto name="share" size={24} color={theme.colors.primary} />
					</BorderlessButton>
				}
			/>
			<ImageBackground source={BannerImg} style={styles.banner}>
				<View style={styles.bannerContent}>
					<Text style={styles.title}>{guildSelected.guild.name}</Text>
					<Text style={styles.subtitle}>{guildSelected.description}</Text>
				</View>
			</ImageBackground>
			{loading ? (
				<Load />
			) : (
				<>
					<ListHeader
						title="Jogadores"
						subtitle={widget.members ? `Total: ${widget.members.length}` : ''}
					/>
					<FlatList
						data={widget.members}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <Member data={item} />}
						ItemSeparatorComponent={() => <ListDivider />}
						style={styles.members}
					/>
				</>
			)}
			<View style={styles.footer}>
				<ButtonIcon title="Entrar na partida" />
			</View>
		</Background>
	);
}
