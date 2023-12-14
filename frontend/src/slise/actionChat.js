const fetchChannelsAndMessages = (token) => async (dispatch) => {
  try {
    // Отправьте запрос на сервер, используя токен авторизации
    const response = await fetch('/api/chat-data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }

    const data = await response.json();

    dispatch(setChannels(data.channels));
    dispatch(setMessages(data.messages));
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};

export default fetchChannelsAndMessages;
