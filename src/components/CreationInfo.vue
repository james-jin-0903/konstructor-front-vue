<template lang="pug">
  .creation-info
    span.creation-info__date Создана 15 ноября 2017, 15:00
    span.creation-info__divider для
    Avatar(v-if="userFrom"
      :initials="userFrom.initials"
      :fillLevel="userFrom.fillLevel"
      :name="userFrom.name"
    ).creation-info__user.avatar_big-font
    span.creation-info__divider от
    Avatar(
      v-if="userTo"
      :initials="userTo.initials"
      :fillLevel="userTo.fillLevel"
      :name="userTo.name"
    ).creation-info__user.avatar_big-font
</template>

<script>
  import Avatar from './Avatar';

  export default {
    name: 'CreationInfo',
    components: { Avatar },
    props: {
      creationInfo: {
        date: String,
        userFrom: {
          initials: String,
          name: String,
          fillLevel: Number
        },
        userTo: {
          initials: String,
          name: String,
          fillLevel: Number
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      userFrom() {
        return this.creationInfo.userFrom;
      },
      userTo() {
        return this.creationInfo.userTo;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .creation-info {
    display: flex;
    align-items: center;

    font-size: 12px;
    line-height: 16px;

    color: #B2BCCA;

    &__divider {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
</style>
