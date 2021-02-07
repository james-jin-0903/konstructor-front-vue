<template lang="pug">
  svg(
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    viewBox="0 0 22 22"
  )
    title(:id="iconName" lang="en") {{ iconName }} icon
    g(:fill="iconColor" :stroke="stroke")
      path(d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z")
</template>

<script>
  export default {
    name: 'FileIcon',
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
