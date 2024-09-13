import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

function AppFormDatePicker({ name, placeholder }) {
    const { setFieldValue, values } = useFormikContext();
    const [showPicker, setShowPicker] = useState(false);

    const handleConfirm = (event, selectedDate) => {
        setShowPicker(false);
        const currentDate = selectedDate || values[name];
        setFieldValue(name, currentDate.toISOString().split('T')[0]);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
                <View style={styles.datePickerContainer}>
                    <MaterialCommunityIcons name="calendar-month" size={20} color={colors.medium} style={styles.icon} />
                    <Text style={styles.datePickerText}>
                        {values[name] || placeholder}
                    </Text>
                </View>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display="default"
                    value={values[name] ? new Date(values[name]) : new Date()}
                    onChange={handleConfirm}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 15,
        backgroundColor: colors.light,
        borderRadius: 25,
        width: '100%',
    },
    icon: {
        marginRight: 10,
    },
    datePickerText: {
        fontSize: 18,
        color: colors.dark,
    },
});

export default AppFormDatePicker;
