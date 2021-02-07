<template lang="pug">
  .comments
    .comments__header
      .comments__title.page-subitle Комментарии
      .comments__count {{commentsCount}} комментария
    .comments__input
      ChatInput(placeholder="")
    ul.comments__list
      li
        CommentItem(v-for="comment of comments" :comment="comment" :key="comment.id").comments__item

</template>

<script>
  import ChatInput from './ChatInput';
  import CommentItem from '@/components/CommentItem';
  import images from '@/components/images';

  const COMMENTS = [
    {
      id: 1,
      user: {
        name: 'Иван Петров',
        level: 80,
        initials: 'ИП'
      },
      date: '01 янв 2017, 15:00',
      content: {
        text: 'Здесь показан максимальный размер комментария в свернутом состоянии. В свернутом состоянии показывается 4 строки. Здесь показан максимальный размер комментария в свернутом состоянии. В свернутом состоянии показывается 4 строки. Здесь показан максимальный размер комментария в свернутом состоянии. В свернутом состоянии показывается 4 строки. Здесь показан максимальный размер комментария в свернутом состоянии. В свернутом состоянии показывается 4 строки. Здесь показан максимальный размер комментария в свернутом состоянии. В свернутом состоянии показывается 4 строки. В свернутом состоянии.'
      },
      rating: '999K'
    },
    {
      id: 2,
      user: {
        name: 'Екатерина Екатеринова',
        level: 50,
        initials: 'EE'
      },
      date: '01 янв 2017, 15:00',
      content: {
        text: 'Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит коммент в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк.  Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментв развернутом виде\ (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. Так выглядит комментарий в развернутом виде (после нажатия на кнопку «Читать далее»). В развернутом состоянии показывается от 5 до 10 строк. ',
        files: [
          { id: 1, name: 'Name_of_File_1.png', image: require('../assets/images/idea_01.png') },
          { id: 2, name: 'Name_of_File_2.png', image: require('../assets/images/idea_01.png') },
          { id: 3, name: 'Name_of_File_3.png', image: require('../assets/images/idea_01.png') },
          { id: 4, name: 'Name_of_File_4.png', image: require('../assets/images/idea_01.png') },
          { id: 5, name: 'Name_of_File_5.png', image: require('../assets/images/idea_01.png') },
          { id: 6, name: 'Name_of_File_6.png', image: require('../assets/images/idea_01.png') },
          { id: 7, name: 'Name_of_File_7.png', image: require('../assets/images/idea_01.png') },
          { id: 8, name: 'Name_of_File_8.png', image: require('../assets/images/idea_01.png') },
          { id: 9, name: 'Name_of_File_9.png', image: require('../assets/images/idea_01.png') },
          { id: 10, name: 'Name_of_File_10.png', image: require('../assets/images/idea_01.png') },
          { id: 11, name: 'Name_of_File_11.png', image: require('../assets/images/idea_01.png') },
          { id: 21, name: 'Name_of_File_12.png', image: require('../assets/images/idea_01.png') }
        ]
      },
      rating: '999K'
    },
    {
      id: 3,
      user: {
        name: 'Анастасия Анастасиенко',
        level: 10,
        initials: 'АА'
      },
      date: '01 янв 2017, 15:00',
      content: {
        text: 'Вот это товар!',
        events: [
          {
            id: 1,
            image: 'idea_03.png',
            isVideo: false,
            icon: 'bird',
            title: 'Стильный желтый свитер связанный вручную',
            category: {
              title: 'Сообщество',
              text: 'Konstruktor',
              url: '/'
            },
            popularity: '999К',
            button: {
              label: '$9.99',
              class: '',
              action: ''
            },
            tools: [
              {
                type: 'newObject',
                icon: images.icons.newEvent,
                text: 'Объекты на базе идеи'
              },
              {
                type: 'report',
                icon: images.icons.report,
                text: 'Пожаловаться'
              }
            ]
          }],
        comments: [
          {
            id: 3,
            user: {
              name: 'Анастасия Анастасиенко',
              level: 20,
              initials: 'АА'
            },
            date: '01 янв 2017, 15:00',
            content: {
              text: 'Вот это идея!',
              events: [
                {
                  id: 1,
                  image: 'idea_02.png',
                  isVideo: false,
                  icon: 'feather',
                  title: 'Практика содания CRM-систем на примере действующих...',
                  category: {
                    title: 'Сообщество',
                    text: 'Konstruktor',
                    url: '/'
                  },
                  popularity: '999К',
                  button: {
                    label: 'Создать проект',
                    class: '',
                    action: ''
                  },
                  tools: [
                    {
                      type: 'newObject',
                      icon: images.icons.newEvent,
                      text: 'Объекты на базе идеи'
                    },
                    {
                      type: 'report',
                      icon: images.icons.report,
                      text: 'Пожаловаться'
                    }
                  ]
                }]
            },
            rating: '999K'
          }]
      },
      rating: '999K'
    }
  ];

  export default {
    name: 'Comments',
    components: { CommentItem, ChatInput },
    data() {
      return {
        commentsCount: '54 993',
        comments: COMMENTS
      };
    }
  };
</script>

<style scoped lang="scss">
  .comments {
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 28px;
    }

    &__count {
      margin-left: 20px;
      font-size: 16px;
      line-height: 22px;
      color: #B2BCCA;
    }

    &__list {
      list-style: none;
      margin-top: 29px;
    }

    &__item {
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
