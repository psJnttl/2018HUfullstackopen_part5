import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const postBlog = async (blog, token) => {
  try {
    const config = {
      headers: { 'Authorization': 'bearer ' + token }
    }
    const response = await axios.post(baseUrl, blog, config);
    console.log(response.data);
    return response.data;
  }
  catch(error) {
    const err = error;
    if (error.response.status === 401) {
      console.log(error.response.data.error);
    }
    console.log(error);
  }
}

export default { getAll, postBlog}
