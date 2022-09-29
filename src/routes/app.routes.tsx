import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { Register } from "../screens/Register";
import { HomeServices } from '../screens/HomeServices';
import { Perfil } from '../screens/Perfil';
import { PerfilDetails } from '../screens/PerfilDetails';
import { Services } from '../screens/Services';
import { RegisterServices } from '../screens/RegisterServices';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Home" component={Home}/>
            <Screen name="New" component={Register}/>
            <Screen name="Details" component={Details}/>
            <Screen name="PerfilDetails" component={PerfilDetails}/>
            <Screen name="HomeServices" component={HomeServices}/>
            <Screen name="Perfil" component={Perfil}/>
            <Screen name="Services" component={Services}/>
            <Screen name="RegisterServices" component={RegisterServices}/>
        </Navigator>
    )
}



