import axios from "axios"

export const getDogs = () => {
    return async function (dispatch) {
      return axios.get('http://localhost:3001/dogs')
        .then(dog => dispatch({type: 'GET_DOGS', payload: dog.data}))
        .catch(err => console.error(err))
    };
  };

  export const getDogsName = (name) => {
      return async function (dispatch) {
          return axios.get(`http://localhost:3001/dogs?name=${name}`)
          .then(dog => dispatch({type: 'GET_DOGS_NAME', payload: dog.data}))
          .catch(err => alert('We didnt found a dog with that name'))
      };
  };

  export const getDetail = (id) => {
      return async function (dispatch) {
          return axios.get(`http://localhost:3001/dogs/${id}`)
          .then(dog => dispatch({type:'GET_DETAIL', payload:dog.data}))
          .catch(err => console.error(err))
      }
  }

  export const clearDetail = () => {
      return { type: 'CLEAR_DETAIL'}
  }

  export const postDog = (payload) => {
      return async function(dispatch) {
          return axios.post('http://localhost:3001/dog', payload)
          .then(dog => dispatch({type: 'POST_DOG', payload: dog.data}))
          .catch(err => console.error(err))
      };
  };

  export const getTemperaments = () => {
    return async function (dispatch) {
      return axios.get('http://localhost:3001/temperament')
        .then(temp => dispatch({type: 'GET_TEMPERAMENTS', payload: temp.data}))
        .catch(err => console.error(err))
    };
  };

  export const filterCreated = (payload) => {
      return {
          type: 'FILTER_CREATED',
          payload
      }
  }

  export const filterByTemperament = (payload) => {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export const orderByName = (payload) => {
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export const orderByWeight = (payload) => {
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}


