// auth.js 
// use this to decode a token and get the user's information out of it
import { ApolloClient, InMemoryCache } from '@apollo/client';
// import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  constructor() {
    this.client = new ApolloClient({
      uri: 'http://localhost:3001/graphql',
      cache: new InMemoryCache(),
    });
  }
  // get user data
  getProfile() {
    return this.client.query({
      query: YOUR_USER_QUERY,
    })
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      return null;
    });
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token;
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
