import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import DeviceInfo from 'react-native-device-info';
import * as Clipboard from 'expo-clipboard';

export default function Index() {


  const [uniqueId, setUniqueId] = useState<string | null>(null);
  useEffect(() => {
    // Fonction asynchrone pour récupérer les ID
    const fetchDeviceInfo = async () => {
      try {
        const uniqueId = await DeviceInfo.getUniqueId();
        setUniqueId(uniqueId);
      } catch (error) {
        console.error('Erreur en récupérant les IDs:', error);
      }
    };

    fetchDeviceInfo(); // Appeler la fonction pour récupérer les IDs
  }, []);

  const handleCopy = () => {
    if (uniqueId) {
      Clipboard.setStringAsync(uniqueId); // Copier l'ID dans le presse-papier
      Alert.alert("Copié!", "L'ID a été copié dans le presse-papier.");
    } else {
      Alert.alert("Erreur", "Aucun ID disponible à copier.");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>ID DEVICE : {uniqueId}</Text>
      <Button title="Copier l'ID" onPress={handleCopy} />
    </View>
  );
}
