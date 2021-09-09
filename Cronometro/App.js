import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';


class Mo extends Component {
  constructor(props){
    super(props);

    this.state = {
      horas: 0,
      minutos: 0,
      segundos: 0,
      ativo: false,
      count: 1,
      voltas: []
    }

    this.pulsoDeClock = this.pulsoDeClock.bind(this);
    this.iniciaRelogio = this.iniciaRelogio.bind(this);
    this.pararRelogio = this.pararRelogio.bind(this);
    this.marcarVolta = this.marcarVolta.bind(this);
    this.zerarRelogio = this.zerarRelogio.bind(this);
  }

  iniciaRelogio(){
    if(!this.state.ativo){
      this.setState({clock : setInterval(this.pulsoDeClock,10)});
      this.setState({ativo: true})
    }
  }

  pulsoDeClock(){
    var h = this.state.horas;
    var m = this.state.minutos;
    var s = this.state.segundos;

    if(s<59){
      s++
    }else{
      s = 0;
      if(m < 59){
        m++;
      }else{
        m = 0;
        h++
      }
    }

    this.setState({segundos: s, minutos: m, horas: h})
  }

  pararRelogio(){
    if(this.state.ativo){
      clearInterval(this.state.clock);
      this.setState({ativo:false});
    }
  }

  marcarVolta(){
    var txtDoCronometro = "Nº:"+ this.state.count + "                             " + this.formatar(this.state.horas) + ":" + this.formatar(this.state.minutos) + ":" + this.formatar(this.state.segundos) + "\n";
    this.state.voltas.push(txtDoCronometro);
 
    this.setState({
      count: this.state.count + 1 
    });

    this.forceUpdate();
  }


  formatar(t){
    return (t<10) ? "0"+ t.toString() : t.toString();
  }

  zerarRelogio(){
    this.pararRelogio();
    this.setState({segundos:0, minutos:0, horas:0});

    if(this.state.voltas.length>0){
      this.state.voltas.push('-------\n');
    }
  }

  render()
  {
    var txtH = this.formatar(this.state.horas);
    var txtM = this.formatar(this.state.minutos);
    var txtS = this.formatar(this.state.segundos);
    var { count } = this.state;

    return(
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.texto}>Tênis Sport</Text>
          <Image source={ require('./src/images/tenis.jpg')} style={styles.logo} />
          <Text>Cronômetro</Text>
          <Text style={styles.texto}>{txtH}:{txtM}:{txtS}</Text>
        </View>
        <View style={styles.container1}> 
          <View style={styles.buton1}>
            <Button 
            onPress={(this.state.ativo ? this.pararRelogio : this.iniciaRelogio)}
            title={(this.state.ativo ? 'Pausar' : 'Vai!')} />
          </View>
          <View style={styles.buton}>
            <Button 
            onPress={(this.state.ativo ? this.marcarVolta : this.zerarRelogio)}
            title={(this.state.ativo ? 'Salvar' : 'Zerar')} />
         </View>
        </View>
        <View style={styles.volta}>
          <Text>{ this.state.voltas}</Text>
        </View> 
      </ScrollView>
    )
  }
}

export default Mo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 220,
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 50,

  },
  buton: {
    height: 1,
    width: 150,
    left: 80,
    marginBottom: 50,
    
  },
  buton1: {
    height: 1,
    width: 150,
    margin: 0,
    right: 80,
  },
  volta: {
    marginLeft:90,
  },

  texto: {
    fontSize: 20,
    margin: 5,
  },
});




