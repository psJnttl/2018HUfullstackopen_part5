import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const postBlog = async (blog, token, showNotification) => {
  try {
    const config = {
      headers: { 'Authorization': 'bearer ' + token }
    }
    const response = await axios.post(baseUrl, blog, config);
    showNotification("Blogi lisätty: '" + response.data.title + "'.", "oknote", 7000);
    return response.data;
  }
  catch (error) {
    if (error.response.status === 401) {
      const srvMsg = error.response.data.error;
      console.log(error.response.data.error);
      showNotification("Lisäys epäonnistui, 401: " + srvMsg, "failnote", 7000);
    }
    else {
      showNotification("Lisäys epäonnistui.", "failnote", 7000);
    }
  }
}

const putBlog = async (blog, id, showNotification) => {
  try {
    const response = await axios.put(baseUrl + '/' + id, blog);
    return response.data;
  }
  catch (error) {
    showNotification('Like epäonnistui.', 'failnote', 7000);
  }
}

const deleteBlog = async(blog, token, showNotification) => {
  const id = blog.id;
  const config = {
    headers: { 'Authorization': 'bearer ' + token }
  }
  try {
    const response = await axios.delete(baseUrl + '/' + id, config);
    return response;
  }
  catch (error) {
    showNotification('Blogin poisto epäonnistui.', 'failnote', 7000);
  }
}


export default { getAll, postBlog, putBlog, deleteBlog};
