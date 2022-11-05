import {TestService} from 'services';
import {entrance} from 'utils';

export class Entrances {
  @entrance
  get testService() {
    return new TestService();
  }
}
