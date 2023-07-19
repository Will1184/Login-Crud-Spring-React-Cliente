const HeaderConfig = {
  config: {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }
};

export default HeaderConfig;
