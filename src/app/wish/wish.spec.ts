import {Wish} from './wish';

describe('Wish', () => {
  it('should create an instance', () => {
    expect(new Wish()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let wish = new Wish({
      id: 1,
      title: 'wish1',
      description: 'description1',
    });
    expect(wish.id).toEqual(1);
    expect(wish.title).toEqual('wish1');
    expect(wish.description).toEqual('description1');
  });
});
