import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListaDesejos({ navigation }) {
  const [listaDesejos, setListaDesejos] = useState([]);

  // Carregar lista do AsyncStorage
  const carregarLista = async () => {
    try {
      const lista = await AsyncStorage.getItem("listaDesejos");
      if (lista) {
        setListaDesejos(JSON.parse(lista));
      } else {
        setListaDesejos([]);
      }
    } catch (e) {
      console.error("Erro ao carregar lista de desejos:", e);
    }
  };

  useEffect(() => {
    carregarLista();
  }, []);

  // Remover item da lista
  const removerItem = async (id) => {
    try {
      const novaLista = listaDesejos.filter(item => item.id !== id);
      setListaDesejos(novaLista);
      await AsyncStorage.setItem("listaDesejos", JSON.stringify(novaLista));
      Alert.alert("Removido", "Produto removido da lista de desejos.");
    } catch (e) {
      console.error("Erro ao remover item:", e);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>💖 Minha Lista de Desejos</Text>

      {listaDesejos.length === 0 ? (
        <Text style={estilos.textoVazio}>Nenhum produto na lista ainda.</Text>
      ) : (
        <FlatList
          data={listaDesejos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={estilos.item}>
              <Image source={{ uri: item.imagem }} style={estilos.imagem} />
              <Text style={estilos.nome}>{item.nome}</Text>
              <TouchableOpacity
                style={estilos.botaoRemover}
                onPress={() => removerItem(item.id)}
              >
                <Text style={estilos.textoBotao}>🗑️ Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  textoVazio: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 50,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  nome: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoRemover: {
    backgroundColor: "#FF4C4C",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
