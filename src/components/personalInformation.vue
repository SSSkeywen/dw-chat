<template>
  <div id="personal">
      <ul class="per_title">
          <li v-for="(item, index) in titleLists" :class="item.titleClass" @click="titleOPeration(index)" :key="index">
              <span>{{ item.titleName }}</span>
          </li>
      </ul>
      <div v-show="isCardContent" class="per_box">
          <div class="per_box_select"  ref="perBoxSelect">
              <div class="per_new_content" @click="perSelect(false)">
                  <!-- <transition name="per-new-fade"> -->
                    <div class="per_new_bg" ref="perNew"></div>
                  <!-- </transition> -->
                  
                  <div class="per_new_two_bg">
                      <p v-for="(item, index) in perSelectData" :key="index" class="pitch_on">
                      <span>{{ item.contentSelect }}</span></p>
                  </div>
              </div>
          </div>
          <ul class="per_content_one" v-show="isShowSelect">
              <li v-for="(item, index) in selectableListData" :class="item.pitchOn" :key="index" @click="Designate(index)">
                  <div class="pitch_title" >
                    <div class="icon_one"><i class="iconfont" :class="item.selectableIcon"></i></div>
                    <p><span>{{ item.MODULENAME }}</span></p>
                    <div class="icon_two"><i class="iconfont icon-xiangxia2"></i></div>
                  </div>
                  <div class="pitch_on_data" v-show="item.isShowContent">
                      <!-- <div v-for="(cardList, index) in item.selectableContent.temlist" :key="index"> -->
                        <ul class="my_card_list">
                            <li v-for="(cardListData, indexTwo) in item.temlist" :key="indexTwo" @click="selectCard(indexTwo)">
                                <div class="my_card_list_img">
                                    <!-- <div>
                                        <img :src="cardListData.CardHeadPortrait" alt="">
                                    </div> -->
                                </div>
                                <div class="card_checkbox">
                                    <el-checkbox v-model="cardListData.isCardSelect"></el-checkbox>
                                </div>
                                <p>{{ cardListData.SLUG}}</p>
                                
                            </li>
                        </ul>
                      <!-- </div> -->
                  </div>
              </li>
          </ul>
          <ul class="per_content_one" v-show="!isShowSelect">
              <li v-for="(item, index) in selectableListData" :class="item.pitchOn" :key="index" @click="Designate(index)">
                  <div class="pitch_title" >
                    <div class="icon_one"><i class="iconfont" :class="item.selectableIcon"></i></div>
                    <p><span>{{ item.MODULENAME }}</span></p>
                    <div class="icon_two"><i class="iconfont icon-xiangxia2"></i></div>
                  </div>
                  <div class="pitch_on_data" v-show="item.isShowContent">
                      <!-- <div v-for="(cardList, index) in item.selectableContent.temlist" :key="index"> -->
                        <ul class="my_card_list">
                            <li v-for="(cardListData, indexTwo) in item.temlist" :key="indexTwo" @click="selectCard(indexTwo)">
                                <div class="my_card_list_img">
                                    <!-- <div>
                                        <img :src="cardListData.CardHeadPortrait" alt="">
                                    </div> -->
                                </div>
                                <div class="card_checkbox">
                                    <el-checkbox v-model="cardListData.isCardSelect"></el-checkbox>
                                </div>
                                <p>{{ cardListData.MAINTITLE}}</p>
                                
                            </li>
                        </ul>
                      <!-- </div> -->
                  </div>
              </li>
          </ul>
          <div class="send_btn">
            <div v-if="isShowSelect">
                <el-button class="btn_style" type="primary" @click="sendWechat" :disabled="isDisabel" plain><i class="iconfont icon-weixin1"></i>&nbsp;微信发送</el-button>
                <el-button class="btn_style" type="primary" @click="WechatPreview" :disabled="isDisabel" plain><i class="iconfont icon-weixin1"></i>&nbsp;微信预览</el-button>
            </div>
            <div v-else>
                <el-button class="btn_style" type="primary" @click="sendNote" plain><i class="iconfont icon-duanxin1"></i>&nbsp;短信发送</el-button>
                <el-button class="btn_style" type="primary" @click="NotePreview" plain><i class="iconfont icon-duanxin1"></i>&nbsp;短信预览</el-button>
            </div>
        </div>
      </div>
      <div v-if="isClient" class="client_perview_two">
          <div class="client_data">
              <p class="client_data_title">微信资料</p>
              <div class="client_data_content">
                  <div class="client_data_content_img">
                      <img :src="'/tpdwt_web/chat/getFile.html?filePath='+clientPortrayalDataList.HEADERIMG" alt="">
                  </div>
                  <div class="client_data_content_message">
                      <p>姓名：<span>{{ clientPortrayalDataList.NICKNAME }}</span>
                        <span class="client_data_content_sex" v-if="clientPortrayalDataList!=''">
                            <i class="iconfont icon-nan" style="color: #3a8ee6" v-if="clientPortrayalDataList.SEX=='1'"></i>
                            <i class="iconfont icon-nv" v-else style="color: #fc3bfa"></i>
                        </span>
                      </p>
                      <p>地区：<span>{{ clientPortrayalDataList.ADDRESS }}</span></p>
                  </div>
                  <!-- <div class="client_data_content_sex" v-if="clientPortrayalDataList!=''">
                      <i class="iconfont icon-nan" style="color: #3a8ee6" v-if="clientPortrayalDataList.SEX=='1'"></i>
                      <i class="iconfont icon-nv" v-else style="color: #fc3bfa"></i>
                  </div> -->
              </div>
          </div>
          <div>
              <img src="../../static/images/separate.jpg" alt="" width="100%">
          </div>
          <div class="client_data">
              <p class="client_data_title">客户标签<span style="float: right;">{{ clientPortrayalDataList.clientPortrayalNo }}<i v-if="clientPortrayalDataList != ''">个</i></span></p>
              <div class="client_data_list">
                  <!-- <el-tag type="success" v-for="(item, index) in clientPortrayalDataList.laber" :key="index">{{ item }}</el-tag> -->
                  <ul>
                      <li v-for="(item, index) in clientPortrayalDataList.laber" :key="index" class="tips_content">{{ item }}</li>
                  </ul>
              </div>
          </div>
      </div>
      <div v-if="isFooter" class="footer_content_box">
          <div class="footer_content">
              <div class="footer_left"></div>
              <ul class="footer_right">
                  <li :class="item.addClassNameData" v-for="(item, index) in clientFooterData" :key="index">
                      <div class="icon_yuan"></div>
                      <p class="footer_time">{{ item.INSERT_TIME }}</p>
                      <div class="footer_icon">
                          <i class="iconfont" :class="item.iconContent"></i>
                          <span>{{ item.clientOperation }}</span>
                      </div>
                      <div class="footer_list_content">
                          <div class="footer_sanj"></div>
                          <p>{{ item.FOOTPRINT_CONTENT }}</p>
                          <!-- <p><a href="http://baoxian.cntaiping">http://baoxian.cntaiping</a></p> -->
                      </div>
                  </li>
                  <!-- <li>
                      <div class="icon_yuan"></div>
                      <p class="footer_time">今天上午 10:00:00</p>
                      <div class="footer_icon">
                          <i class="iconfont icon-tijiao"></i>
                          <span>提交</span>
                      </div>
                      <div class="footer_list_content">
                          <div class="footer_sanj"></div>
                          <p>完成太平问卷调查</p>
                          <p><a href="http://baoxian.cntaiping">http://baoxian.cntaiping</a></p>
                      </div>
                  </li> -->
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import * as types from '../store/types.js'
import { mapActions } from 'vuex'
export default {
  data() {
      return {
          titleLists: [{
              titleName: '可选内容',
              titleClass: 'pitch_on',
          },{
              titleName: '客户画像',
              titleClass: '',
          },{
              titleName: '客户足迹',
              titleClass: '',
          }],
          isSms: false,
          geshu: '',
          isCardCompany: false,
          isCardMy: false,
          isCardContent: true,
          isClient: false,
          isFooter: false,
          clientFooterDataTwo: [],
          perSelectData: [{
              contentSelect: '微信'
          },{
              contentSelect: '短信'
          }],
          isShowSelect: false,
          pitchDataNo: 0,
          selectableListData: [{
              MODULENAME:'引导区',
              isShowContent: true,
              pitchOn: "pitch_on_li",
              selectableIcon:'icon-shouyefill',
              temlist:[{
                    ID:"46546546",
                    SLUG:"测试使用1",
                    MODULEID:"1",
                    TYPE:"2",
              }]
          },{
              MODULENAME:'保险理念',
              isShowContent: false,
              selectableIcon:'icon-pengyoufill',
              pitchOn: "",
              temlist:[{
                    ID:"46546546",
                    SLUG:"测试使用1",
                    MODULEID:"1",
                    TYPE:"2",
              }]
          },{
              MODULENAME:'活动测试',
              isShowContent: false,
              selectableIcon:'icon-salefill',
              pitchOn: "",
              temlist:[{
                    ID:"46546546",
                    SLUG:"测试使用1",
                    MODULEID:"1",
                    TYPE:"2",
              }]
          },{
              MODULENAME:'短险购买',
              isShowContent: false,
              selectableIcon:'icon-tishifill',
              pitchOn: "",
              temlist:[{
                    ID:"46546546",
                    SLUG:"测试使用1",
                    MODULEID:"1",
                    TYPE:"2",
              }]
          },{
              MODULENAME:'长险测保',
              isShowContent: false,
              selectableIcon:'icon-xinxifill',
              pitchOn: "",
              temlist:[{
                    ID:"46546546",
                    SLUG:"测试使用1",
                    MODULEID:"1",
                    TYPE:"2",
              }]
          }],
          listOneNo: 0,
          listTwoNo: 0,
      }
  },
  props: ['clientPortrayalDataList','clientFooterData','isDisabel','isPhoneDisabel', 'isJudge'],
  mounted () {
      this.modelListData(1)
      
      
  },
  methods: {
      ...mapActions({
          modelList: types.MODELLIST,
      }),
      //足迹添加样式内容
      clientFooterList() {
          
      },
      //可选内容区选择事件
      Designate(index) {
          this.listOneNo = index
        //   alert(this.listOneNo)
          if (this.selectableListData[index].isShowContent == false){
            for(let i = 0; i < this.selectableListData.length; i ++){
                this.selectableListData[i].pitchOn = ''
                this.selectableListData[i].isShowContent = false
            }
              this.selectableListData[index].pitchOn = 'pitch_on_li'
              this.selectableListData[index].isShowContent = true
          }else {
              this.selectableListData[index].pitchOn = ''
              this.selectableListData[index].isShowContent = false
          }
          
      },
      //获取民片内容
      modelListData(num) {
        //   console.log(this.clientPortrayalDataList)
        //   this.geshu = this.clientPortrayalDataList.length
        //console.log(num)
        let modelListWechat = new FormData()
            modelListWechat.append('wechatNo', num)
        this.modelList({
                modelListWechat,
                successCallback: () => {
                for(let i = 0; i <  this.$store.getters.cardListData.length;i ++ ){
                    this.selectableListData[i].temlist = this.$store.getters.cardListData[i].temlist
                    }
               // console.log(this.selectableListData)
                },
                failCallback: () => {
                }
            })
      },
      //顶部切换
      titleOPeration(index) {
          //console.log(this.selectableListData)
        if (index === 0){
            for(let i = 0; i < this.titleLists.length; i++){
                this.titleLists[i].titleClass = ''
            }
            this.titleLists[0].titleClass = 'pitch_on'
            this.isCardContent = true
            this.isClient = false
            this.isFooter = false
        }
        if (index === 1){
            if(this.isJudge){
                for(let i = 0; i < this.titleLists.length; i++){
                    this.titleLists[i].titleClass = ''
                }
                this.titleLists[1].titleClass = 'pitch_on'
                this.isCardContent = false
                this.isClient = true
                this.isFooter = false
                this.$emit('clientPortrayalData')
            }
        }
        if (index === 2){
            if (this.isJudge){
                for(let i = 0; i < this.titleLists.length; i++){
                    this.titleLists[i].titleClass = ''
                }
                this.titleLists[2].titleClass = 'pitch_on'
                this.isCardContent = false
                this.isClient = false
                this.isFooter = true
                this.$emit('clientFooterDataL')
            }
            
        }

      },
      perSelectTwo(isme,ismeTwo) {
          this.isSms = ismeTwo
        //   console.log('=====================')
           if (isme){
            //   alert(111)
              this.$refs.perNew.style.left = '50%'
              this.isShowSelect = true
              this.modelListData(2)
            //   this.isSms = ismeTwo
          }else{
              this.$refs.perNew.style.left = '0%'
              this.isShowSelect = false
              this.modelListData(1)
            //   this.isSms = false
              }
      },
      perSelect() {
         if(this.isSms) {
             return false
         }
        //  console.log('=====================')
        //   console.log(this.$refs.perNew.style.left)
        //   this.pitchDataNo = index
        //   this.isShowSelect = !this.isShowSelect
          if (this.$refs.perNew.style.left == '50%'){
              this.isShowSelect = false
              this.modelListData(1)
            //   console.log(this.$refs.perNew)
              this.$refs.perNew.style.left = '0%'
          }else {
              this.isShowSelect = true
              this.modelListData(2)
              this.$refs.perNew.style.left = '50%'
          }
          
        //   this.$refs.perBoxSelect.children.removeClass('pitch_on')
      },
      //微信预览
      WechatPreview() {
          if(this.selectableListData[this.listOneNo].temlist[this.listTwoNo].isCardSelect == false){
              return false
          }
          let listNoThree = this.selectableListData[this.listOneNo].temlist[this.listTwoNo]
          if(this.selectableListData[this.listOneNo].temlist[this.listTwoNo].isCardSelect){
            this.$emit('openContent', listNoThree)
          }
          
      },
      //短信预览
      NotePreview() {
        //   if(this.selectableListData[this.listOneNo].temlist[this.listTwoNo].isCardSelect = false){
        //       return false
        //   }
          let listNoThree = this.selectableListData[this.listOneNo].temlist[this.listTwoNo]
          if(this.selectableListData[this.listOneNo].temlist[this.listTwoNo].isCardSelect){
            this.$emit('openContentNote', listNoThree)
          }
          
      },
      //sendWechatData微信发送
      sendWechat() {
          let listNoThree = this.selectableListData[this.listOneNo].temlist[this.listTwoNo]
          if(this.selectableListData[this.listOneNo].temlist[this.listTwoNo].isCardSelect){
            this.$emit('sendWechatData', listNoThree)
          }
      },
      //短信发送
      sendNote() {
          let listNoThree = this.selectableListData[this.listOneNo].temlist[this.listTwoNo]
          if(this.selectableListData[this.listOneNo].temlist[this.listTwoNo].isCardSelect){
            this.$emit('sendNoteData', listNoThree)
            // console.log(sendNoteData);
          }
      },
      //民片选择
      selectCard(index) {
          this.listTwoNo = index
          for (let i = 0; i < this.selectableListData.length; i ++){
            //   console.log(this.selectableListData[i].temlist.length)
              for (let j = 0;j < this.selectableListData[i].temlist.length;j ++){
                  this.selectableListData[i].temlist[j].isCardSelect = false
              }
          }
          
          this.selectableListData[this.listOneNo].temlist[this.listTwoNo].isCardSelect = true
        //   alert(this.selectableListData[this.listOneNo].temlist[this.listTwoNo].isCardSelect)
        // this.selectableListData[this.listOneNo].pitchOn = 'pitch_on_li'
        // this.selectableListData[this.listOneNo].isShowContent = true
        this.Designate(this.listOneNo)
      }
  }
}
</script>

<style lang="scss" scoped>
#personal{
    width: 310px;
    height: 818px;
    .per_title{
        width: 310px;
        box-sizing: border-box;
        height: 45px;
        display: flex;
        // padding-bottom: 20px;
        // background: #5fb2ec;
        li{
            width: 33.3%;
            text-align: center;
            color: #8e9094;
            line-height: 45px;
            border-right: 1px solid #d5d5d5;
            box-sizing: border-box;
            background: linear-gradient(#fdfdfd, #ebebeb);
            cursor: pointer;
        }
        li:last-child{
            border-right: none;
        }
        li.pitch_on{
            color: #fff;
            background: linear-gradient(#abdbfa, #5fb2ec);
        }
    }
    .per_box{
        width: 310px;
        height: 753px;
        .per_box_select{
            width: 100%;
            height: 50px;
            cursor: pointer;
            color: #767676;
            background: #eae2d2;
            overflow: hidden;
            // padding-top: 5px;
            .per_new_content{
                background: linear-gradient(#3c8338, #8bd389);
                width: 65%;
                margin: 7px auto;
                border-radius: 5px;
                box-shadow: 0px 0px 5px #111;
                position: relative;
                height: 37px;
                .per_new_bg{
                    position: absolute;
                    width: 50%;
                    height: 37px;
                    border-radius: 5px;
                    left: 0%;
                    top: 0;
                    background: linear-gradient(#fafafa, #939393);
                    border: 1px solid #2f2f2f;
                    box-sizing: border-box;
                    transition: all 0.3s;
                    z-index: 9;
                }
                .per_new_two_bg{
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                    
                }
            }
            p{
                // line-height: 44px;
                width: 50%;
                text-align: center;
                
                // padding-top: 10px;
                // border-radius: 40px 40px 0 0;
                // color: #fff;
                // background: #c5c4c4;
                span{
                    display: block;
                    line-height: 40px;
                    text-align: center;
                    // border-radius: 40px 40px 0 0;
                    color: #767676;
                    // background: #c5c4c4;
                    height: 37px;
                }
            }
            p.pitch_on{
                // cursor: not-allowed;
                // color: #000;
                // background: -webkit-gradient(linear, left top, left bottom, from(#abdbfa), to(#5fb2ec));
                // background: linear-gradient(#abdbfa, #5fb2ec);
                // background: #fff;
                padding-top: 0px;
                span{
                    color: #fff;
                    transition: all 0.3s;
                    // background: #fff;
                    // line-height: 40px;
                }
            }
        }
    }
    .per_content_one {
        width: 310px;
        height: 550px;
        li{
            width: 310px;
            cursor: pointer;
            .pitch_on_data{
                height: 245px;
                overflow-y: auto;
                padding: 12px;
                box-sizing: border-box;
                border-bottom: 1px solid #e1e5e7;
                .myCard{
                    color: #509ee2;
                    font-size: 18px;
                }
                .my_card_list{
                    li{
                        width: 100%;
                        display: flex;
                        line-height: 40px;
                        height: 40px;
                        justify-content: space-around;
                        border-bottom: 1px solid #e1e5e7;
                        position: relative;
                        // .my_card_list_img{
                        //     width: 20%;
                        //     div{
                        //         width: 46px;
                        //         border-radius: 46px;
                        //         overflow: hidden;
                        //         img{
                        //             width: 46px;
                        //             display: block;
                        //         }
                        //     }
                        // }
                        .my_card_list_img{
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            z-index: 9;
                            left: 0;
                            top: 0;
                        }
                        p{
                            width: 85%;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .card_checkbox{
                            width: 10%;
                        }
                    }
                    li.margin_20{
                        margin: 20px 0;
                    }
                }
            }
        }
        .pitch_title{
            height: 55px;
            line-height: 55px;
            padding: 0 25px 0 15px;
            font-size: 18px;
            background: #fff;
            border-bottom: 1px solid #e1e5e7;
            display: flex;
            box-sizing: border-box;
            p{
                display: block;
                width: 70%;
            }
            div{
                width: 40px;
                text-align: center;
                font-size: 22px;
                height: 55px;
                overflow: hidden;
            }
            i{
                font-size: 22px;
                width: 40px;
                text-align: center;
                color: #c5cdd1;
            }
            // i:first-child{
            //     color: #c5cdd1;
            // }
            
        }
        li.pitch_on_li{
            .pitch_title{
                color: #ffffff;
                font-size: 18px;
                background: linear-gradient(#abdbfa, #5fb2ec);
                border-bottom: 1px solid #5fb2ec;
                i{
                    color: #ffffff;
                }
                .icon_two:last-child{
                    transform: rotate(180deg);
                }
            }
        }
    }
    .send_btn{
        text-align: center;
        padding: 40px 0 0 0;
        width: 310px;
        height: 203px;
        box-sizing: border-box;
        >div{
            margin-bottom: 15px;
            button{
                padding: 12px 30px;
            }
        }
        .btn_style{
            width: 130px;
            padding: 12px;
        }
    }
    .client_perview_two{
        width: 310px;
        height: 753px;
    }
    .client_data{
        padding: 25px 10px 0px;
        box-sizing: border-box;
        .client_data_title{
            font-size: 18px;
            color: #509ee2;
            height: 25px;
        }
        .client_data_content{
            display: flex;
            margin-top: 20px;
            height: 80px;
            position: relative;
            .client_data_content_img{
                img{
                    width: 73px;
                    height: 73px;
                    display: block;
                }
            }
            .client_data_content_message{
                margin: 0 0 0 10px;
                
                p{
                    height: 36px;
                    line-height: 36px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 207px;
                }
            }
            .client_data_content_sex{
                // padding-top: 7px;
                // height: 80px;
                // overflow: hidden;
                // box-sizing: border-box;
                // position: absolute;
                // right: 5px;
                // top: 0px;
                margin-inline-start: 8px;
                i{
                    font-size: 20px;
                    color: rgb(59, 153, 252)
                }
            }
        }
        .client_data_list{
            margin-top: 10px;
            height: 510px;
            overflow-y: auto;
        }
        .tips_content{
            margin: 5px;
            font-size: 16px;
            padding: 0 16px;
            background: #fff;
            color: #67c23a;
            display: inline-block;
            line-height: 30px;
            box-sizing: border-box;
            border: 1px solid rgba(64,158,255,.2);
            border-color: #67c23a;
            border-radius: 4px;
        }
    }
    .footer_content_box{
        height: 740px;
        overflow-y: auto;
    }
    .footer_content{
        padding: 15px 20px;
        display: flex;
        box-sizing: border-box;
        
        .footer_left{
            width: 8px;
            background: #b9bab9;
            border-radius: 8px;
        } 
        .footer_right{
            width: 95%;
            max-width: 300px;
            padding: 8px 0px 8px 20px;
            box-sizing: border-box;
            li{
                position: relative;
                margin-bottom: 20px;
                .icon_yuan{
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    background: #fff;
                    border: 8px solid #8e908e;
                    left: -37px;
                    top: 0px;
                    box-sizing: border-box;
                    border-radius: 25px;
                }
                .footer_time{
                    color: #888888;
                    height: 18px;
                }
                .footer_icon{
                    margin: 8px 0;
                    color: #888888;
                    height: 25px;
                    i{
                        font-size: 22px;
                    }
                }
                .footer_list_content{
                    position: relative;
                    padding: 15px;
                    background: #fff;
                    line-height: 18px;
                    border: 1px solid #dededd;
                    border-radius: 7px;
                    p:last-child{
                        margin-top: 5px;
                        a{
                            color: #4796e7;
                            text-decoration: none;
                        }
                    }
                    .footer_sanj{
                        position: absolute;
                        width: 15px;
                        height: 15px;
                        border-left: 1px solid #dededd; 
                        border-bottom: 1px solid #dededd; 
                        background: #fff;
                        transform: rotate(45deg);
                        left: -8.25px;
                        top: 11px;
                    }
                }
            }
            li.footer_one{
                .icon_yuan{
                    border-color: #129611;
                }
                .footer_icon{
                    i{
                        color: #129611;
                    }
                }
            }
        }
    }
    // .per-new-fade-enter-active, .per-new-fadeleave-active {
    //     transition: transform .3s ease;
    // }
    // .per-new-fade-enter, .per-new-fade-leave-to
    // /* .component-fade-leave-active for below version 2.1.8 */ {
    //     transform: translateX(1rem);
    // }
}
</style>


