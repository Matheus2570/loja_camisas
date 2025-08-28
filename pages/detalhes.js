import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const larguraTela = Dimensions.get("window").width;

export default function TelaDetalhesProduto({ route, navigation }) {
  const { produtoSelecionado } = route.params || {};
  const [quantidade, setQuantidade] = useState(1);
  const [apelido, setApelido] = useState("");

  // 🔹 Carregar apelido direto do AsyncStorage
  useEffect(() => {
    const carregarApelido = async () => {
      try {
        const salvo = await AsyncStorage.getItem("apelido");
        if (salvo) setApelido(salvo);
      } catch (e) {
        console.error("Erro ao carregar apelido:", e);
      }
    };
    carregarApelido();
  }, []);

  if (!produtoSelecionado) {
    return (
      <View style={estilos.container}>
        <Text style={{ fontSize: 18, color: "red" }}>
          ❌ Nenhum produto encontrado!
        </Text>
        <TouchableOpacity
          style={[
            estilos.botaoCarrinho,
            { marginTop: 20, backgroundColor: "#999" },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={estilos.textoCarrinho}>⬅️ Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const alterarQuantidade = (inc) => {
    const novaQtd = quantidade + inc;
    if (novaQtd > 0 && novaQtd <= produtoSelecionado.estoque) {
      setQuantidade(novaQtd);
    }
  };

  const adicionarCarrinho = () => {
    Alert.alert(
      "Sucesso! 🎉",
      `${quantidade}x ${produtoSelecionado.nome} adicionado(s) ao carrinho!`,
      [
        { text: "Continuar Comprando", onPress: () => navigation.goBack() },
        { text: "Ver Carrinho", onPress: () => console.log("Ir para carrinho") },
      ]
    );
  };



  const adicionarListaDesejos = async () => {
  try {
    // Pegar a lista existente
    const listaAtual = await AsyncStorage.getItem("listaDesejos");
    const lista = listaAtual ? JSON.parse(listaAtual) : [];

    // Novo item para adicionar
    const novoItem = {
      id: produtoSelecionado.id,
      nome: produtoSelecionado.nome,
      imagem: produtoSelecionado.imagem,
    };

    // Evitar duplicados
    const existe = lista.some(item => item.id === novoItem.id);
    if (existe) {
      Alert.alert("Atenção", "Este produto já está na sua lista de desejos!");
      return;
    }

    lista.push(novoItem);

    await AsyncStorage.setItem("listaDesejos", JSON.stringify(lista));

    Alert.alert("❤️ Sucesso!", `${produtoSelecionado.nome} adicionado à lista de desejos!`);
  } catch (e) {
    console.error("Erro ao adicionar à lista de desejos:", e);
  }
};

  return (
    <View style={estilos.container}>
      <Image
        source={{ uri: produtoSelecionado.imagem }}
        style={estilos.imagem}
        resizeMode="contain"
      />

      <Text style={estilos.titulo}>Bem-vindo ao Detalhes, {apelido}!</Text>

      <Text style={estilos.nome}>{produtoSelecionado.nome}</Text>
      <Text style={estilos.descricao}>{produtoSelecionado.descricao}</Text>
      <Text style={estilos.preco}>
        💲 R$ {produtoSelecionado.preco.toFixed(2)}
      </Text>
      <Text style={estilos.estoque}>
        📦 Estoque disponível: {produtoSelecionado.estoque}
      </Text>
      <Text style={estilos.avaliacoes}>
        ⭐ {produtoSelecionado.avaliacoes} de avaliação
      </Text>

      <View style={estilos.qtdContainer}>
        <TouchableOpacity
          style={estilos.botaoQtd}
          onPress={() => alterarQuantidade(-1)}
        >
          <Text style={estilos.textoBotao}>-</Text>
        </TouchableOpacity>

        <Text style={estilos.qtdTexto}>{quantidade}</Text>

        <TouchableOpacity
          style={estilos.botaoQtd}
          onPress={() => alterarQuantidade(1)}
        >
          <Text style={estilos.textoBotao}>+</Text>
        </TouchableOpacity>
      </View>

<TouchableOpacity
  style={[estilos.botaoCarrinho, { backgroundColor: "#FF4C4C", marginTop: 10 }]}
  onPress={adicionarListaDesejos}
>
  <Text style={estilos.textoCarrinho}>💖 Adicionar à Lista de Desejos</Text>
</TouchableOpacity>

    

      <TouchableOpacity
        style={estilos.botaoCarrinho}
        onPress={adicionarCarrinho}
      >
        <Text style={estilos.textoCarrinho}>🛒 Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imagem: {
    width: larguraTela * 0.7,
    height: larguraTela * 0.7,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  nome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  descricao: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
    paddingHorizontal: 10,
  },
  preco: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  estoque: { fontSize: 14, color: "#333", marginBottom: 5 },
  avaliacoes: { fontSize: 14, color: "#FFA000", marginBottom: 20 },
  qtdContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  botaoQtd: {
    backgroundColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  textoBotao: { fontSize: 20, fontWeight: "bold" },
  qtdTexto: { fontSize: 18, marginHorizontal: 15 },
  botaoCarrinho: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  textoCarrinho: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
