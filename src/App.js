import React from 'react';
import "./App.css";
import Header from "./components/header/Header"


class App extends React.Component {


  render(){
    return (
      <div class="App">
        <div class="Padding"/>
          <div class="Main">
            <div class="Header">
              <Header />

            <hr/>
            </div>

            <div class="Content">
              content

            </div>

          </div>
        <div class="Padding"/>
      </div>
    );
  }
}



export default App;
