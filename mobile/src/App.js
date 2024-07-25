import {
  StyleSheet,
  Image,
  View,
  Button,
  TouchableHighlight,
  Text,
  FlatList
} from 'react-native';
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { nanoid } from 'nanoid/non-secure';

export default function App() {
  const [images, setImages] = useState([]);

  const openImagePicker = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    const [firstImage] = image?.assets

    setImages(values => [...values, {
      id: nanoid(10),
      uri: firstImage.uri
    }]);
  }

  const openCameraPicker = async () => {
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 1
    });

    if (image.canceled)
      return;

    const [firstImage] = image?.assets

    setImages(values => [...values, {
      id: nanoid(10),
      uri: firstImage.uri
    }]);
  }

  const deleteImage = (id) => {
    setImages(images => {
      return images.filter(img => img.id !== id)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerButtons}>
        <Button title='Escoje una imagen' onPress={openImagePicker} />
        <Button title='Toma una imagen' onPress={openCameraPicker} />
      </View>
      {
        images.length > 0 && <Text style={styles.title}>Imagenes seleccionadas!!!</Text>
      }
      <View style={styles.containerImages}>
        <FlatList
          data={images}
          renderItem={({ item: image }) => {
            <TouchableHighlight key={image.id} onLongPress={() => deleteImage(image.id)}>
              <Image
                source={{ uri: image.uri }}
                style={styles.image}
              />
            </TouchableHighlight>
          }}
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#54C9FF",
    padding: 10,
    borderRadius: 5
  },
  containerImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'blue',
    marginVertical: 10
  },
  containerButtons: {
    flexDirection: 'row',
    columnGap: 5
  },
  image: {
    width: 100,
    height: 100
  }
});
