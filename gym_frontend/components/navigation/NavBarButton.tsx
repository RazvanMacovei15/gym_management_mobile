import { Pressable, Text } from "react-native";

interface NavBarButtonProps {
    label: string;
    onPress: () => void;
}


export default function NavBarButton({ label, onPress }: NavBarButtonProps) {
    return (
        <Pressable onPress={onPress} className="p-4 bg-blue-500 rounded-lg border-2 border-black w-1/3">
            <Text className="text-white text-center">{label}</Text>
        </Pressable>
    );
}