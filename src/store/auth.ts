import  { action, makeAutoObservable, observable } from 'mobx';
import { TOKEN_TAG } from '../constant';
class Auth {
  constructor() {
    makeAutoObservable(this);
  }
  @observable token: string | null = null;
  @observable user: any | null = null;
  @action setToken = (token: string | null) => {
    this.token = token;
    if (token) {
      localStorage.setItem(TOKEN_TAG, token);
    }
  }
  @action setUser = (user: any | null) => {
    this.user = user;
  }
  isLogin = () => {
    return localStorage.getItem(TOKEN_TAG)
  }
}
export default new Auth();