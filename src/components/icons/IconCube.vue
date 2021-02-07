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
      path(fill="url(#pattern0)" d="M0 0h15v16H0z")
      defs
        pattern(
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        )
          use(
            xlink:href="#image0"
            transform="scale(.06667 .0625)"
          )
        image(
          id="image0"
          width="15"
          height="16"
          xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAB6UlEQVQokXXTS4iPURgG8N//32hcChuSBcpCiCSHck2HECcSsUDJSlhggWhyS0w2trKRZEHJfEKaT8m4zHxDrmUhUkrKJUWkGWNzMI2c1anzvM/7PM9531pPT4++pyircTiMwfiAvSmGV31xtd7FRVkNwS5Mxi0UWIEFuI2jKYav/xQXZbUVazELrSmGhb1I72F6JjiTYjgJtZbWjuE4i3c4jufYiUV4nFVcwglMycoGYF0dB7OsOymGhymG72jDDKzEHFxOMXSlGDpxH0uxr9bS2nED7Zn1K75hNLalGB4VZbUATVnFJPzEE0ysoxHnUwxL8APr8B3PsuW76IcteJ5imI8WDGzID8vwANcwFHfwtCirTkzFydzxVCZc/zuwq1icAxmMzymG7UVZpdxhWorhflFW5/AJg7ABF+vozgk2YmPuJMVQoD0X9scEbMKLbKGxjjG4lWLYnIOZW5RVZ1FWzeguyuoIOjAOq1IMh/AaI+r50pS9vMF5HMAazMzftR3X8THjtuJpraW1Yxiu4G32/CTFsK0oq5G4ifEphq6irE7jC4ZjBJb3Hs/d2IP3mJdieFOUVVuKYXZRVmNxDz3Y92c8+yxGA/ZjNTr9nefJuIDmFEPXb3ztPys5CccwCi+xI8Xwoi/uF8yevvxBLhy4AAAAAElFTkSuQmCC"
        )
</template>

<script>
  export default {
    name: 'CubeIcon',
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