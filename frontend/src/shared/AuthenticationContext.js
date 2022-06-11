import React, { Component } from 'react'

export const Authentication = React.createContext();

/*=========Context Kullanımını Kaldırdık===========*/
class AuthenticationContext extends Component {

    state = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
      }

      /* ...authState -> {
          username: authState.username,
          displayName: authState.displayName,
          image: authState.image,
          password: authState.password
      } */
      
      onLoginSuccess = authState => {
        this.setState({
            ...authState,
            isLoggedIn: true
        })
      }
    
      onLogoutSuccess = () => {
        this.setState({
          isLoggedIn: false,
          username: undefined
        })
      }

  render() {
    return (
      <Authentication.Provider value={{
          state: {...this.state},
          onLoginSuccess: this.onLoginSuccess,
          onLogoutSuccess: this.onLogoutSuccess
      }}>
          {this.props.children}
      </Authentication.Provider>
    )
  }
}

export default AuthenticationContext;