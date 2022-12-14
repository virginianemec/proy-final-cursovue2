import axios from 'axios';

const URL = 'https://632ba1f21aabd8373989647d.mockapi.io/users';

export default {
  namespace: true,
  state: {
    userLogged: {
      email: '',
      name: '',
      password: '',
      rol: 'user', // user, admin
      id: '',
    },
  },
  getters: {
    getUserLogged(state) {
      return state.userLogged;
    },
    isAdmin(state) {
      return state.userLogged.rol === 'admin';
    },
    getUserLoggedId(state) {
      return state.userLogged.id;
    },
    getUserLoggedName(state) {
      return state.userLogged.name;
    },
  },
  mutations: {
    setUserLogged(state, payload) {
      state.userLogged = payload;
    },
    logoutUser(state) {
      state.userLogged = {
        email: '',
        name: '',
        password: 'user', // user, admin
        rol: false,
        id: '',
      };
      state.isAdmin = false;
    },
  },
  actions: {
    async getUsersFromApi({ commit }, objUserToLoging) {
      const data = {
        email: objUserToLoging.email,
        password: objUserToLoging.password,
      };
      let usersFromApi = [];
      await axios
        .get(URL, data)
        .then(async (response) => {
          usersFromApi = response.data;
          const objUser = usersFromApi.find(
            (val) => val.email === data.email && val.password === data.password,
          );
          if (objUser) await commit('setUserLogged', objUser);
        })
        .catch((err) => {
          console.error('error', err);
        });
    },

    async registerUserOnApi({ commit }, objUserToRegister) {
      await axios
        .post(URL, objUserToRegister)
        .then(async (response) => {
          const objUser = response.data;
          await commit('setUserLogged', objUser);
        })
        .catch((err) => {
          console.error('error', err);
        });
    },

    // return true if user is register.
    async getUserRegisterFromApi({ commit }, objUserToLoging) {
      const data = {
        email: objUserToLoging.email,
      };
      let usersFromApi = [];
      await axios
        .get(URL, data)
        .then(async (response) => {
          usersFromApi = response.data;
          const objUser = usersFromApi.find((val) => val.email === data.email);
          if (objUser) await commit('setUserLogged', objUser);
        })
        .catch((err) => {
          console.error('error', err);
        });
    },
  },
};
