import {Container, Content, Footer, Header} from 'native-base';
import {create} from 'apisauce';
import Question from '../models/Question';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const api = create({
  baseURL: 'https://opentdb.com',
  headers: {Accept: 'application/json'},
});

const PresentQuestion = ({navigation}) => {
  type QuestionResult = {
    response_code: number;
    results: Question[];
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <ScrollView>
        <Header />
        <Content />
      </ScrollView>
      <Footer />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PresentQuestion;
