import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { Register } from "../screens/Register";
import { RegisterProfissional } from '../screens/RegisterProfissional';
import { SignIn } from '../screens/SignIn';
import { RegisterOptionalPerson } from '../screens/RegisterOptionalPerson';
import { RegisterClient } from '../screens/RegisterClient';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="SignIn" component={SignIn}/>
            <Screen name="RegisterOptionalPerson" component={RegisterOptionalPerson}/>
            <Screen name="RegisterProfissional" component={RegisterProfissional}/>          
            <Screen name="RegisterClient" component={RegisterClient}/>
        </Navigator>
    )
}
