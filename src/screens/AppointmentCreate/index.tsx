import React, { useState } from 'react';
import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function AppointmentCreate() {
	const [category, setCategory] = useState('');

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
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
					setCategory={setCategory}
					categorySelected={category}
				/>
				<View style={styles.form}>
					<RectButton>
						<View style={styles.select}>
							{<GuildIcon />}
							<View style={styles.selectBody}>
								<Text style={styles.label}>Selecione um servidor</Text>
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
								<Text style={styles.label}>Dia e mês</Text>
							</View>
							<View style={styles.column}>
								<SmallInput maxLength={2} />
								<Text style={styles.divider}>/</Text>
								<SmallInput maxLength={2} />
							</View>
						</View>
						<View>
							<View>
								<Text style={styles.label}>Hora e minuto</Text>
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
		</KeyboardAvoidingView>
	);
}
