<!-- 顶级选择模块 -->
<template>
  <div>
    <div class="sm-top" @click="toggleShow">
      {{ owlName }}
    </div>
    <el-collapse-transition>
      <div v-show="isShow" id="showBanner">
        <DaySwine />
        <FeedingContrast />
        <TimeContrast />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import DaySwine from '../templates/DaySwine.vue'
import FeedingContrast from '../templates/FeedingContrast.vue'
import TimeContrast from '../templates/TimeContrast.vue'
export default {
  components: { TimeContrast },
  name: 'TopLvModel',
  props: {
    owlName: {
      type: String,
      default: '本体'
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow
    }
  },
  components: {
    TimeContrast,
    DaySwine,
    FeedingContrast
  }
}
</script>
<style scoped>
.alter {
  margin-left: 5px;
  margin-right: 5px;
}

.el-cascader {
  max-width: 200px;
}

.select {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
}
.sm-top {
  margin: 10px 25px 0px;
  padding-left: 10px;
  background-color: #1f728a;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.sm-top span {
  width: 40px;
  height: 100%;
  float: right;
}
.sm-top span:hover {
  cursor: pointer;
}
.benti-ipt {
  background-color: #1f728a;
  margin: 8px 25px 0 50px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  padding-left: 5px;
  border-radius: 10px;
}
/* .benti-ipt:hover {
  background-color: #dddddd;
} */
.benti-ipt .block {
  margin-left: 10px;
}

.run:hover {
  cursor: pointer;
}
#showBanner {
  height: 100px;
}
</style>
