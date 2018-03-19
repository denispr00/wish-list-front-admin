import { OwishFrontAdminPage } from './app.po';

describe('owish-front-admin App', function() {
  let page: OwishFrontAdminPage;

  beforeEach(() => {
    page = new OwishFrontAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
