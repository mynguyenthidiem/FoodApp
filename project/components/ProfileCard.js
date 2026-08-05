import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/profile';
import { COLORS } from '../styles/theme';
const ProfileCard = ({ name, email, onPress }) => {
    return (
        <View style={styles.profileCardContainer}>
            <View style={styles.avatar}>
                <MaterialCommunityIcons
                    name="account"
                    size={25}
                    color={COLORS.black}
                />
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>

            <TouchableOpacity onPress={onPress} style={styles.editButton}>
                <MaterialCommunityIcons name="pencil-outline" size={25} color={COLORS.primaryDark} />
            </TouchableOpacity>
        </View>
    );
};

export default ProfileCard;