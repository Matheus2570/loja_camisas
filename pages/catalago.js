import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const larguraTela = Dimensions.get("window").width;

export default function TelaListaProdutos({ navigation, route }) {
  const { setMostrarModal } = route.params;
  const [apelido, setApelido] = useState("");

  // 🔹 Carregar apelido do AsyncStorage
  useEffect(() => {
    const carregarApelido = async () => {
      try {
        const salvo = await AsyncStorage.getItem("apelido");
        if (salvo) {
          setApelido(salvo);
        }
      } catch (e) {
        console.error("Erro ao carregar apelido:", e);
      }
    };
    carregarApelido();
  }, []);

  const produtos = [
  {
      id: 1,
      nome: "Camisa Seleção",
      preco: 199.99,
      categoria: "Futebol",
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSxNtQZYQty9vYHBoSg7VwY2tvvdFvToFhQgM1h6yl_bCv6ODHSci7zKOs7u2aNg7GBOii57cmDGSvDeJH3GPU-jIGn3PCqpGRntNe6nlbNvfCvNj1jMg",
      descricao: "Camisa retrô de coleção exclusiva.",
      estoque: 10,
      avaliacoes: 4.7,
    },
    {
      id: 2,
      nome: "Camisa Capivaras",
      preco: 249.99,
      categoria: "Futebol",
      imagem:
        "https://images.mont.ink/nmt/estampas/montink2.lojavirtualnuvem.com.br/Branco_75891146.png",
      descricao: "Modelo oficial do Capivalor.",
      estoque: 20000,
      avaliacoes: 4.8,
    },
    {
      id: 3,
      nome: "Camisa Capivarão",
      preco: 279.99,
      categoria: "Futebol",
      imagem:
        "https://img.elo7.com.br/product/zoom/54CC8BC/camisa-interclasse-capivara-bombada-capivara.jpg",
      descricao: "Modelo oficial do Capivarão",
      estoque: 20000,
      avaliacoes: 4.9,
    },
    {
      id: 4,
      nome: "Camisa Brasil",
      preco: 199.99,
      categoria: "Futebol",
      imagem:
        "https://http2.mlstatic.com/D_NQ_NP_2X_917538-MLB51800074430_102022-F-camisa-dry-fit-brasil-copa-do-mundo-com-proteco-uv.webp",
      descricao: "Dry fit com proteção UV.",
      estoque: 20,
      avaliacoes: 4.6,
    },
    {
      id: 5,
      nome: "Camisa Atlético Mineiro",
      preco: 239.99,
      categoria: "Futebol",
      imagem:
        "https://sportbras.vtexassets.com/arquivos/ids/1169007/CAMISA-MASCULINA-ADIDAS-ATLETICO-MINEIRO-I-0.jpg?v=638622574873130000",
      descricao: "Oficial Adidas 2024.",
      estoque: 7,
      avaliacoes: 4.8,
    },
    {
      id: 6,
      nome: "Camisa Corinthians Retrô",
      preco: 189.99,
      categoria: "Futebol",
      imagem:
        "https://images.tcdn.com.br/img/img_prod/311840/camisa_corinthians_retro_infantil_preta_e_branca_147513_1_e1e917f5e1abbe0abc40361005976531.jpg",
      descricao: "Versão retrô infantil.",
      estoque: 14,
      avaliacoes: 4.5,
    },
    {
      id: 7,
      nome: "Camisa Flamengo",
      preco: 249.99,
      categoria: "Futebol",
      imagem:
        "https://static.netshoes.com.br/produtos/camisa-flamengo-i-2526-sn-torcedor-adidas-masculina/06/FBA-3565-006/FBA-3565-006_zoom1.jpg?ts=1750177570&ims=1088x",
      descricao: "Oficial Adidas 25/26.",
      estoque: 18,
      avaliacoes: 4.9,
    },
    {
      id: 8,
      nome: "Camisa Santos Retrô",
      preco: 209.99,
      categoria: "Futebol",
      imagem:
        "https://esportelegal.fbitsstatic.net/img/p/camisa-umbro-santos-ii-retro-1963-masculina-95947/335011-1.jpg?w=800&h=800&v=no-value",
      descricao: "Modelo retrô de 1963.",
      estoque: 11,
      avaliacoes: 4.6,
    },
    {
      id: 9,
      nome: "Camisa Fluminense",
      preco: 239.99,
      categoria: "Futebol",
      imagem:
        "https://umbro.vtexassets.com/arquivos/ids/489602/U31FL03724_542.jpg?v=638893966510370000",
      descricao: "Modelo Umbro oficial.",
      estoque: 10,
      avaliacoes: 4.7,
    },
    {
      id: 10,
      nome: "Camisa Vasco",
      preco: 229.99,
      categoria: "Futebol",
      imagem:
        "https://http2.mlstatic.com/D_NQ_NP_649770-MLB54967798488_042023-O.webp",
      descricao: "Modelo oficial torcedor.",
      estoque: 13,
      avaliacoes: 4.8,
    },
    {
      id: 11,
      nome: "Camisa Internacional Adidas",
      preco: 239.99,
      categoria: "Futebol",
      imagem:
        "https://static.lojadointer.com.br/produtos/camisa-internacional-i-2526-sn-torcedor-adidas-masculina/16/FBA-3576-016/FBA-3576-016_zoom1.jpg?ts=1748857347&ims=544x",
      descricao: "Modelo oficial Adidas.",
      estoque: 12,
      avaliacoes: 4.6,
    },
    {
      id: 12,
      nome: "Camisa Botafogo",
      preco: 219.99,
      categoria: "Futebol",
      imagem:
        "https://a-static.mlcdn.com.br/800x560/camisa-do-botafogo-2025-2026-mundial-de-clubes-listrada-camisa-fan/camisafan1/c9b68730612911f095b742010a480899/067d9883164cf9c71135df931b925891.jpeg",
      descricao: "Modelo oficial 25/26.",
      estoque: 10,
      avaliacoes: 4.5,
    },
    {
      id: 13,
      nome: "Camisa Athletico-PR",
      preco: 229.99,
      categoria: "Futebol",
      imagem:
        "https://cdn.vnda.com.br/1500x/grandestorcidas/2020/06/22/17_6_4_473_CAMISAATHLETICOPRCONCENENTRAO20202111.jpg?v=1592858167",
      descricao: "Edição concentrão 20/21.",
      estoque: 8,
      avaliacoes: 4.6,
    },
    {
      id: 14,
      nome: "Camisa Internacional Home",
      preco: 239.99,
      categoria: "Futebol",
      imagem:
        "https://images.tcdn.com.br/img/img_prod/1052037/camisa_internacional_home_2024_25_masculina_5271_1_f15e8b59d39c4a1824c81a3267ca0043.jpg",
      descricao: "Home 24/25 oficial.",
      estoque: 9,
      avaliacoes: 4.7,
    },
  ];

  const abrirDetalhes = (produto) => {
    navigation.navigate("TelaDetalhesProduto", { produtoSelecionado: produto });
  };

  return (
    <ScrollView style={estilos.container}>
      <Image
        source={require("../assets/Logo.png")}
        style={estilos.logo}
        resizeMode="contain"
      />

      <Text style={estilos.titulo}>
        Bem-vindo ao catálogo, {apelido}!
      </Text>

      <TouchableOpacity
        style={estilos.botaoDesejos}
        onPress={() => navigation.navigate("ListaDesejos")}
      >
        <Text style={estilos.textoBotao}>❤️ Lista de Desejos</Text>
      </TouchableOpacity>

      {/* 🔹 Botão para voltar ao modal */}
      <TouchableOpacity
        style={[estilos.botaoDesejos, { backgroundColor: "#4CAF50" }]}
        onPress={() => setMostrarModal(true)}
      >
        <Text style={estilos.textoBotao}>🔙 Sair</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.itemProduto}
            onPress={() => abrirDetalhes(item)}
          >
            <Image source={{ uri: item.imagem }} style={estilos.imagemProduto} />
            <View style={estilos.infoProduto}>
              <Text style={estilos.nomeProduto}>{item.nome}</Text>
              <Text style={estilos.categoriaProduto}>{item.categoria}</Text>
              <Text style={estilos.precoProduto}>
                R$ {item.preco.toFixed(2)}
              </Text>
              <Text style={estilos.avaliacaoProduto}>⭐ {item.avaliacoes}</Text>
            </View>
            <Text style={estilos.seta}>➡️</Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  itemProduto: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  imagemProduto: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  infoProduto: { flex: 1 },
  nomeProduto: { fontSize: 16, fontWeight: "bold" },
  categoriaProduto: { color: "#777" },
  precoProduto: { fontSize: 14, fontWeight: "bold", color: "#4CAF50" },
  avaliacaoProduto: { color: "#FFA000" },
  seta: { fontSize: 18, marginLeft: 10 },
  logo: {
    width: larguraTela * 0.9,
    height: 110,
    alignSelf: "center",
    marginBottom: 20,
  },
  botaoDesejos: {
    backgroundColor: "#FF4C4C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
