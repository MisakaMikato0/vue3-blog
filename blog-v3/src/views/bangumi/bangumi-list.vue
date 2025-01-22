<script setup>
import { ref, reactive, onMounted } from "vue";

import { getBangumiUserInfo, getBangumiCollection } from "@/api/bangumi";
import SkeletonItem from "@/components/SkeletonItem/skeleton-item.vue";
import Pagination from "@/components/Pagination/pagination.vue";
import PageHeader from "@/components/PageHeader/index.vue";

const bangumiList = ref([]);
const Name = ref('');
const loading = ref(false);
const type = ref('null');
let param = reactive({
  size: 1, // 当前页
  limit: 8, // 每页条目数
  offset: 0, // 请求页数
});
let total = ref(0); // 记录总数
let layout = "prev, pager, next"; // 分页组件会展示的功能项
const viewStatus = (status) => {
  switch(status) {
    case 1:
      return '想看'
    case 2:
      return '看过'
    case 3:
      return '在看'
    case 4:
      return '搁置'
    case 5:
      return '抛弃'
  }
}
const pagination = (page) => {
  param.size = page.current;
  param.offset = (page.current - 1) * param.limit;
  getBangumiCollections(Name.value, param);
};

const gotobangumiDetail = (id) => {
  window.open(`https://bgm.tv/subject/${id}`, '_blank');
};
const getBangumiCollections = async (userName, status) => {
  let res;
  loading.value = true;

  res = await getBangumiCollection({userName: userName}, {...status, limit: 8, type: type.value !== 'null' ? type.value : undefined});
  if (res) {
    loading.value = false;
    bangumiList.value = res.data.data;
    total.value = res.data.total;
  }
};
const getBangumiUserInfos = async () => {
  let res;
  loading.value = true;
  res = await getBangumiUserInfo();
  if (res) {
    if(res.data.username) {
      Name.value = res.data.username;
      getBangumiCollections(Name.value)
    }
  }
};


const activeIndex = ref('null')
const handleSelect = (key, keyPath) => {
  param.size = 1;
  type.value = key;
  if(key === 'null') {
    getBangumiCollections(Name.value)
  } else {
    getBangumiCollections(Name.value, {type: key})
  }
}
onMounted(() => {
  getBangumiUserInfos()
});
</script>

<template>
  <PageHeader :loading="loading" />
  
  <div class="center_box">
    <el-card class="bangumi-list">
      <div class="bangumi-list__head">
          <el-menu
            :default-active="activeIndex"
            class="bangumi-menu"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="null">全部</el-menu-item>
            <el-menu-item index="1">想看</el-menu-item>
            <el-menu-item index="2">看过</el-menu-item>
            <el-menu-item index="3">在看</el-menu-item>
            <el-menu-item index="4">搁置</el-menu-item>
            <el-menu-item index="5">抛弃</el-menu-item>
          </el-menu>
        </div>
      <el-skeleton v-if="loading" :loading="loading" animated>
        <template #template>
          <div class="flex_c_between  skeleton-item">
            <div v-for="i in 4" :key="i">
              <SkeletonItem variant="image" width="100%" height="6rem" />
              <SkeletonItem variant="text" width="50%" top="1rem" height="20px" />
              <SkeletonItem variant="text" width="50%" top="1rem" height="20px" />
            </div>
          </div>
        </template>
      </el-skeleton>
      <template v-else>
        
        <el-row v-if="bangumiList.length > 0">
          <el-col v-for="(item, index) in bangumiList" :key="index">
            <el-card class="card-hover" @click="gotobangumiDetail(item?.subject?.id)">
              <div class="bangumi-info">
                <!-- 番剧封面 -->
                <div class="bangumi-avatar">
                  <el-image
                    class="bangumi-avatar-img scale"
                    :src="item?.subject?.images?.common"
                    fit="cover"
                  />
                </div>
                <!-- 标题和进度条 -->
                <div class="bangumi-content">
                  <div class="bangumi-title">
                    <h2 class="bangumi-title-name">{{ item?.subject?.name }}</h2>
                    <div class="bangumi-tags">
                      <h5 v-for="(tag, index) in item?.tags" :key="index">{{ tag }}</h5>
                    </div>
                    <div class="bangumi-view">
                      <span>{{ viewStatus(item?.type) }}</span>
                    </div>
                  </div>
                  <div class="short_summary">
                    <span>{{ item?.subject?.short_summary }}...</span>
                  </div>
                  <div class="bangumi-progress">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="20"
                      :percentage="(item?.ep_status/item?.subject?.eps)*100"
                      status="exception"
                    >
                      <span class="bangumi-progress-text">{{ item?.ep_status }}/{{ item?.subject?.eps }}</span>
                    </el-progress>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col >
            <el-result
              title="这里还没有番剧哦~"
              sub-title="请先添加番剧"
            >
            <template #icon>
              <el-image
              style="width: 100px; height: 100px"
                src="https://i.miji.bid/2025/01/12/f8a8d619191677682cd0d9bbf48c669f.gif"
              />
            </template>
            </el-result>
          </el-col>
        </el-row>
      </template>
    </el-card>
    <Pagination
      :size="param.limit"
      :current="param.size"
      :layout="layout"
      :total="total"
      @pagination="pagination"
    />
  </div>
</template>

<style lang="scss" scoped>
.bangumi-menu {
  .el-menu-item {
    color: var(--bangumi-color);
  }
}
.bangumi-list {
  padding: 20px 30px;
  width: 100%;
  color: var(--font-color);

  &__head {
    font-size: 1.6rem;
    line-height: 1.7;
    font-weight: 600;

    &-total {
      font-size: 1.2rem;
    }
  }

  .bangumi-info {
    display: flex;
    align-items: center;

    .bangumi-avatar {
      width: 150px;
      height: 200px;
      margin-right: 10px;
    }

    .bangumi-avatar-img {
      width: 100%;
      height: 100%;
    }

    .bangumi-content {
      flex: 1;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-right: 10px;
      
      .bangumi-title {
        font-size: 1.2rem;
        color: var(--bangumi-color);
        display: flex;
        align-items: center;
        .bangumi-title-name:hover {
          color: var(--second-font-color);
        }
        .bangumi-title-name {
          max-width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bangumi-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-left: 10px;
        }
        .bangumi-view {
          margin-left: auto;
          padding:3px;
          background-color: var(--title-font);
          border-radius: 5px;
          font-size: 1rem;
          span {
            color: var(--bangumi-color);
          }
         
        }
      }

      .bangumi-progress {
        font-size: 1rem;
        color: #676767;
        .bangumi-progress-text {
          font-size: 1rem;
          color: #333;
        }
      }
    }
  }
}

.skeleton-item {
  margin-top: 1rem;
}
html.dark {
  .bangumi-list {
    .bangumi-info {
      .bangumi-progress {
        .bangumi-progress-text {
          color: #fff;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .bangumi-list {
    padding: 10px 15px;
    .bangumi-menu {
      .el-menu-item {
        font-size: 1.1rem;
        padding: 0 8px;
      }
    }
    .bangumi-info {
      .bangumi-avatar {
        width: 100px;
        height: 150px;
      }
      .bangumi-content {
        height: 150px;
        .bangumi-title {
          .bangumi-title-name {
            font-size: 0.9rem;
            margin-right: 5px;
            max-width: 145px;
          }
          .bangumi-tags{
            font-size: 0.7rem;
            display: none;
          }
          .bangumi-view {
            font-size: 0.7rem;
          }
        }
        .short_summary{
          display: -webkit-box; /* 必须结合 -webkit-box-orient 使用 */
          -webkit-box-orient: vertical; /* 设置盒子方向为垂直 */
          overflow: hidden; /* 隐藏溢出内容 */
          text-overflow: ellipsis; /* 使用省略号表示溢出文本 */
          -webkit-line-clamp: 3;
          font-size: 0.8rem;
        }
      }
    }
  }
  .el-menu--horizontal {
    .el-menu-item {
      color: var(--bangumi-color);

    }
  }
}
</style>
