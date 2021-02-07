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
      rect(x=".5" y=".5" width="6" height="6" rx=".5")
      rect(x="9.5" y=".5" width="6" height="6" rx=".5")
      rect(x="9.5" y="9.5" width="6" height="6" rx=".5")
      rect(x=".5" y="9.5" width="6" height="6" rx=".5")
</template>

<script>
  export default {
    name: 'BlockIcon',
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