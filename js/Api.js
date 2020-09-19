class Api {
  constructor(configApi) {
    this.baseUrl = configApi.baseUrl;
    this.group = configApi.group;
    this.headers = configApi.headers;
  }

  async getData(url = 'users/me') {

    const promise = await fetch(`${this.baseUrl}${this.group}/${url}`, {
      headers: this.headers,
    });
    if (promise.ok) {
      const data = await promise.json();
      return data;
    } else {
      return await Promise.reject(`Ошибка: ${promise.status}`);
    }

  }

  async setUser(data, callBack, url = 'users/me') {

    const promise = await fetch(`${this.baseUrl}${this.group}/${url}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      }),
    });
    if (promise.ok) {
      console.log(data);
      const {
        name,
        about,
        avatar
      } = await promise.json();
      callBack(name, about, avatar);
    } else {
      return await Promise.reject(`Ошибка: ${promise.status}`);
    }
  }
}