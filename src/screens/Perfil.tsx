
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { 
    VStack,
    HStack,
    Avatar,
    Text,
    Box,
    Progress,
    Menu,
    Pressable,
    HamburgerIcon,
    IconButton,
    Image,
    useTheme
} from "native-base";

import { Linking, Alert } from 'react-native';
import { SignOut } from 'phosphor-react-native';

export function Perfil(){

    function handleLogout(){
        auth().
        signOut()
        .catch(error => {
            console.log(error);
            return Alert.alert('Sair', 'Não foi possível sair.');
        });
    }


    const { colors } = useTheme();

    const icons = [{
        name: 'photo-camera',
        bg: 'fuchsia.600'
    }]

    const navigation = useNavigation();

    return(
        <VStack 
            flex={1} 
            pb={6} 
            bg="gray.700"    
        >

        <HStack 
            mt={10} 
            ml={2}
            justifyContent="space-between" 
        >
        <Box  alignItems="flex-start" >
                <Menu w="100"  trigger={triggerProps => {
                    return <Pressable accessibilityLabel="More options menu" {...triggerProps} >
                            <HamburgerIcon/>
                            </Pressable>;
                        }}>
                    <Menu.Item onPress={() => {navigation.navigate('Home')}}>Inicio</Menu.Item>
                    <Menu.Item>Serviços</Menu.Item>
                    <Menu.Item>Pedidos</Menu.Item>
                    <Menu.Item onPress={() => {navigation.navigate('Perfil')}}>Perfil</Menu.Item>
                </Menu>  
            </Box>
               
            <IconButton
                onPress={handleLogout}
                icon={<SignOut  size={26} color={colors.gray[300]}  /> }
             />


        </HStack>



            <HStack justifyContent="center" space={2} mt={10}>
               <Pressable>
                    <Avatar 
                        size="2xl"
                        bg="green.500" 
                        source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }}>
                        
                    </Avatar>
                </Pressable>   
            </HStack>

            <Text color="white" textAlign="center" mt={2} fontSize="md">
                        Jean Michel Kremer Ovied o
            </Text>

            <Box mt={10}>
                <Progress value={100} mx="4" size="xs" colorScheme="emerald"/>
            </Box>
            
            <HStack>
                <Text color="white" m={5}>
                    Categoria:
                </Text>
                
                <Text color="white" mt={5}>
                    Pedreiro
                </Text>
            </HStack>

            <HStack>
                <Text color="white" m={5}>
                    Localização:
                </Text>
                
                <Text color="white" mt={5}>
                    Pedreiro
                </Text>
            </HStack>

            <HStack>
                <Text color="white" m={5}>
                    Preço médio:
                </Text>
                
                <Text color="white" mt={5}>
                    R$ 500 - R$ 600
                </Text>
            </HStack>

            <Pressable 
                alignSelf="flex-start" 
                mt={20}
                ml={5}
                onPress={() => {
                    Linking.openURL(
                        'http://api.whatsapp.com/send?phone=962'
                      );
                    }}
            >
                
                <Image
                    source={{
                        uri: "https://imagepng.org/wp-content/uploads/2017/08/WhatsApp-icone-3.png"
                        
                    }}
                    alt="whatsapp"
                    size={10}
                />
            </Pressable>

        </VStack>

    );
}