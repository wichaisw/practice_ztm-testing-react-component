import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import { apiCall } from './api/api';
import * as type from './constants';
import { setSearchField, requestRobots } from './actions';

// should be in setupTests.js file
const mockStore = configureMockStore([thunkMiddleware]);

describe('setSearchField', () => {
  it('should create an action to search robots', () => {
    const text = 'abc';
    const expectedAction = {
      type: type.CHANGE_SEARCHFIELD,
      payload: text,
    }
    expect(setSearchField(text)).toEqual(expectedAction);
  })
});

describe('requestRobots', () => {
  let store;
  let mockApiCall;
  const mockData = [{
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    
  }]
  let api = 'https://jsonplaceholder.typicode.com/users';
  beforeEach(() => {
    store = mockStore({});
    mockApiCall = jest.fn()
      .mockImplementation(api => {
        return Promise
          .resolve(mockData)
            .then((mockData) => {
            store.dispatch({
              type: type.REQUEST_ROBOTS_SUCCESS,
              payload: mockData,
            })
            .catch(mockData => {
              store.dispatch({
                type: type.REQUEST_ROBOTS_FAILED,
                payload: [],
              })
            })
          })
      });
    })
  

    
  it('should fetch robots action PENDING', () => {
    store.dispatch(requestRobots(apiCall ));
    const action = store.getActions();
    const expectedAction = {
      type: type.REQUEST_ROBOTS_PENDING
    }
    
    expect(action[0]).toEqual(expectedAction);
  })

  it('should handle async requesting robots API success result', () => {
    expect.assertions(1);

    return store.dispatch(requestRobots(apiCall))
      .then(() => {
        const actions = store.getActions();  
        expect(actions[1].type).toEqual(type.REQUEST_ROBOTS_SUCCESS)

      })
  });

  it('should handle requesting robots mock API success result', () => {
    expect.assertions(3);

    return store.dispatch(requestRobots(mockApiCall))
      .then(() => {
        const actions = store.getActions();  
        expect(mockApiCall).toBeCalledWith('https://jsonplaceholder.typicode.com/users')
        expect(actions[1].type).toEqual(type.REQUEST_ROBOTS_SUCCESS)
        expect(actions[1].payload).toEqual(mockData)
      })
  });

  it('should handle failed mock API result', () => {
    expect.assertions(1);

    return store.dispatch(requestRobots(mockApiCall))
      .then(() => {
        const actions = store.getActions();  
        expect(actions[2].type).toEqual(type.REQUEST_ROBOTS_FAILED)
      })
  })

});