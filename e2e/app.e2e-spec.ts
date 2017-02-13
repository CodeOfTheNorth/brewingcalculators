import { BeervizierPage } from './app.po';

describe('beervizier App', function() {
  let page: BeervizierPage;

  beforeEach(() => {
    page = new BeervizierPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
