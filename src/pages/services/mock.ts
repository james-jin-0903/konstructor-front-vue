import images from '@/components/images';

export const SERVICES_ITEMS = [
  {
    id: 1,
    image: 'idea_01.png',
    isVideo: true,
    icon: 'task_blue',
    title: 'Название интересной услуги',
    tags: ['Наука', 'ИТ', 'Автомобили', 'Медицина'],
    category: {
      title: 'Сообщество',
      text: 'Публицисты',
      url: '/',
    },
    subcategory: {
      title: 'Локация',
      text: 'Австралия, Сидней, Оушен драйв 12',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: 'service-price-btn',
      action: '',
    },
    tools: [
      {
        type: 'dream',
        icon: images.icons.crownBlue,
        text: 'Добавить к мечте'
      },
      {
        type: 'share',
        icon: images.icons.share,
        text: 'Поделиться',
        children: [
          {
            type: 'dream',
            icon: images.icons.chatBlue,
            text: 'Чат Konstruktor',
          },
          {
            type: 'dream',
            icon: images.icons.social,
            text: 'Социальные сети',
          },
        ]
      },
      {
        type: 'addToBookmarks',
        icon: images.icons.bookmarkBlue,
        text: 'Добавить в закладки'
      },
      {
        type: 'report',
        icon: images.icons.report,
        text: 'Пожаловаться'
      },
    ],
  },
  {
    id: 2,
    image: 'idea_02.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Короткое',
    tags: ['ИТ'],
    category: {
      title: 'Сообщество',
      text: 'Технологии и жизнь',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Опыт реализации',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    }
  },
  {
    id: 3,
    isVideo: false,
    icon: 'task_blue',
    title: 'Длинное название интересной услуги, состоящее из нескольких разных слов',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Автомир',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Научная гипотеза',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    }
  },
  {
    id: 4,
    image: 'idea_03.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Название моей интересной услуги',
    tags: ['Юриспруденция'],
    category: {
      title: 'Сообщество',
      text: 'Омега',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Голосование',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    },
    tools: [
      {
        type: 'edit',
        icon: images.icons.pencil,
        text: 'Редактировать'
      },
      {
        type: 'copy',
        icon: images.icons.copy,
        text: 'Копировать'
      },
      {
        type: 'history',
        icon: images.icons.history,
        text: 'Перейти к истории',
        count: 99,
      },
      {
        type: 'addToDream',
        icon: images.icons.crownBlue,
        text: 'Добавить к мечте',
      },
      {
        icon: images.icons.share,
        text: 'Поделиться',
        children: [
          {
            type: 'dream',
            icon: images.icons.chatBlue,
            text: 'Чат Konstruktor',
          },
          {
            type: 'dream',
            icon: images.icons.social,
            text: 'Социальные сети',
          },
        ]
      },
      {
        type: 'addToBookMarks',
        icon: images.icons.bookmarkBlue,
        text: 'Добавить в закладки',
      },
      {
        type: 'addToArchive',
        icon: images.icons.off,
        text: 'Отправить в архив',
      },
    ],
  },
  {
    id: 5,
    image: 'idea_01.png',
    isVideo: true,
    icon: 'task_blue',
    title: 'Название интересной услуги',
    tags: ['Наука'],
    category: {
      title: 'Сообщество',
      text: 'Публицисты',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Публикация',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    },
    tools: [
      {
        type: 'report',
        icon: images.icons.report,
        text: 'Пожаловаться'
      },
    ],
  },
  {
    id: 6,
    image: 'idea_02.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Короткое',
    tags: ['ИТ'],
    category: {
      title: 'Сообщество',
      text: 'Технологии и жизнь',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Опыт реализации',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    }
  },
  {
    id: 7,
    isVideo: false,
    icon: 'task_blue',
    title: 'Длинное название интересной услуги, состоящее из нескольких разных слов',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Автомир',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Научная гипотеза',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    }
  },
  {
    id: 8,
    image: 'idea_03.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Название моей интересной услуги',
    tags: ['Юриспруденция'],
    category: {
      title: 'Сообщество',
      text: 'Омега',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Голосование',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    },
    tools: [
      {
        type: 'edit',
        icon: images.icons.pencil,
        text: 'Редактировать'
      },
      {
        type: 'copy',
        icon: images.icons.copy,
        text: 'Копировать'
      },
      {
        type: 'history',
        icon: images.icons.history,
        text: 'Перейти к истории',
        count: 99,
      },
      {
        type: 'addToArchive',
        icon: images.icons.off,
        text: 'Отправить в архив',
      },
    ],
  },
];
export const TASKS_ITEMS = [
  {
    id: 1,
    image: 'idea_01.png',
    isVideo: true,
    icon: 'task_blue',
    title: 'Название интересной задачи',
    tags: ['Наука', 'ИТ', 'Автомобили', 'Медицина'],
    category: {
      title: 'Сообщество',
      text: 'Публицисты',
      url: '/',
    },
    subcategory: {
      title: 'Локация',
      text: 'Австралия, Сидней, Оушен драйв 12',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: 'service-price-btn',
      action: '',
    },
    tools: [
      {
        type: 'dream',
        icon: images.icons.crownBlue,
        text: 'Добавить к мечте'
      },
      {
        type: 'share',
        icon: images.icons.share,
        text: 'Поделиться',
        children: [
          {
            type: 'dream',
            icon: images.icons.chatBlue,
            text: 'Чат Konstruktor',
          },
          {
            type: 'dream',
            icon: images.icons.social,
            text: 'Социальные сети',
          },
        ]
      },
      {
        type: 'addToBookmarks',
        icon: images.icons.bookmarkBlue,
        text: 'Добавить в закладки'
      },
      {
        type: 'report',
        icon: images.icons.report,
        text: 'Пожаловаться'
      },
    ],
  },
  {
    id: 2,
    image: 'idea_02.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Короткое',
    tags: ['ИТ'],
    category: {
      title: 'Сообщество',
      text: 'Технологии и жизнь',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Опыт реализации',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    }
  },
  {
    id: 3,
    isVideo: false,
    icon: 'task_blue',
    title: 'Длинное название интересной задачи, состоящее из нескольких разных слов',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Автомир',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Научная гипотеза',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    }
  },
  {
    id: 4,
    image: 'idea_03.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Название моей интересной задачи',
    tags: ['Юриспруденция'],
    category: {
      title: 'Сообщество',
      text: 'Омега',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Голосование',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    },
    tools: [
      {
        type: 'edit',
        icon: images.icons.pencil,
        text: 'Редактировать'
      },
      {
        type: 'copy',
        icon: images.icons.copy,
        text: 'Копировать'
      },
      {
        type: 'history',
        icon: images.icons.history,
        text: 'Перейти к истории',
        count: 99,
      },
      {
        type: 'addToDream',
        icon: images.icons.crownBlue,
        text: 'Добавить к мечте',
      },
      {
        icon: images.icons.share,
        text: 'Поделиться',
        children: [
          {
            type: 'dream',
            icon: images.icons.chatBlue,
            text: 'Чат Konstruktor',
          },
          {
            type: 'dream',
            icon: images.icons.social,
            text: 'Социальные сети',
          },
        ]
      },
      {
        type: 'addToBookMarks',
        icon: images.icons.bookmarkBlue,
        text: 'Добавить в закладки',
      },
      {
        type: 'addToArchive',
        icon: images.icons.off,
        text: 'Отправить в архив',
      },
    ],
  },
  {
    id: 5,
    image: 'idea_01.png',
    isVideo: true,
    icon: 'task_blue',
    title: 'Название интересной задачи',
    tags: ['Наука'],
    category: {
      title: 'Сообщество',
      text: 'Публицисты',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Публикация',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    },
    tools: [
      {
        type: 'report',
        icon: images.icons.report,
        text: 'Пожаловаться'
      },
    ],
  },
  {
    id: 6,
    image: 'idea_02.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Короткое',
    tags: ['ИТ'],
    category: {
      title: 'Сообщество',
      text: 'Технологии и жизнь',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Опыт реализации',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    }
  },
  {
    id: 7,
    isVideo: false,
    icon: 'task_blue',
    title: 'Длинное название интересной задачи, состоящее из нескольких разных слов',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Автомир',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Научная гипотеза',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    }
  },
  {
    id: 8,
    image: 'idea_03.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Название моей интересной задачи',
    tags: ['Юриспруденция'],
    category: {
      title: 'Сообщество',
      text: 'Омега',
      url: '/',
    },
    subcategory: {
      title: 'Тип',
      text: 'Голосование',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$9.99',
      class: '',
      action: '',
    },
    tools: [
      {
        type: 'edit',
        icon: images.icons.pencil,
        text: 'Редактировать'
      },
      {
        type: 'copy',
        icon: images.icons.copy,
        text: 'Копировать'
      },
      {
        type: 'history',
        icon: images.icons.history,
        text: 'Перейти к истории',
        count: 99,
      },
      {
        type: 'addToArchive',
        icon: images.icons.off,
        text: 'Отправить в архив',
      },
    ],
  },
];

export const SERVICES_DRAFT_ITEMS = [
  {
    id: 1,
    image: 'idea_01.png',
    isVideo: true,
    icon: 'task_blue',
    title: 'Название моей незаконченной услуги 1',
    tags: ['Наука'],
    category: {
      title: 'Сообщество',
      text: 'Публицисты',
      url: '/',
    },
    subcategory: {
      title: 'Локация',
      text: 'Австралия, Сидней, Оушен драйв 12',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$999.99',
      class: 'button_disabled',
      action: '',
    },
    tools: [
      {
        type: 'edit',
        icon: images.icons.pencil,
        text: 'Редактировать'
      },
      {
        type: 'copy',
        icon: images.icons.copy,
        text: 'Копировать'
      },
      {
        type: 'history',
        icon: images.icons.history,
        text: 'Перейти к истории',
        count: 99,
      },
      {
        type: 'addToArchive',
        icon: images.icons.off,
        text: 'Отправить в архив',
      },
    ],
  },
  {
    id: 2,
    image: 'idea_01.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Название моей незаконченной услуги 2',
    tags: ['ИТ'],
    category: {
      title: 'Сообщество',
      text: 'Технологии и жизнь',
      url: '/',
    },
    subcategory: {
      title: 'Локация',
      text: 'Австралия, Сидней, Оушен драйв 12',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$999.99',
      class: 'button_disabled',
      action: '',
    }
  },
  {
    id: 3,
    isVideo: false,
    image: 'idea_01.png',
    icon: 'task_blue',
    title: 'Название моей незаконченной услуги 3',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Автомир',
      url: '/',
    },
    subcategory: {
      title: 'Локация',
      text: 'Австралия, Сидней, Оушен драйв 12',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$999.99',
      class: 'button_disabled',
      action: '',
    }
  },
];
export const SERVICES_ARCHIVE_ITEMS = [
  {
    id: 1,
    image: 'idea_01.png',
    isVideo: true,
    icon: 'task_blue',
    title: 'Название моей заархивированной услуги 1',
    tags: ['Наука'],
    category: {
      title: 'Сообщество',
      text: 'Публицисты',
      url: '/',
    },
    subcategory: {
      title: 'Локация',
      text: 'Австралия, Сидней, Оушен драйв 12',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$999.99',
      class: 'button_disabled',
      action: '',
    },
    tools: [
      {
        type: 'edit',
        icon: images.icons.pencil,
        text: 'Редактировать'
      },
      {
        type: 'copy',
        icon: images.icons.copy,
        text: 'Копировать'
      },
      {
        type: 'history',
        icon: images.icons.history,
        text: 'Перейти к истории',
        count: 99,
      },
      {
        type: 'addToArchive',
        icon: images.icons.off,
        text: 'Отправить в архив',
      },
    ],
  },
  {
    id: 2,
    image: 'idea_01.png',
    isVideo: false,
    icon: 'task_blue',
    title: 'Название моей заархивированной услуги 2',
    tags: ['ИТ'],
    category: {
      title: 'Сообщество',
      text: 'Технологии и жизнь',
      url: '/',
    },
    subcategory: {
      title: 'Локация',
      text: 'Австралия, Сидней, Оушен драйв 12',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$999.99',
      class: 'button_disabled',
      action: '',
    }
  },
  {
    id: 3,
    isVideo: false,
    image: 'idea_01.png',
    icon: 'task_blue',
    title: 'Название моей заархивированной услуги 3',
    tags: ['Автомобили'],
    category: {
      title: 'Сообщество',
      text: 'Автомир',
      url: '/',
    },
    subcategory: {
      title: 'Локация',
      text: 'Австралия, Сидней, Оушен драйв 12',
      url: '/',
    },
    popularity: '999К',
    button: {
      label: '$999.99',
      class: 'button_disabled',
      action: '',
    }
  },
]