import { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Image } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { 
    Heading,
    HStack, 
    IconButton, 
    Text, 
    useTheme, 
    VStack, 
    FlatList, 
    Center, 
    Box, 
    Pressable, 
    HamburgerIcon, 
    Menu,
    Avatar,
    Spacer,
    Input,
    Icon,
    Tooltip, 
    
    
} from 'native-base';
import Logo from '../assets/logo_secondary.svg';
import { SignOut, Users } from 'phosphor-react-native';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';
import { ChatTeardropText } from 'phosphor-react-native';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';
import { isLoading } from 'expo-font';
import {MagnifyingGlass} from 'phosphor-react-native';
import { Services } from '../components/Services';


export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [statusSelected, setStatusSelected ] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([]);
    
    const user_id = firebase.auth().currentUser.uid;
   
    const [users, setUsers] = useState([]);
    const [OriginalUsers, setOriginalUsers] = useState([]);

    const navigation = useNavigation();
    const { colors } = useTheme();

    function handleNewOrder(){
        navigation.navigate('New');
    }

    function handleRegisterServices(userId: string){

        navigation.navigate('Services', {userId})
    }

    function handleOpenDetails(userId: string){

            navigation.navigate('PerfilDetails', {userId})
        
    }

    function handleRegisterUser(){
      //  navigation.navigate('HomeServices');
          navigation.navigate('Perfil');
    }


    function handleLogout(){
        auth().
        signOut()
        .catch(error => {
            console.log(error);
            return Alert.alert('Sair', 'Não foi possível sair.');
        });
    }

    function search(s){
        let arr = JSON.parse(JSON.stringify(OriginalUsers)); 
        setUsers(arr.filter(d => d.categoria.includes(s)));
    }
/*
    useEffect(() => {
        setIsLoading(true);

        const subscriber = firestore()
        .collection('orders')
        .where('status', '==', statusSelected)
        .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {
                const { patrimony, description, status, created_at } = doc.data();

                return {
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    when: dateFormat(created_at)
                }
            });
            setOrders(data);
            setIsLoading(false);
        });

        return subscriber;
        

    },[statusSelected]);
*/

    useEffect(() => {
        setIsLoading(true);



        const subscriber = firestore()
        .collection('users')
        .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {
        const  {categoria, nome, contato} = doc.data();
                
                return {
                    id: doc.id,
                    categoria,
                    contato,
                    nome
                
                }
                
            });
            setUsers(data);
            setOriginalUsers(data);
            setIsLoading(false);
        });

        return subscriber;


    },[]);


  return (
    <VStack flex={1} pb={6} bg="gray.700"> 
    <HStack
    w="full"
    justifyContent="space-between"
    alignItems="center"
    bg="gray.500"
    pt={12}
    pb={5}
    px={6}
    >
    <Box  alignItems="flex-start" >
                <Menu w="100"  trigger={triggerProps => {
                    return <Pressable accessibilityLabel="More options menu" {...triggerProps} >
                            <HamburgerIcon/>
                            </Pressable>;
                        }}>
                    <Menu.Item>Inicio</Menu.Item>
                    <Menu.Item onPress={() => {handleRegisterServices(user_id)}}>Serviços</Menu.Item>
                    <Menu.Item>Pedidos</Menu.Item>
                    <Menu.Item onPress={() => {navigation.navigate('Perfil')}}>Perfil</Menu.Item>
                </Menu>  
            </Box>
                

    <IconButton
        onPress={handleLogout}
        icon={<SignOut  size={26} color={colors.gray[300]}  /> }
    />

    </HStack>

    <Input 
        placeholder="Procurar categoria de serviço" 
        color="white" 
        bg="gray.600" 
        variant="filled" 
        width="100%" 
        borderWidth="0" 
        InputLeftElement={<Icon m="2" ml="3" size="6" bg="gray.600" as={<MagnifyingGlass color="white" />} />} 
        onChangeText={(s) => search(s)}
        autoCapitalize="none"
        />

  
        

        {
            isLoading ? <Loading/> :
                <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Services data={item} onPress={() => handleOpenDetails(item.id)}/> }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100}}
                    /*
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40}/>
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Você ainda não possui {'\n'}
                                solicitações {statusSelected === 'open' ? 'em aberto' : 'finalizados'}
                            </Text>
                        </Center>
                    )}
                    */
                />
            }
        
        
    </VStack>
  );
}