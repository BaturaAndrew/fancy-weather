import AppView from '../views';

export default function failureCallback(error, api) {
  AppView.renderError(`${error} ${api}`);
}
