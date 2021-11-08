import * as type from './constants';

 import * as reducers from './reducers';

 describe('searchRobots', () => {
  const initialStateSearch = {
    searchField: '',
  }

  it('should return the initial state', () => {
    expect(reducers.searchRobots(undefined, {})).toEqual({ searchField: '' });
  })

  it('should handle CHAGE_SEARCHFIELD event', () => {
    expect(reducers.searchRobots(initialStateSearch, {
      type: type.CHANGE_SEARCHFIELD,
      payload: 'abc'
    })).toEqual({ searchField: 'abc' });
  })
 });

 describe('requestRobots', () => {
   const initialStateRobots = {
    robots: [],
    isPending: false
  }

  it('should return the initial state', () => {
    expect(reducers.requestRobots(undefined, {})).toEqual(initialStateRobots);
  })

  it('should handle REQUEST_ROBOTS_PENDING action', () => {
    expect(reducers.requestRobots(initialStateRobots, {
      type: type.REQUEST_ROBOTS_PENDING,
    })).toEqual({
      robots: [],
      isPending: true,
    })
  })
  
  it('should handle REQUEST_ROBOTS_SUCCESS action', () => {
    const mockRobot = {
      id: '213',
      name: 'test',
      name: 'test@gmail.com'
    }
    expect(reducers.requestRobots(initialStateRobots, {
      type: type.REQUEST_ROBOTS_SUCCESS,
      payload: [mockRobot]
    })).toEqual({
      robots: [mockRobot],
      isPending: false,
    })
  })
  
  it('should handle REQUEST_ROBOTS_FAILED action', () => {
    const mockRobot = {
      id: '213',
      name: 'test',
      name: 'test@gmail.com'
    }
    expect(reducers.requestRobots(initialStateRobots, {
      type: type.REQUEST_ROBOTS_FAILED,
      payload: 'fucked up'
    })).toEqual({
      error: 'fucked up',
      robots: [],
      isPending: false,
    })
  })
 })