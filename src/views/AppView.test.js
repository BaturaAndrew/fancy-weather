import AppView from './AppView';

describe('AppView.prototype.renderPage', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.prototype.renderPage).toBeInstanceOf(Function);
  });
});
