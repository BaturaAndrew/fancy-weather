import AppModel from './AppModel';

describe('AppModel.prototype.getWeather', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.prototype.getWeather).toBeInstanceOf(Function);
  });
});
