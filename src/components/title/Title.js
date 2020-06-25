import React from 'react';
import "./Title.css";

import Clock from 'react-live-clock';

class Header extends React.Component{
  state = {
    currentTime : new Date().toLocaleString(),
  }

    render() {
        return (
            <div class="title-complete">
              <div class="title-wrapper">

                <div class="clock">
                  <Clock  format={'dddd, MMMM Do YYYY'}  ticking={true} timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}/>
                </div>

                <div class="title">
                  Perspective
                </div>

                <div class="clock">
                  {/*add weather here*/}
                </div>

              </div>
              <hr class="title-hr"/>


            </div>
        )
    }

}

export default Header;
