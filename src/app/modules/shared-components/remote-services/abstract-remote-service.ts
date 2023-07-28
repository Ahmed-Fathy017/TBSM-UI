import { environment } from 'src/environments/environment';


export class AbstractRemoteService {


  get apiURl() {
    return environment.apiUrl;
  }

  constructor() {
  }
}
