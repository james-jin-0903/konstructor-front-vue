<template lang="pug">
  svg(
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    viewBox="0 0 23 23"
  )
    title(:id="iconName" lang="en") {{ iconName }} icon
    g(:fill="iconColor" :stroke="stroke")
      path(d="M5.65687 5.65685C5.9068 5.40692 6.31203 5.40692 6.56196 5.65685L16.9706 16.0655C17.2205 16.3154 17.2205 16.7206 16.9706 16.9706C16.7206 17.2205 16.3154 17.2205 16.0655 16.9706L5.65687 6.56195C5.40693 6.31202 5.40693 5.90679 5.65687 5.65685Z")
      path(d="M16.9706 5.65685C17.2205 5.90679 17.2205 6.31201 16.9706 6.56195L6.56196 16.9706C6.31203 17.2205 5.9068 17.2205 5.65687 16.9706C5.40693 16.7206 5.40693 16.3154 5.65687 16.0655L16.0655 5.65685C16.3154 5.40692 16.7206 5.40692 16.9706 5.65685Z")

</template>

<script>
  export default {
    name: 'CloseIcon',
    props: {
      iconName: String,
      width: {
        type: [Number, String],
        default: 20
      },
      height: {
        type: [Number, String],
        default: 20
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
