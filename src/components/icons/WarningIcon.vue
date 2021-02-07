<template lang="pug">
  svg(
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    viewBox="0 0 18 18"
  )
    title(:id="iconName" lang="en") {{ $attrs.title }}
    g(:fill="iconColor" :stroke="stroke")
      path(d="M17.7129 13.9L10.8328 1.9834C10.4502 1.32078 9.76502 0.925133 8.99981 0.925133C8.23463 0.925133 7.54937 1.32078 7.1668 1.9834L0.28677 13.9C-0.0958343 14.5627 -0.0958343 15.3539 0.28677 16.0165C0.669375 16.6792 1.35457 17.0748 2.11978 17.0748H15.8798C16.645 17.0748 17.3302 16.6792 17.7129 16.0166C18.0955 15.3539 18.0955 14.5627 17.7129 13.9ZM16.7996 15.4893C16.6076 15.8218 16.2638 16.0203 15.8798 16.0203H2.11978C1.7358 16.0203 1.39198 15.8218 1.20002 15.4893C1.00807 15.1568 1.00807 14.7598 1.20002 14.4273L8.08012 2.51071C8.27208 2.1782 8.6159 1.97971 8.99984 1.97971C9.38375 1.97971 9.72761 2.1782 9.91956 2.51071L16.7996 14.4273C16.9915 14.7598 16.9915 15.1568 16.7996 15.4893Z")
      path(d="M9.5272 6.18784H8.47266V11.4606H9.5272V6.18784Z")
      path(d="M8.99998 12.5153C8.61232 12.5153 8.29694 12.8306 8.29694 13.2183C8.29694 13.606 8.61232 13.9214 8.99998 13.9214C9.38761 13.9214 9.70303 13.606 9.70303 13.2183C9.70303 12.8306 9.38765 12.5153 8.99998 12.5153Z")
    defs
      clipPath(id="clip0")
      rect(width="18" height="18" fill="white")
</template>

<script>
  export default {
    name: 'WarningIcon',
    props: {
      iconName: String,
      width: {
        type: [Number, String],
        default: 18
      },
      height: {
        type: [Number, String],
        default: 18
      },
      iconColor: {
        type: String,
        default: 'currentColor'
      },
      stroke: {
        type: String,
        default: ''
      }
    }
  }
</script>