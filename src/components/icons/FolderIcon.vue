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
      path(d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z")
</template>

<script>
  export default {
    name: 'FolderIcon',
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
