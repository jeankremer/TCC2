import { 
    VStack,
    Pressable,
    HStack,
    Menu,
    Box,
    HamburgerIcon,
    IconButton,
    Input,
    useTheme,
    Icon,
    Tooltip
} from "native-base";

import { Alert, TouchableOpacity, Image } from 'react-native';
import { Button } from "../components/Button";

import auth, { firebase } from '@react-native-firebase/auth'
import { useNavigation } from "@react-navigation/native";
import { SignOut, MagnifyingGlass } from "phosphor-react-native";


export function Services(){

    const { colors } = useTheme();
    const navigation = useNavigation();


    function handleLogout(){
        auth().
        signOut()
        .catch(error => {
            console.log(error);
            return Alert.alert('Sair', 'Não foi possível sair.');
        });
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700" alignItems="center"> 
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

    <Input placeholder="Procurar serviço" color="white" bg="gray.600" variant="filled" width="100%" borderWidth="0" InputLeftElement={<Icon m="2" ml="3" size="6" bg="gray.600" as={<MagnifyingGlass color="white" />} />} />
    

    <Tooltip label="Adicionar Serviço" openDelay={200} >
        <HStack alignSelf="flex-end"  m={2}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('RegisterServices')}
            >
                <Image style={{height: 50, width: 50}} source={require('../images/plus-icon.png')}/>
            </TouchableOpacity>
        </HStack>
    </Tooltip>

   

    </VStack>

                     

    )
    
}