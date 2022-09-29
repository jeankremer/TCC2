import { 
    VStack,
    Input

} from "native-base";

import { Button } from "../components/Button";

import { useState } from "react";


export function RegisterClient(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(

        <VStack flex={1} alignItems='center'bg="gray.600" px={8} pt={24}>
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

            <Button 
                title="Cadastrar" 
                w="full" 
                mt={4} 
                
            />
        </VStack>
    );
}