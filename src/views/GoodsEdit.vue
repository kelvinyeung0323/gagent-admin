<template>
  <div>
    <a-button type="primary" @click="saveGoods">保存</a-button>
    <a-button>取消</a-button>
    <a-form  :label-col="{ span: 2 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="标题">
        <a-input :value="this.goodsData.title"
                 v-decorator="['title', { rules: [{ required: true, message: 'Please input your title!' }] }]"
        />
      </a-form-item>

      <a-form-item label="商品图片">
        <a-upload
          action="http://localhost:9090/admin/uploadImage"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus"/>
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage"/>
        </a-modal>

      </a-form-item>
      <a-form-item label="商品详情">

        <quill-editor
          :content="this.goodsData.details"
        />
      </a-form-item>

      <a-form-item label="SKU">
        <a-table :columns="skuTableColumns" :data-source="skuData">
          <template slot="title">
            <a-button type="primary" @click="showSkuDrawer">
              <a-icon type="plus"/>
              新增 SKU
            </a-button>
            <a-drawer
              title="新增/修改SKU"
              :width="720"
              :visible="skuDrawerVisible"
              :body-style="{ paddingBottom: '80px' }"
              @close="onSkuDrowerClose"
            >
              <a-form layout="vertical" hide-required-mark>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item label="标题">
                      <a-input
                        v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '请输入标题' }],
                  },
                ]"
                        placeholder="请输入标题"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item label="电商平台">
                      <a-select
                        v-decorator="[
                  'owner',
                  {
                    rules: [{ required: true, message: '请选择电商平台' }],
                  },
                ]"
                        placeholder="请选择电商平台"
                      >

                        <a-select-option v-for="p in this.enums.Platform" :key="p.code" :value="p.code">
                          {{p.msg}}
                        </a-select-option>
<!--                        <a-select-option value="mao">-->
<!--                          拼多多-->
<!--                        </a-select-option>-->
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="请选择仓库">
                      <a-select
                        v-decorator="[
                  'type',
                  {
                    rules: [{ required: true, message: '请选择仓库' }],
                  },
                ]"
                        placeholder="Please choose the type"
                      >
                        <a-select-option value="private">
                          Private
                        </a-select-option>
                        <a-select-option value="public">
                          Public
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item label="请选择快递公司">
                      <a-select
                        v-decorator="[
                  'approver',
                  {
                    rules: [{ required: true, message: 'Please choose the approver' }],
                  },
                ]"
                        placeholder="Please choose the approver"
                      >
                        <a-select-option value="jack">
                          顺丰快递
                        </a-select-option>
                        <a-select-option value="tom">
                          圆通快递
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="DateTime">
                      <a-date-picker
                        v-decorator="[
                  'dateTime',
                  {
                    rules: [{ required: true, message: 'Please choose the dateTime' }],
                  },
                ]"
                        style="width: 100%"
                        :get-popup-container="trigger => trigger.parentNode"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="4">
                    <a-form-item label="价格(vip1)">
                      <a-input-number/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="4">
                    <a-form-item label="价格(vip2)">
                      <a-input-number/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="4">
                    <a-form-item label="价格(vip3)">
                      <a-input-number/>
                    </a-form-item>
                  </a-col>

                  <a-col :span="4">
                    <a-form-item label="价格(vip4)">
                      <a-input-number/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="4">
                    <a-form-item label="价格(vip5)">
                      <a-input-number/>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
              <div
                :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
              >
                <a-button :style="{ marginRight: '8px' }" >
                  Cancel
                </a-button>
                <a-button type="primary" >
                  Submit
                </a-button>
              </div>
            </a-drawer>
          </template>
        </a-table>
      </a-form-item>


    </a-form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const skuTableColumns = [
  {
    title: '商品标题',
    dataIndex: 'title',
  },
  {
    title: '电商平台',
    dataIndex: 'platform',
  },
  {
    title: '快递公司',
    dataIndex: 'expressCompany',
  },
  {
    title: '仓库',
    dataIndex: 'warehouse',
  },
  {
    title: '库存',
    dataIndex: 'stock',
  },
  {
    title: '价格(vip1)',
    dataIndex: 'price1',
  },
  {
    title: '价格(vip2)',
    dataIndex: 'price2',
  },
  {
    title: '价格(vip3)',
    dataIndex: 'price3',
  },
  {
    title: '价格(vip4)',
    dataIndex: 'price4',
  },
  {
    title: '价格(vip5)',
    dataIndex: 'price5',
  },
]

export default {
  components: { quillEditor },
  data () {
    return {
      skuData: [],
      skuTableColumns,
      skuDrawerVisible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      goodsData: {
        id: '',
        title: '',
        images: this.imageList,
        details: null,
      },
      goodsSkus: [
        {
          goodsId:1,
          title: '',
          platform: '',
          expressCompany:'',
          warehouse: '',
          stock: '',
          price1: '',
          price2: '',
          price3: '',
          price4: '',
          price5: '',
        }
      ],
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    showSkuDrawer () {
      this.skuDrawerVisible = true
    },
    onSkuDrowerClose () {
      this.skuDrawerVisible = false
    },
    saveGoods () {
      console.log('imageList:', this.imageList)
    }

  },
  computed: {
    imageList: function () {
      let imageList = []

      this.fileList.forEach((v) => {
        if (v.status == 'done' && v.response.status == 200) {
          imageList.push(v.response.data)
        }
      })
      // return this.fileList;
      return imageList
    }
  },
}
</script>

<style scoped>

</style>