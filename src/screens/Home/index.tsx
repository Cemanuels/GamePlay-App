import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

export function Home() {
	const [category, setCategory] = useState('');

	const navigation = useNavigation();

	const appointments = [
		{
			id: '1',
			guild: {
				id: '1',
				name: 'Lendários',
				icon: null,
				owner: true,
			},
			category: '1',
			date: '22/06 às 20:40h',
			description:
				'É hoje que vamos chegar ao challenger sem perder uma partida da md10!',
		},
		{
			id: '2',
			guild: {
				id: '1',
				name: 'Lendários',
				icon: null,
				owner: true,
			},
			category: '1',
			date: '22/06 às 20:40h',
			description:
				'É hoje que vamos chegar ao challenger sem perder uma partida da md10!',
		},
	];

	function handleAppointmentCreate() {
		navigation.navigate('AppointmentCreate');
	}

	function handleAppointmentDetails() {
		navigation.navigate('AppointmentDetails');
	}

	function handleSelectCategory(categoryId: string) {
		categoryId === category ? setCategory('') : setCategory(categoryId);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Profile />
				<ButtonAdd onPress={handleAppointmentCreate} />
			</View>

			<CategorySelect
				categorySelected={category}
				setCategory={handleSelectCategory}
				hasCheckBox
			/>

			<View style={styles.content}>
				<ListHeader title="Partidas Agendadas" subtitle="Total 6" />
				<FlatList
					data={appointments}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Appointment data={item} onPress={handleAppointmentDetails} />
					)}
					style={styles.matches}
					ItemSeparatorComponent={() => <ListDivider />}
				/>
			</View>
		</View>
	);
}
