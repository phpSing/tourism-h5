<template lang="html">
    <div class="page-invite flex-col">

        <div class="score-board flex-row">
            <strong>{{ inviteIndexData.totalFriendsScores }}</strong>
            <span>积分</span>
            <div class="number-friends">
              <strong>{{ inviteIndexData.totalFriendsNum }}</strong>
              <span>位好友已为你赚取</span>
            </div>
            <a class="invite-rules" :href="inviteIndexData.rule_url || 'javascript:void()'">
              <i class="icon-question"></i>
              <span>推荐规则</span>
            </a>
        </div>

        <button class="button-invite" type="button_invite" name="button_invite" @click="callNativeShare">分享并推荐好友</button>

        <div class="invite-code">
            我的推荐码: <strong>{{ inviteIndexData.invitation_code }}</strong>
        </div>

        <div class="invite-bonus">

          <div class="heading">
            <div class="border-dash left"></div>
            <div class="border-dash right"></div>
            推荐明细
          </div>

          <div class="invite-records">

            <InviteRecordItem
              v-for="invitation in inviteIndexData.invitationList"
              :invitation="invitation"
            />

          </div>

        </div>


        <Alert
          v-if="alertMessage"
          :message="alertMessage"
          :buttonList="[
            {
              text: '确认',
              event: hideAlert
            }
          ]"
        />

    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Cookie from 'js-cookie'
import InviteRecordItem from './components/InviteRecordItem'
import Alert from '../../components/Alert';


import sharePic from '../../assets/logo.png'

export default {
  beforeRouteEnter(to, from, next) {

    next( async vm => {
      console.log(vm.$route);
      // loader
      vm.showLoading()
      // login app实际场景跳登陆 fetch中直接判断不需要这段 只在浏览器中使用
      // ============================================================
      // if (!Cookie.get('session_id')) {
      //   await vm.login({
      //     mobile: 13023166006,
      //     pwd: 11111111
      //   })
      // }
      // =======================================================================
      await vm.getInviteData()
      vm.hideLoading()
      // 提供全局分享参数
      window.getAppShareInfo = function() {
        return {
          title: '妈妈的专属理财平台，宝宝福利活动不断，惊喜多多，你也来看看！',
          imgUrl: sharePic,
          desc: '我最近在一家专属妈妈的理财平台理财，收益不错，资产是经过层层风控保障的',
          link: this.inviteIndexData.invitation_url
        }
      }.bind(vm)

      document.title = vm.inviteIndexData.title

    })

  },
  data () {
    return {}
  },
  computed: mapGetters([
    'alertMessage',
    'fetching',
    'loginInfo',
    'inviteIndexData'
  ]),
  mounted () {

  },

  methods: {
    ...mapActions([
      'showAlert',
      'hideAlert',
      'showLoading',
      'hideLoading',
      'getInviteData',
      'login'
    ]),

    callNativeShare: function() {
      // 呼起原生分享
      let app = app || window.app
      app && app.jsNavtiveHandle("{\"targetClass\":\"\",\"methodType\":\"0\",\"methodName\":\"invokeAppShare\",\"parm\":[]}")

    }

  },
  components: {
    InviteRecordItem,
    Alert
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variable.scss';

.page-invite {

  .score-board {
    position: relative;
    width: 100%;
    height: toRem(340px);
    padding-left: toRem(30px);
    padding-right: toRem(30px);
    padding-bottom: toRem(75px);
    color: #fff;
    font-size: toRem(26px);
    background: url(../../assets/bg-invite.png) top center no-repeat;
    background-size: cover;
    &.flex-row {
      align-items: flex-end;
    }

    strong {
      font-size: toRem(60px);
      line-height: toRem(60px);
      font-family: Helvetica Neue;
    }

    .number-friends {
      position: absolute;
      left: toRem(30px);
      top: toRem(135px);
      color: #fee1e5;
      font-size: toRem(24px);

      strong {
        font-size: toRem(28px);
      }
    }

    .invite-rules {
      position: absolute;
      right: toRem(25px);
      bottom: toRem(25px);
      display: block;
      color: #fff;

      .icon-question {
        display: inline-block;
        width: toRem(27px);
        height: toRem(27px);
        background: url(../../assets/icon-question.png) top center no-repeat;
        background-size: cover;
        vertical-align: -13%;
      }
    }

  }

  .button-invite {
    height: toRem(96px);
    width: toRem(690px);
    line-height: toRem(96px);
    background: #f65a24;
    color: #fff;
    font-size: toRem(40px);
    margin: 0 auto;
    margin-top: toRem(42px);
    margin-bottom: toRem(40px);
  }

  .invite-code {
    color: #8e8e8e;
    font-size: toRem(28px);
    margin-bottom: toRem(90px);

    strong {
      color: #333;
      font-size: toRem(30px);
    }
  }

  .invite-bonus {
    width: 100%;
    .heading {
      margin: 0 toRem(30px);
      text-align: center;
      font-size: toRem(28px);
      color: #333;
      position: relative;

      .border-dash {
        height: toRem(1px);
        background: #aaa;
        width: toRem(250px);
        position: absolute;
        top: toRem(18px);

        &.left {
          left: 0;
        }

        &.right {
          right: 0;
        }
      }
    }

    .invite-records {
      margin-top: toRem(26px);
    }
  }

}

</style>
