import React from 'react';
import { FlatList, View } from 'react-native';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
	handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: Props) {
	const guilds = [
		{
			id: '1',
			name: 'Lendários',
			icon: 'image.png',
			owner: true,
		},
		{
			id: '2',
			name: 'Épicos',
			icon: 'image.png',
			owner: true,
		},
		{
			id: '3',
			name: 'Épicos',
			icon: 'image.png',
			owner: true,
		},
		{
			id: '4',
			name: 'Épicos',
			icon: 'image.png',
			owner: true,
		},
		{
			id: '5',
			name: 'Épicos',
			icon: 'image.png',
			owner: true,
		},
	];

	return (
		<View style={styles.container}>
			<FlatList
				data={guilds}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Guild data={item} onPress={() => handleGuildSelect(item)} />
				)}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <ListDivider />}
				style={styles.guilds}
				contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
				ListHeaderComponent={() => <ListDivider isCentered />}
			/>
		</View>
	);
}

export default Guilds;
