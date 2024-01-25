import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('Digite aqui sua anotação');

  useEffect(()=>{
    //Quando inicializar o app queremos que leia a key anotação.
    (async()=>{
        try{

          const anotacaoleitura= await AsyncStorage.getItem('anotacao');
          setarAnotacao(anotacaoleitura);

        }catch(erro){

        }
    })();
  },[])

  setDate = async () => {
    try {
      await AsyncStorage.setItem('anotacao', anotacao);
    } catch (erro) {

    }

    alert('Sua anotação foi salva');

  }

  function atualizarTexto() {
    setarEstado('leitura');
    setDate();
  }

  if (estado === 'leitura') {

    return (
      <View style={{ marginTop: 30, marginLeft: 5 }}>

        <View style={styles.header}><Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Aplicativo Anotação</Text></View>

        <View style={{ padding: 20 }}><Text style={styles.anotacao}>{anotacao}</Text></View>

        <TouchableOpacity onPress={() => setarEstado('atualizando')} style={styles.btnAnotacao}><Text style={styles.btnAnotacaoTexto}>+</Text></TouchableOpacity>

      </View>
    );
  } else if (estado === 'atualizando') {

    return (

      <View style={{ marginTop: 30, marginLeft: 5 }}>

        <View style={styles.header}><Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Aplicativo Anotação</Text></View>

        <TextInput
          autoFocus={true}
          onChangeText={(text) => setarAnotacao(text)}
          style={{ height: 300, padding: 20 }}
          multiline={true}
          numberOfLines={1}
          value={anotacao}
        ></TextInput>

        <TouchableOpacity onPress={() => atualizarTexto()} style={styles.btnSalvar}><Text style={{ textAlign: 'center', color: 'white' }}>Salvar</Text></TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#069',
  },
  anotacao: {
    fontSize: 14,
  },
  btnAnotacao: {
    position: 'absolute',
    right: 20,
    bottom: -650,
    width: 50,
    height: 50,
    backgroundColor: '#069',
    borderRadius: 25,
  },
  btnAnotacaoTexto: {
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    fontSize: 30,
  },
  btnSalvar: {
    position: 'absolute',
    right: 3,
    bottom: -425,
    width: 100,
    padding: 20,
    backgroundColor: '#069',
  },
});
