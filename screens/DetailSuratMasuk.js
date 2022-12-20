import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Linking, ScrollView  } from 'react-native';
import { DataTable, Appbar, Searchbar, Card, Title, Paragraph, TouchableRipple, Button } from 'react-native-paper';
import PDFReader from '@hashiprobr/expo-pdf-reader';

import {Text, VStack, HStack } from "native-base";
import suratServices from "../services/surat";


const formatTanggal = (tanggal) => {
   const event = new Date(tanggal);
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return event.toLocaleDateString('id-ID', options);
}

export default function DetailSuratMasuk({ navigation, route }) {

  const { id } = route.params;
  const [surat, setSurat] = useState()

  useEffect(() => {
    suratServices.getDataSuratMasukById(id)
      .then((response)=>{
        setSurat(response.data);
      })

  }, []);

  return (
    <>
    <Appbar.Header>
      <Appbar.BackAction onPress={() => {navigation.navigate("SuratMasukPublik")}} />
      <Appbar.Content title="Detail Surat Masuk" />
    </Appbar.Header>
    {
      surat &&
      <View style={styles.container}>
      <Card mode="elevated">
        <Card.Content>
          <Title>{formatTanggal(surat.tanggal_masuk)}</Title>
          <HStack space="3">
            <Paragraph>
              <VStack>
                <Text bold>Pengirim</Text>
                <Text bold>Nomor Surat</Text>
                <Text bold>Kode Surat</Text>
                <Text bold>Tanggal Masuk</Text>
                <Text bold>Tanggal Surat</Text>
                <Text bold>Bagian</Text>
                <Text bold>Status</Text>
              </VStack>
            </Paragraph>
            <Paragraph>
              <VStack>     
                <Text>: {surat.pengirim}</Text>
                <Text>: {surat.nomor_surat}</Text>
                <Text>: {surat.kode_surat}</Text>
                <Text>: {formatTanggal(surat.tanggal_masuk)}</Text>
                <Text>: {formatTanggal(surat.tanggal_surat)}</Text>
                <Text>: {surat.bagian}</Text>
                <Text>: {surat.status}</Text>
              </VStack>
            </Paragraph>
          </HStack>
          <Text bold>Perihal:</Text>
          <Paragraph>{surat.perihal}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button icon="download" onPress={() => { Linking.openURL(`http://localhost:8000/arsip_surat/download_file_suratMasuk/${surat.file_pdf}`) }}>
            Dowload
          </Button>
        </Card.Actions>
      </Card>
      <PDFReader  source={{ uri: `http://localhost:8000/arsip_surat/view_file_suratMasuk/${surat.file_pdf}` }} />
    </View>
    }
    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
