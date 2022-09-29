import { useRoute } from "@react-navigation/native";
import { VStack,Text, Pressable, Image, Avatar, HStack, Box, Progress } from "native-base";
import { Linking, Alert, TouchableOpacity } from 'react-native';
import { Header } from "../components/Header";
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';


type RouteParams = {
  userId: string;
}



export function PerfilDetails(){

  const route = useRoute();
  const { userId } = route.params as RouteParams;

  const [ isLoading, setIsLoading ] = useState(true);
  const [ user, setUser] = useState([]);

  
  useEffect(() => {
    firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      const { categoria, nome, contato} = doc.data();

      setUser({
          
        categoria,
        nome,
        contato
      })
    })
    

  },[])
  

  return(
    <VStack flex={1} pb={6} bg="gray.700">
      <Header title="Perfil"/>
      <HStack justifyContent="center" space={2} mt={10}>
               <TouchableOpacity>
                  <Avatar 
                      size="2xl"
                      bg="green.500" 
                      source={{
                          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      }}>
                      
                  </Avatar>
                </TouchableOpacity>
            </HStack>
            <Text color="white" textAlign="center" mt={2} fontSize="md">
                        {user.nome}
            </Text>

            <Box mt={10}>
                <Progress value={100} mx="4" size="xs" colorScheme="emerald"/>
            </Box>
            
            <HStack>
                <Text color="white" m={5}>
                    Categoria: {user.categoria}
                </Text>
                
               
            </HStack>

            <HStack>
                <Text color="white" m={5}>
                    Contato: {user.contato}
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
                        `http://api.whatsapp.com/send?phone=${user.contato}`
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