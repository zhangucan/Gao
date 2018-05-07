<template>
  <div class="app-container">
  <transition name="component-fade" mode="out-in">
    <el-row v-if="mapState === 1" key="editing">
      <el-col :span="16" :offset=4>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="地图名称">
            <el-input v-model="form.name" placeholder="地图名称"></el-input>
          </el-form-item>
          <el-form-item label="地图坐标系">
            <el-input v-model="form.name" placeholder="经度"></el-input>
          </el-form-item>
          <el-form-item label="地图中心点">
            <el-input v-model="form.name" placeholder="经度"></el-input>
            <el-input v-model="form.name" placeholder="维度"></el-input>
          </el-form-item>
          <el-form-item label="湿地标签">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="饮用水" name="type"></el-checkbox>
              <el-checkbox label="农业" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="简单描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="mapState === 2" key="edited">
      <el-col :span="8">
        <el-form>
          <el-form-item label="拍摄时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="16"></el-col>
    </el-row>
    <el-row v-if="mapState === 3" key="saved">
      Cancel
    </el-row>
  </transition>
    <el-row>
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="填数据"></el-step>
        <el-step title="确认信息"></el-step>
      </el-steps>
      <el-button type="primary" @click="previous">上一步</el-button>
      <el-button @click="next">下一步</el-button>
    </el-row>
  </div>

</template>
<script>
export default {
  data() {
    return {
      active: 1,
      mapState: 1,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    next() {
      if (this.active++ > 2) {
        this.active = 3
      } else {
        this.mapState = this.active
      }
    },
    previous() {
      if (this.active-- < 2) {
        this.active = 1
      } else {
        this.mapState = this.active
      }
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
.line{
  text-align: center;
}
.el-row{
  min-height: 600px;
}
</style>
