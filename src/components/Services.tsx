import { HStack, Text, useTheme, Box, VStack, Circle, Pressable, Avatar, IPressableProps } from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native'

export type UserProps = {
    id: string;
    categoria: string;
    nome: string;
    contato: string;
   // status: 'open' | 'closed';

}

type Props = IPressableProps & {
    data: UserProps;
}

export function Services({data, ...rest}: Props) {
    const { colors } = useTheme();

  //  const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300];

  return (
    <Pressable {...rest}>
    <HStack
    bg="gray.600"
    mb={4}
    alignItems="center"
    justifyContent="space-between"
    rounded="sm"
    overflow="hidden"
    >
        <Box h="full" w={2} />

        <Avatar 
            size="80px" 
            source={{  }}
            justifyItems="center"
            alignItems="center"
        />

        <VStack flex={1} my={5} ml={5} >
            <Text color="white" fontSize="sm" alignSelf="flex-start">
                Nome: {data.nome}
            </Text>

            <HStack alignItems="center" alignSelf="flex-start">
                
                <Text color="gray.200" fontSize="sm" >
                   Categoria: {data.categoria}
                </Text>

            </HStack>

            <Text color="gray.200" fontSize="sm" alignSelf="flex-start" >
                    Contato: {data.contato}
            </Text>
        </VStack>

        
    </HStack>
</Pressable>
  );
}