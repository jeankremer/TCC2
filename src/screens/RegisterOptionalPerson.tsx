import { useNavigation } from "@react-navigation/native";
import { 
    VStack,
    HStack,
    Text,
    Image
} from "native-base";

import { Button } from "../components/Button";

export function RegisterOptionalPerson(){

    const navigation = useNavigation();

    function handleNormalUser(){
        navigation.navigate('RegisterClient');
    }

    
    function handleProfissionalUser(){
        navigation.navigate('RegisterProfissional');
    }

    return(
        <VStack flex={1} alignItems='center'bg="gray.600" px={8} pt={24}>

            <Text color="white" fontSize={20} w="full" justifyContent="center" alignItems="center" textAlign="center">
                ESCOLHA SEU PERFIL
            </Text>
            <Image
                source={require('../images/checklist.png')}
                size="2xl"
                alt="checklist"
            />
            

            <HStack w="full"  mt={20} justifyContent="center" alignItems="center" mb={20} >
                
                <Button
                    title="CLIENTE"
                    m={2}
                    size={150}
                    rounded="xl"
                    onPress={handleNormalUser}
                />
                <Button
                    title="PROFISSIONAL"
                    m={2}
                    size={150}
                    rounded="xl"
                    onPress={handleProfissionalUser}
                />
            </HStack>
        </VStack>
    );
}