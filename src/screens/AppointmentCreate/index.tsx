import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { CategorySelect } from '../../components/CategorySelect';
import { ModalView } from '../../components/ModalView';
import { SmallInput } from '../../components/SmallInput';
import { GuildIcon } from '../../components/GuildIcon';
import { GuildProps } from '../../components/Guild';
import { TextArea } from '../../components/TextArea';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Background } from '../../components/Background';
import { Guilds } from '../Guilds';

export function AppointmentCreate() {
	const [category, setCategory] = useState('');
	const [visibleModal, setVisibleModal] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

	function handleOpenGuilds() {
		setVisibleModal(true);
	}

	function handleGuildSelected(guildSelected: GuildProps) {
		setGuild(guildSelected);
		setVisibleModal(false);
	}

	function handleCloseGuilds() {
		setVisibleModal(false);
	}

	function handleSelectCategory(categoryId: string) {
		setCategory(categoryId);
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<Background>
				<ScrollView>
					<Header title="Agendar Partida" />
					<Text
						style={[
							styles.label,
							{ marginLeft: 24, marginTop: 36, marginBottom: 18 },
						]}
					>
						Categoria
					</Text>
					<CategorySelect
						hasCheckBox
						setCategory={handleSelectCategory}
						categorySelected={category}
					/>
					<View style={styles.form}>
						<RectButton onPress={handleOpenGuilds}>
							<View style={styles.select}>
								{guild.icon ? <GuildIcon /> : <View style={styles.image} />}
								<View style={styles.selectBody}>
									<Text style={styles.label}>
										{guild.name ? guild.name : 'Selecione um servidor'}
									</Text>
								</View>
								<Feather
									name="chevron-right"
									color={theme.colors.heading}
									size={18}
								/>
							</View>
						</RectButton>
						<View style={styles.field}>
							<View>
								<View>
									<Text style={[styles.label, { marginBottom: 12 }]}>
										Dia e mês
									</Text>
								</View>
								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>/</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>
							<View>
								<View>
									<Text style={[styles.label, { marginBottom: 12 }]}>
										Hora e minuto
									</Text>
								</View>
								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>:</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>
						</View>
						<View style={[styles.field, { marginBottom: 12 }]}>
							<Text style={styles.label}>Descrição</Text>
							<Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
						</View>
						<TextArea maxLength={100} numberOfLines={5} autoCorrect={false} />
						<View style={styles.footer}>
							<Button title="Agendar" />
						</View>
					</View>
				</ScrollView>
			</Background>
			<ModalView visible={visibleModal} closeModal={handleCloseGuilds}>
				<Guilds handleGuildSelect={handleGuildSelected} />
			</ModalView>
		</KeyboardAvoidingView>
	);
}
