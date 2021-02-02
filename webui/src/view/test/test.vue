<template>
  <div style="margin-bottom: 15%">
    <van-button type="primary" @click="clickTest">
      打开
    </van-button>
    <dialog>
      
    </dialog>
  </div>
</template>

<script>
import {
  Dialog,
  Button
} from 'vant';

export default {
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
  },
  data() {
    return {
      Arealoading: true,
      activeNames: ['1', '2'],
      overlayShow: false,
      value: '',
      date: '',
      starTime: '',
      endTime: '',
      show: false,
      dateRangeShow: false,
      fieldValue: '',
      statusList: [],
      detailList: [],
      nowCheck: -1,
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
      optionList: {},
    };
  },
  created() {
  },
  methods: {
    clickTest() {
      this.show = true;
    }
  },
};
</script>

<style lang="less">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  align-content: center;
  background-color: #fff;
}
</style>
