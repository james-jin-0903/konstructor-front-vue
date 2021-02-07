<template lang="pug">
  .modal-mask
    .modal-wrapper
      .modal-container
        button(type="button" @click="$emit('close')").modal-close
        .modal-header
          slot(name='header')
            | default header
        .modal-body
          slot(name='body')
            | default body
        .modal-footer
          slot(name='footer')
            | default footer
            button.modal-default-button(@click="$emit('close')")
              | OK

</template>

<script>
  export default {
    name: 'Modal'
  };
</script>

<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 4, 29, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    position: relative;
    width: 300px;
    margin: 0 auto;
    padding: 20px 40px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #444444;
    padding-top: 20px;
    padding-bottom: 10px;
    font-family: $openSans;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .modal-close {
    position: absolute;
    width: 16px;
    height: 16px;
    background: url('../assets/images/icon_close.svg') no-repeat center;
    right: -26px;
    top: -35px;
    border: none;
  }

</style>
