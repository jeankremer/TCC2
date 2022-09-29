
import { 
    VStack,
    HStack,
    Flex,
    Text,
    Divider,
    Box,
    Menu,
    Pressable,
    HamburgerIcon,
    Heading,
    FlatList,
    Avatar,
    Spacer,
    Icon,
    Input,
  
    
} from "native-base";

import { Order } from "../components/Order";

export function HomeServices(){

    
        const data = [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          fullName: "João",
          precoMedio: "R$ 300,00 - 500,00",
          recentText: "Distância 4.2 km",
          categoria: "Pedreiro",
          avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb29ba",
            fullName: "João",
            precoMedio: "R$ 300,00 - 500,00",
            recentText: "Distância 4.2 km",
            categoria: "Pedreiro",
            avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          },
          
        ];
    

    return(
        <VStack flex={1} px={8} pt={10} bg="gray.700">
           <HStack>
                <Box  alignItems="flex-start" >
                <Menu w="100"  trigger={triggerProps => {
                    return <Pressable accessibilityLabel="More options menu" {...triggerProps} >
                            <HamburgerIcon/>
                            </Pressable>;
                        }}>
                    <Menu.Item>Inicio</Menu.Item>
                    <Menu.Item>Serviços</Menu.Item>
                    <Menu.Item>Pedidos</Menu.Item>
                    <Menu.Item>Perfil</Menu.Item>
                </Menu>  
            </Box>
                <Text color="white" ml={2} >
                    Menu
                </Text>
            </HStack>
          
                       
            
           
            <Box>
      <Heading fontSize="md" p="4" pb="3" color="white" >
        Últimos Serviços Cadastrados
      </Heading>

      <FlatList data={data} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} justifyContent="space-between">
              
              <Avatar 
                size="80px" 
                source={{ uri: item.avatarUrl }}
                justifyItems="center"
                alignItems="center"
              />

              <VStack>
                <Text 
                _dark={{
                    color: "warmGray.50"
                    }} color="white" bold fontSize="md">
                    {item.fullName}
                </Text>

                <Text 
                    color="white" 
                    _dark={{
                        color: "red.500"
                    }}>
                    {item.categoria}
                </Text>

                <Text
                     
                    color="white" 
                    _dark={{
                        color: "red.500"
                    }}>
                    {item.recentText}
                    
                </Text>
                
              </VStack>
              <Spacer/>

              <Text 
                fontSize="xs" 
                _dark={{
                    color: "warmGray.50"
                    }} color="white" alignSelf="flex-end">
                    {item.precoMedio}
              </Text>

            </HStack>
          </Box>} keyExtractor={item => item.id} />
    </Box>

    
            

        </VStack>
    );
}