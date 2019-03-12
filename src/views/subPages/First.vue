<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="6" v-for="(item,index) in dataSummaryList" :key="index">
        <div class="card">
          <div :class="'color'+index" class="icon">
            <i :class="item.icon" class="fa" aria-hidden="true"></i>
          </div>
          <p class="title">{{item.title}}</p>
          <p class="number">{{item.number}}</p>
        </div>
      </el-col>
    </el-row>
    <div id="chart" ref="chart"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      dataSummaryList: [
        { name: "totalUser", number: 0, title: "用户总数", icon: "fa-user" },
        {
          name: "totalVisit",
          number: 0,
          title: "总访问量",
          icon: "fa-heart"
        },
        {
          name: "dailyVisit",
          number: 0,
          title: "今日访问量",
          icon: "fa-calendar-check-o"
        },
        {
          name: "averageDailyVisit",
          number: 0,
          title: "日均访问量",
          icon: "fa-line-chart"
        }
      ],
      option: {
        grid: {
          left: 40,
          top: 20,
          right: 0,
          bottom: 40
        },
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [],
            type: "line"
          }
        ]
      }
    };
  },
  created() {
    this.getSummary();
  },
  async mounted() {
    await this.$api.getOneWeekLoginData().then(res => {
      let { code, data } = res.data;
      if (code === 1) {
        data.map((v, i) => {
          this.option.xAxis.data[i] = v.date;
          this.option.series[0].data[i] = v.count;
        });
      }
    });
    const myChart = echarts.init(this.$refs.chart);
    myChart.setOption(this.option);
  },
  methods: {
    getSummary() {
      this.$api.getSummary().then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.dataSummaryList.map(v => {
            v.number = data[v.name];
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 20px 0;
  p {
    text-align: right;
    margin: 15px;
  }
  .icon {
    width: 100px;
    height: 100px;
    border-radius: 3px;
    line-height: 100px;
    font-size: 50px;
    color: #fff;
    text-align: center;
    float: left;
    margin-top: -30px;
  }
  .title {
    font-size: 20px;
    color: #909399;
  }
  .number {
    font-size: 30px;
    color: #606266;
  }
}
#chart {
  width: 100%;
  height: 480px;
}
.color0 {
  background: linear-gradient(60deg, #66bb6a, #43a047);
  box-shadow: 0 12px 20px -10px rgba(76, 175, 80, 0.28),
    0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2);
}
.color1 {
  background: linear-gradient(60deg, #ef5350, #e53935);
  box-shadow: 0 12px 20px -10px rgba(244, 67, 54, 0.28),
    0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2);
}
.color2 {
  background: linear-gradient(60deg, #ffa726, #fb8c00);
  box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28),
    0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2);
}
.color3 {
  background: linear-gradient(60deg, #26c6da, #00acc1);
  box-shadow: 0 12px 20px -10px rgba(0, 188, 212, 0.28),
    0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2);
}
</style>
