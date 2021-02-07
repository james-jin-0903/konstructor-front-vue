<template lang="pug">
  svg(
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    viewBox="0 0 18 18"
  )
    title(:id="iconName" lang="en") {{ iconName }} icon
    g(:fill="iconColor" :stroke="stroke")
      rect(x="4" y="13" width="12" height="2" rx="1")
      rect(y="13" width="2" height="2" rx="1")
      rect(x="4" y="8" width="12" height="2" rx="1")
      rect(y="8" width="2" height="2" rx="1")
      rect(x="4" y="3" width="12" height="2" rx="1")
      rect(y="3" width="2" height="2" rx="1")
</template>

<script>
  export default {
    name: 'ListIcon',
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