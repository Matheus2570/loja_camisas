import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TelaListaProdutos from "./pages/catalago";
import TelaDetalhesProduto from "./pages/detalhes";

const Stack = createNativeStackNavigator();

export default function App() {
  const [mostrarModal, setMostrarModal] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
    const [apelido, setApelido] = useState("");

  const validarLogin = async () => {
    if (!usuario.trim()) {
      Alert.alert("Erro", "Por favor, preencha o usuário!");
      return;
    }
    if ( usuario === "Tupi" & senha === "123") {
      try {
        await AsyncStorage.setItem("usuario", usuario); // opcional: salva o último usuário
      } catch (e) {
        console.error("Erro ao salvar usuário:", e);
      }
      setMostrarModal(false);
    } else {
      Alert.alert("Erro", "Usuário ou senha incorretos!");
    }
  };

  return (
    <NavigationContainer>
      {/* Modal de Login */}
      <Modal visible={mostrarModal} transparent animationType="fade">
        <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
            <Text style={estilos.modalTitulo}>Login</Text>
            <TextInput
              placeholder="Usuário"
              value={usuario}
              onChangeText={setUsuario}
              style={estilos.input}
            />
            <TextInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              style={estilos.input}
            />

            <TextInput
              placeholder="Coloque seu Apelido"
              value={apelido}
              onChangeText={setApelido}
              style={estilos.input}
            />
            <TouchableOpacity style={estilos.botao} onPress={validarLogin}>
              <Text style={estilos.textoBotao}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rotas do App */}
      {!mostrarModal && (
        <Stack.Navigator>
          <Stack.Screen
            name="ListaProdutos"
            component={TelaListaProdutos}
          initialParams={{ apelido, setMostrarModal }}
            options={{ title: "📦 Nossos Produtos" }}
          />
          <Stack.Screen
            name="TelaDetalhesProduto"
            component={TelaDetalhesProduto}
      initialParams={{ apelido, setMostrarModal }}
            options={{ title: "Detalhes do Produto" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const estilos = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitulo: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  botao: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
