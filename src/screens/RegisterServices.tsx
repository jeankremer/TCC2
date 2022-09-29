import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from '../components/Button';
import { 
    VStack,
    Heading,
    useTheme,
    Input,
    TextArea,
    Box,
    Text,

} from "native-base"
import { Slider } from '../components/Slider';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';
import { Alert, Platform } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styled from 'styled-components';
import { Users } from 'phosphor-react-native';

const SliderWrapper = styled.View`
  
  width: 280px;
  height: 100px;
  justify-content: center;
`

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
`
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 1px 0;
`

const LabelText = styled.Text`
  font-size: 20px;
  color: white;
`


export function RegisterServices(){

    const user_id = firebase.auth().currentUser.uid;
    const user_email = firebase.auth().currentUser.email;
    
    
   // const [servico, setServico] = useState({tituloDescricao: '', descricao: '', precoMedio: '', created_at: ''})
    
    


    function handleRegisterService(){


        firestore()
        .collection('services')
        .add({
            servico: {
                user_id,
                user_email,
                tituloDescricao,
                descricao, 
                precoMedio,
                created_at: firestore.FieldValue.serverTimestamp() 
            },
            
            /*
            userID: user_id,
            userEmail: user_email,
            tituloDescricao,
            descricao,
            precoMedio,
            created_at: firestore.FieldValue.serverTimestamp()
            */
        })
        .then(() => {
            Alert.alert('Serviço', 'Serviço cadastrado com sucesso!')
        })
        .catch((error =>{
            console.log(error)
            return Alert.alert('Serviço', 'Não foi possível cadastrar o serviço!')
        }))
    }


    const color = useTheme();
    const navigation = useNavigation();

    
    const [tituloDescricao, setTituloDescricao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [precoMedio, setMultiSliderValue] = useState([0, 0])
    const multiSliderValuesChange = (values) => setMultiSliderValue(values)


    return(
        <VStack flex={1} pb={6} bg="gray.700" alignItems="center" >

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Cadastrar Serviço
            </Heading>

            <Input 
                placeholder="Titulo do Serviço"
                mb={4}
                m={2}
                color="white"  
                minWidth="90%"
                fontSize={15}
                onChangeText={setTituloDescricao}
            />

            
                <TextArea 
                    fontSize={15}
                    color="white"
                    mr={2}
                    placeholder="Descrição do serviço"
                    minWidth="90%"
                    ml={2}
                    onChangeText={setDescricao}
                />

                <Text color="white" mt={2} alignSelf="flex-start" ml={5} fontSize={15}>
                    Preço Médio :
                </Text>

            

                <ViewContainer>
                    <SliderWrapper>
                    <LabelWrapper>
                        <LabelText>R$ {precoMedio[0]}</LabelText>
                        <LabelText>R$ {precoMedio[1]}</LabelText>
                    </LabelWrapper>
                    <MultiSlider
                        markerStyle={{
                        ...Platform.select({
                            ios: {
                            height: 30,
                            width: 30,
                            shadowColor: '#FFFF',
                            shadowOffset: {
                                width: 0,
                                height: 3
                            },
                            shadowRadius: 1,
                            shadowOpacity: 0.1
                            },
                            android: {
                            
                            height: 30,
                            width: 30,
                            borderRadius: 50,
                            backgroundColor: '#1792E8'
                            }
                        })
                        }}
                        pressedMarkerStyle={{
                        ...Platform.select({
                            android: {
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: '#148ADC'
                            }
                        })
                        }}
                        selectedStyle={{
                        backgroundColor: '#1792E8'
                        }}
                        trackStyle={{
                        backgroundColor: '#CECECE'
                        }}
                        touchDimensions={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40
                        }}
                        values={[precoMedio[0], precoMedio[1]]}
                        sliderLength={280}
                        onValuesChange={multiSliderValuesChange}
                        min={0}
                        max={1000}
                        allowOverlap={false}
                        minMarkerOverlapDistance={10}
                    />
                    </SliderWrapper>
                </ViewContainer>
                        
                        
                        
                        
                        

                <Button 
                    title="Cadastrar" 
                    w="sm" 
                    mt={4} 
                    onPress={handleRegisterService}
                    
                />

              
            


        </VStack>
    )
}