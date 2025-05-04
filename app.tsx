import { AuthProvider } from '@/hooks/useAuth';
import { View } from 'react-native';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <View style={{ flex: 1 }} />
    </AuthProvider>
  );
}