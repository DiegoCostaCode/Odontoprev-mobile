import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home";

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                options={{ 
                    tabBarIcon: () => <Ionicons name="home-outline" size={30} color='#007BFF' />,
                    tabBarLabel: () => null,
             }}
                name="Home"
                component={Home}
            />
        </Tab.Navigator>
    );
}