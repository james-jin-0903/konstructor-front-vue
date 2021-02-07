<template lang="pug">
  div.chat-page
    .page__nav
      breadcrumbs(:links="breadcrumbs.links", :current="breadcrumbs.current")
      .toolbar.chat-page__toolbar
        .toolbar__main
          .toolbar__item
            Select(
              :small="true"
              :options="chatSelect.options"
              :defaultValue="chatSelect.defaultValue"
              @change="changeChat"
            ).mode
          .toolbar__item
          .toolbar__item
            ToolsDropdown(:tools="tools", @click="handleToolClick")
        .toolbar__aside
          .toolbar__item.toolbar__item_type-1
            img(src="../assets/images/icon_camera.svg")
          .toolbar__item.toolbar__item_type-1
            img(src="../assets/images/icon_call.svg")
          .toolbar__item.toolbar__item_type-1
            ToolsDropdown(:tools="flowerTools" :placeOnLeft="true" className="tools-dropdown_flower")
    .chat-page__inner.container.page
      .chat-page__users_wrapper
        .chat-page__users
          PerfectScrollbar
            ChatUser
      .chat-page__main
        PerfectScrollbar
          .chat-page__messages_wrapper
            .chat-page__messages
              ChatMessage
        ChatInput.chat-page__input
</template>

<script>
  import { mapGetters } from 'vuex';
  import Spinner from '@/components/Spinner';
  import Select from '@/components/forms/Select';
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import images from '@/components/images';
  import ChatUser from '@/components/ChatUser';
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
  import ChatMessage from '@/components/ChatMessage';
  import ChatInput from '@/components/ChatInput';
  import { CHAT_URL } from '@/config';

  import { API_URL } from '@/config';
  import { AUTH_API_URL } from '@/config';

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODM1MDgyNjIsImV4cCI6MTU4MzUxMTg2Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiNDJiZjhiZDItNzU0YS00M2U1LThkN2EtOTk4YmE4ZWE3M2RmIiwidXNlcl9pZCI6IjQyYmY4YmQyLTc1NGEtNDNlNS04ZDdhLTk5OGJhOGVhNzNkZiIsImNsaWVudF9pZCI6ImM4NjM0NmJiLTQ4ZmEtNDIxNi04OTg4LTNlY2VjYWU1NTkwNyJ9._sxDVtot_78u0k9_luIU-FVixaLwtktv7FLN-E_dUA4';
  const user_id = '42bf8bd2-754a-43e5-8d7a-998ba8ea73df';
  const client_id = 'c86346bb-48fa-4216-8988-3ececae55907';
  const PAGE_NAME = 'Чат';
  export default {
    name: 'Chat',
    components: {
      ChatInput,
      ChatMessage,
      ChatUser,
      ToolsDropdown,
      Breadcrumbs,
      Spinner,
      Select,
      PerfectScrollbar
    },
    data() {
      return {
        socialsLoaded: false,
        breadcrumbs: {
          links: [],
          current: PAGE_NAME
        },
        chatSelect: {
          text: '',
          defaultValue: 'all',
          options: [
            {
              text: 'Все чаты',
              val: 'all'
            },
            {
              text: 'Алексей',
              val: 'alex'
            },
            {
              text: 'Мария',
              val: 'mari'
            }
          ]
        },
        tools: [
          {
            type: 'attach',
            icon: images.icons.attach,
            text: 'Прикрепленные файлы'
          },
          {
            type: 'active',
            icon: images.icons.hot,
            text: 'Отмеченные сообщения'
          },
          {
            type: 'addUser',
            icon: images.icons.add,
            text: 'Добавить пользователя'
          },
          {
            type: 'settings',
            icon: images.icons.settingsBlue,
            text: 'Настройки конференции'
          },
          {
            type: 'remove',
            icon: images.icons.remove,
            text: 'Удалить диалог'
          }
        ],
        flowerTools: [
          {
            type: 'newEvent',
            icon: images.icons.newEvent,
            text: 'Новое событие'
          },
          {
            type: 'newEmail',
            icon: images.icons.newEmail,
            text: 'Новое письмо'
          },
          {
            type: 'newTransaction',
            icon: images.icons.newTransaction,
            text: 'Новая транзакция'
          },
          {
            type: 'newDocument',
            icon: images.icons.newDocument,
            text: 'Новый документ'
          },
          {
            type: 'newTable',
            icon: images.icons.newTable,
            text: 'Новая таблица'
          }
        ],
        socket: null,
        logs: [],
        status
      };
    },
    created() {
    },
    mounted() {
      const messagesContainer = this.$el.querySelector('.chat-page__main .ps');
      messagesContainer.scrollTop = messagesContainer.offsetHeight;
      setTimeout(() => {
        this.connect();
      }, 1000);
    },
    methods: {
      changeChat({ name, value }) {
      },
      handleToolClick(toolType) {
      },
      connect() {
        this.socket = new WebSocket(CHAT_URL);
        this.socket.onopen = () => {
          this.status = 'connected';
          this.logs.push({ event: 'Connected to', data: CHAT_URL });


          this.socket.onmessage = ({ data }) => {
            this.logs.push({ event: 'Recieved message', data });
          };
          this.socket.onclose = ({ data }) => {
            this.logs.push({ event: 'onclose', data });
          };
          this.socket.onerror = ({ data }) => {
            this.logs.push({ event: 'onerror', data });
          };
          this.login();
        };
      },
      disconnect() {
        this.socket.close();
        this.status = 'disconnected';
        this.logs = [];
      },
      sendMessage(message) {
        this.socket.send(message);
        this.logs.push({ event: 'Sent message', data: message });
      },
      login() {
        const testLogin = {
          'id': 0,
          'action': 'login',
          'data':
            {
              'client_id': client_id,
              'user': {
                'id': user_id,
                'kind': 0
              },
              'jwt': token
            }
        };
        this.sendMessage(JSON.stringify(testLogin));
      }
    }
  };
</script>

<style lang="scss" scoped>
  .chat-page {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;

    .ps {
      height: 100%;
    }

    &__inner {
      position: relative;
      display: flex;
      flex: 1;
      padding-bottom: 0;
    }

    &__users {
      &_wrapper {
        position: relative;
        width: 380px;
        flex-shrink: 0;
      }

      height: 100%;
      position: absolute;
      width: 100%;
      border-right: 1px solid #D8E0E6;

    }

    &__main {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-left: 21px;
      width: 100%;
      position: relative;
    }

    &__input {
      margin-top: 28px;
    }

    &__messages {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      left: 0;
      box-sizing: border-box;
      padding-right: 10px;
    }

    &__messages_wrapper {
      position: relative;
      flex: 1;
    }
  }
</style>
