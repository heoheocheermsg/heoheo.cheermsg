import React, { Component } from 'react';
import './App.css';

import IconexConnect from './IconexConnect';
import {
  IconConverter
} from 'icon-sdk-js'
import SDK from './SDK.js';


function return_last_char_of_tx_hash(hex) {
  return parseInt(hex[hex.length - 1], 16);
}

const MSG_FORTUNE = [
  "Life is a choice",
  "Never stop believing",
  "Love conquers all",
  "Live with passion",
  "Be gentle first with yourself",
  "Let it be",
  "Have fun this time, because it will never come again",
  "Time is life itself",
  "Why do you make efforts commonly, don't want to live commonly!",
  "If you decide that you're going to do only the things you know are going to work, you're going to leave a lot of opportunity on the table.",
  "Respect a man, he will do the more",
  "All that really belongs to us is time; even he who has nothing else has that",
  "To marry is to halve your rights and double your duties",
  "We need men who can dream of things that never were",
  "Write injuries in dust, benefits in marble",
  "We can only learn to love by loving",
  "Nothing seek, nothing find",
  "Life is either a daring adventure or nothing"
]

export default class App extends Component {
  state = {
    login: false,
    fortune_msg: MSG_FORTUNE[0],
    myAddress: ''
  }

  clickme = async (e) => {
    const myAddress = await IconexConnect.getAddress()
    this.setState({
      login: true,
      myAddress: myAddress
    })
  }

  getCookie = async () => {
    const { sendTxBuild2 } = SDK
    const txObj = sendTxBuild2({
      from: this.state.myAddress,
      to: window.CONTRACT_ADDRESS,
    })

    const tx = await IconexConnect.sendTransaction(txObj)
    if (tx) {
      this.setState({
        fortune_msg: MSG_FORTUNE[return_last_char_of_tx_hash(tx)],
      })
    }
    console.log(return_last_char_of_tx_hash(tx), this.state.fortune_msg)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><a href="/"></a></h1>
          {
            !this.state.login ? (
              <>
                <div className="wrap2"></div>
                <div className="wrap">
                  <a href="#" className="button" onClick={this.clickme}>Click Me!</a>
                  {/* <a href="#" class="button2">Awesome Button</a> */}
                </div>
              </>
            ) : (
                <>
                  <h2>{this.state.fortune_msg}</h2>
                  <section>
                    <div className="container">
                      <a href="#" className="btn-two green mini" onClick={this.getCookie}>get a cookie 1</a>
                      <a href="#" className="btn-two blue mini" onClick={this.getCookie}>get a cookie 2</a>
                      <a href="#" className="btn-two red mini" onClick={this.getCookie}>get a cookie 3</a>
                      <a href="#" className="btn-two purple mini" onClick={this.getCookie}>get a cookie 4</a>
                      <a href="#" className="btn-two cyan mini" onClick={this.getCookie}>get a cookie 5</a>
                      <a href="#" className="btn-two yellow mini" onClick={this.getCookie}>get a cookie 6</a>
                    </div>
                  </section>
                </>
              )
          }
        </header>
      </div>
    );
  }

}



