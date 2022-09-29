import { Button } from "../components/Button";
import firestore from '@react-native-firebase/firestore';
import { Alert, Platform } from "react-native";
import auth from '@react-native-firebase/auth';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../config/index.json';
import { firebase } from '@react-native-firebase/firestore';
import {
    VStack,
    Heading,
    Input,
    Select,
    CheckIcon,
    Center,
    Box,
    HStack,
    ScrollView,
    KeyboardAvoidingView

} from "native-base";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


export function RegisterProfissional(){

    

    const [isLoading, setIsLoading] = useState(false);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contato, setContato] = useState('');
    const [categoria, setCategoria] = useState('');
    const [endereco, setEndereco] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const navigation = useNavigation();

    function handleRegisterUser(){

    setIsLoading(true);

    auth()
    .createUserWithEmailAndPassword(email,password);
    
    firestore()
    .collection('users')
    .add({
        nome,
        contato,
        categoria,
        endereco,
        latitude,
        longitude,
        created_at: firestore.FieldValue.serverTimestamp()

    })
    .then(() => {
        Alert.alert('Cadastro', 'Cadatro realizado com sucesso!');
        navigation.navigate('SignIn');
    })
    .catch((error =>{
        console.log(error);
        setIsLoading(false);
        return Alert.alert('Cadastro', 'Não foi possível cadastrar usuário!');
    }))
    }


    

    

    return(
        
        
        <VStack flex={1} alignItems="center" bg="gray.700" px={8} >
          
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Cadastro 
            </Heading>
          
            
            <Input 
                placeholder="Nome Completo"
                mb={4}
                m={2}
                color="white"
                onChangeText={setNome}
            />

            <Input 
                placeholder="E-mail"
                mb={4}
                m={2}
                color="white"
                onChangeText={setEmail}
            />

            <Input 
                placeholder="Senha"
                mb={4}
                m={2}
                color="white"
                onChangeText={setPassword}
            />

            
            <Input 
                placeholder="Contato Ex: (45) 9 9999-9999"
                mb={4}
                m={2}
                color="white"
                onChangeText={setContato}
            />
            
                <Box m={2}>
                    <Select color="white" selectedValue={categoria} minWidth="full" accessibilityLabel="Choose Service" placeholder="Categoria principal" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setCategoria(itemValue)}>
                    <Select.Item label="Mecânico" value="Mecânico" />
                    <Select.Item label="Encanador" value="Encanador" />
                    <Select.Item label="Eletrecista" value="Eletrecista" />
                    <Select.Item label="Pedreiro" value="Pedreiro" />
                    <Select.Item label="Chaveiro" value="Chaveiro" />
                    </Select>
                </Box>

            
               <VStack flex={1} ml={2} mr={2} >
                <Box m={5} minWidth="full">
                    <GooglePlacesAutocomplete
                         
                        placeholder='Procurar cidade'
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                           // console.log(data, details);
                            let endereco;
                            let longitude;
                            let latitude;

                            endereco = data.description[0]
                            longitude = details.geometry.location.lng
                            latitude = details.geometry.location.lat
                           // console.log(endereco)

                            setEndereco(endereco);
                            setLongitude(longitude);
                            setLatitude(latitude);
                           

                                 
                        }}
                        
                        query={{
                            key: config.googleAPI,
                            language: 'pt-br',
                        }}
                        fetchDetails={true}
                        styles={{listView:{height: 100}}}
                        
                    />
                    
                </Box>
                </VStack>
              
              


                <Button 
                    title="Cadastrar" 
                    w="sm" 
                    mt={4} 
                    onPress={handleRegisterUser}
                    
                />
              
        </VStack>
         
    );
}