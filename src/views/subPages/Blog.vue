<template>
  <div id="blog">
    <div class="header">
      <input class="title" type="text" v-model="title" placeholder="文章标题">
      <div class="titleImg">
        <el-upload
          action="/blog-serve/management/saveImage"
          :show-file-list="false"
          :on-success="handleTitleImageSuccess"
          :before-upload="beforeUpload"
        >
          <i class="fa fa-picture-o" aria-hidden="true"></i>
        </el-upload>
        <span>题图</span>
      </div>
      <el-select v-model="label" multiple placeholder="请选择标签">
        <el-option v-for="item in labelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="editor" :class="{'editorOpen':changed}">
      <div class="editorContent">
        <textarea v-model="content"></textarea>
      </div>
      <div class="editorFooter">
        <div class="arrow">
          <i
            class="fa fa-arrow-right"
            :class="{'rotate-icon':changed}"
            aria-hidden="true"
            @click="changeView"
          ></i>
        </div>
        <div class="picture">
          <el-upload
            action="/blog-serve/management/saveImage"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <i class="fa fa-picture-o" aria-hidden="true"></i>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="show" v-show="!changed">
      <div class="showContent">
        <div v-html="compiledMarkdown" v-highlight></div>
      </div>
      <div class="showFooter">
        <div class="save" @click="save">
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
export default {
  data() {
    return {
      title: "",
      titleImage: "",
      content: "",
      changed: false,
      labelList: [],
      label: []
    };
  },
  created() {
    this.getLabel();
  },
  methods: {
    changeView() {
      this.changed = !this.changed;
    },
    getLabel() {
      this.$api.getLabel().then(res => {
        let { data } = res.data;
        this.labelList = data;
      });
    },
    save() {
      if (!(this.title && this.content && this.label.length)) {
        this.$message.error("有未填写的内容");
        return;
      }
      this.$api
        .saveArticle({
          title: this.title,
          titleImage: this.titleImage,
          content: this.content,
          label: this.label
        })
        .then(res => {
          let { code, message } = res.data;
          if (code === 1) {
            this.$message({
              message,
              type: "success"
            });
          }
        });
    },
    handleSuccess(res) {
      let { code, message, data } = res;
      if (code === 1) {
        this.content = this.content.concat(`![](${data.image})`);
      } else {
        this.$message.error(message);
      }
    },
    handleTitleImageSuccess(res) {
      let { code, message, data } = res;
      if (code === 1) {
        this.titleImage = data.image;
        this.$message({ message, type: "success" });
      } else {
        this.$message.error(message);
      }
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content);
    }
  }
};
</script>
<style lang="scss" scoped>
#blog {
  height: 100%;
  overflow: hidden;
}
.header {
  height: 50px;
  width: 100%;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  .title {
    padding-left: 20px;
    height: 100%;
    width: 42%;
    border: none;
    outline: none;
    font-size: 25px;
    color: #303133;
    float: left;
  }
  .titleImg {
    float: left;
    width: 8%;
    height: 100%;
    font-size: 19px;
    color: #757575;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .el-select {
    float: left;
    width: 50%;
    margin-top: 4px;
    & /deep/ input {
      border: none;
    }
  }
}
.editor,
.show {
  width: 50%;
  float: left;
  height: calc(100% - 50px);
  transition: all 0.5s;
}
.editor {
  background-color: #fff;
}
.showContent {
  overflow: auto;
}
.editorOpen {
  width: 100%;
}
.editorContent,
.showContent {
  height: calc(100% - 30px);
  border-right: 1px solid #dcdfe6;
}
.showContent {
  padding: 10px;
}
.editorContent {
  border-left: 1px solid #dcdfe6;
}
.editorFooter,
.showFooter {
  height: 30px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
}
.showFooter {
  border-left: 0;
}
.editorFooter,
.showFooter {
  padding: 0 15px;
  font-size: 19px;
  color: #909399;
  i {
    cursor: pointer;
    transition: all 0.5s;
  }
  .arrow,
  .picture,
  .save {
    height: 30px;
    line-height: 26px;
  }
  .arrow,
  .save {
    float: right;
  }
  .fa-picture-o:hover {
    color: #c0c4cc;
  }
  .fa-floppy-o:hover {
    color: #c0c4cc;
  }
}
textarea {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  outline: none;
  resize: none;
  background-color: rgba(255, 255, 255, 0);
}
.rotate-icon {
  transform: rotate(-180deg);
}
</style>
