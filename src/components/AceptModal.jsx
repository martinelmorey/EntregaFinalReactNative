import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const AceptModal = ({
  visible,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Aceptar',
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <Button title={confirmText} onPress={onConfirm} />
            <Button title={cancelText} onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AceptModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
});
