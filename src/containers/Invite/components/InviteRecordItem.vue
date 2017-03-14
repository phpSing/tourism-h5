<template lang="html">
    <div class="cpt-invite-record-item">
      <span class="invite-timestamp">{{ invitation.timeadd }}</span>
      <span class="invite-phone">{{ invitation.mobile }}</span>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    invitation: {
      type: Object,
      default: {}
    }
  },
  computed: {},
  mounted () {},
  methods: {
  },
  components: {}
}
</script>

<style lang="scss">
@import '../../../scss/variable.scss';

.cpt-invite-record-item {

  padding: 0 toRem(30px);
  border-bottom: toRem(1px) solid #8e8e8e;
  color: #8e8e8e;
  height: toRem(90px);
  line-height: toRem(90px);
  font-size: toRem(26px);
  font-family: Helvetica Neue;

  .invite-timestamp {
    display: inline-block;
    float: left;
    max-width: 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .invite-phone {
    display: inline-block;
    float: right;
    max-width: 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

</style>
