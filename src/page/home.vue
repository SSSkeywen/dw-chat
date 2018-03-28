<template>
  <section class="chat_box">
    <div class="qiantao">
  <iframe :src="iframeNameData" frameborder="0" ref="iframeName"></iframe>
    </div>
    <div class="chat_list">
      <div class="chat_list_one" v-show="ischatListShow">
        <div class="chat_select">
          <ul>
            <li>
              <el-input v-model="clientName" placeholder="输入客户姓名"></el-input>
            </li>
            <li>
              <!-- <el-input type="search" v-model="phoneNO" placeholder="请输入内容" :maxlength="3" @keyup="isNumberPd()"></el-input> -->
              <!-- <el-input type="text" v-model="phoneNO" placeholder="输入客户手机号最后三位" :maxlength="3" @keyup="isNumberPd()"></el-input> -->
              <input class="input_text" type="text" v-model="phoneNO" placeholder="输入客户手机号最后三位" :maxlength="3" @keyup="isNumberPd(phoneNO)" />
            </li>
            <li>
              <el-select v-model="selectData" placeholder="请选择">
                <el-option
                  v-for="item in selectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="primary" @click="selectClientName" :disabled="isSelectName">查询</el-button>
            </li>
          </ul>
        </div>
        <ul class="clientList">
          <li v-for="(item, index) in clientListData" :key="index" :class="item.className" @click="selectChat(index)">
            <div class="client_data_no" v-if="item.UNREADSUM != '0'">
              <span>{{ item.UNREADSUM }}</span>
            </div>
            <div class="clientList_content">
              <div class="portrait_img">
                <div  v-if="item.NICKNAME == '我自己'">
                  <img src="../../static/images/headPortrait.jpg" alt="" v-if="isMeImgPt">
                  <img :src="'/tpdwt_web/chat/getFile.html?filePath='+item.HEADERIMG" alt="" v-else>  
                </div>
                <div v-else>
                  <img :src="'/tpdwt_web/chat/getFile.html?filePath='+item.HEADERIMG" alt="">
                </div>
                
              </div>
              <div class="clientContent">
                <p>{{ item.NICKNAME }}</p>
                <p class="clientContentTwo">{{ item.MSGCONTENT }}</p>
                <p class="client_time">{{ item.SENDTIME}}</p>
              </div>
            </div>
            <div  class="clientContent_img" v-if="item.NICKNAME != '我自己'">
              <img src="../../static/images/bank_icon.png"  @click="returnBtn(index)" alt="">
            </div>
            
          </li>
        </ul>
      </div>
    </div>
    <div class="chat_content">
      <hgroup class="chat_hgroup">
        <div class="chat_message_staff">
          <div class="chat_message_left">
            <el-button @click="isChatList"><span class="chat_list_left" v-if="isChatListleft">&gt;&gt;</span><span class="chat_list_left" v-else>&lt;&lt;</span> 客户列表</el-button>
          </div>
          <div class="chat_message_rihgt">
            <!-- / <p @click="bindingOperation">{{ tsrnoBadingData}}</p> -->
            <p @click="bindingOperationOne"> {{ tsrnoBadingData}}</p>
           <!-- / <p  @click="returnBtn(1)"> {{ tsrnoBadingData}}</p> -->
             
             
            <div @click="newPoto">
              <img src="../../static/images/headPortrait.jpg" alt="" v-if="isMeImgPt">
              <img :src="'/tpdwt_web/chat/getFile.html?filePath='+accessphotourl" alt="" v-else>
            </div>
            <p @click="cardRedact()">编辑名片>></p>
          </div>
        </div>
      </hgroup>
      <div class="chat_content_dwon">
        <div class="chat_interface">
          <div>
            <div class="chat_window_title">
              <p class="chat_window_name">{{ clientNameNow }}</p>
              <div class="chat_window_close">
                <div><img src="../../static/images/close_icon.png" alt=""></div>
                <p @click="closeConversation()">结束会话</p>
              </div>
            </div>
            <div class="chat_message_list" ref="chat_window_box" @scroll="getMore">
              <ul ref="chat_window_down">
                <li v-for="(item, index) in mesageList" :key="index">
                  <div class="chat_message_text" v-if="!item.isMe">
                    <p class="chai_time">{{ item.CreateTime }}</p>
                    <div class="chat_images">
                      <img :src="'/tpdwt_web/chat/getFile.html?filePath='+item.IMGURLNOW" alt="">
                    </div>
                    <div class="text_content_box">
                      <div class="chai_text_data" v-if="item.msgMold=='2'">
                        <div class="imgContent">
                          <span style="color:#dbec28;">{{ item.Content }}</span>
                          <!-- <span>{{ item.Content }}</span> -->
                          <!-- <img :src="" alt=""> -->
                        </div>
                        
                      </div>
                      <div class="chai_text_data" v-else>
                        <div class="imgContent">
                          <img v-if="item.MsgType=='2'" :src="'/tpdwt_web/chat/getFile.html?filePath='+item.localPicUrl" alt="" @click="imgbig(item.localPicUrl)">
                          <div v-else-if="item.MsgType=='5'">
                            <!-- <span>yinyue</span> -->
                            <audio :src="item.localPicUrl" :autoplay="isPlayiing" ref="palyMuisc" controls  class="audio_music">
                            </audio>
                          </div>
                          <span v-else>{{ item.Content }}</span>
                          <!-- <span>{{ item.Content }}</span> -->
                          <!-- <img :src="" alt=""> -->
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div class="chai_me_text" v-else>
                    <p class="chai_time">{{ item.CreateTime }}</p>
                    <div class="chai_me_text_data">
                      <div class="send_sb" v-if="item.sendStatus == '-1'">
                        <div @click="nothingMessage(index)">!</div>
                      </div>
                      <div class="send_sb"  v-if="item.sendStatus == '0'">
                        <!-- <div @click="nothingMessage(index)">!</div> -->
                        <img src="../../static/images/loading.png" alt="">
                      </div>
                      <div v-if="true" class="text_content_box">
                        <div class="chai_text_data_me">
                          <div v-if="item.MsgType=='3'">
                            <div class="myCardStyle">
                              <div class="myCardStyleTop">
                                <div class="myCardStyleTopOne" v-if="item.imgurl!='null'&&item.imgurl!=''&&item.imgurl!='undefined'&&item.imgurl">
                                  <!-- <div v-if="item.imgurl!='null'&&item.imgurl!=''&&item.imgurl!='undefined'"> -->
                                    <img :src="'/tpdwt_web/tm/getFile.html?filePath='+item.imgurl" alt="">
                                  <!-- </div> -->
                                  
                                </div>
                                <div class="myCardStyleTopTwo">
                                  <p>{{ item.mainTitle }}</p>
                                  <p>{{ item.subTitle }}</p>
                                </div>
                              </div>
                              <div class="myCardStyleDwon">{{ item.moduleName }}</div>
                            </div>
                          </div>
                          <!-- <div v-else-if="item.MsgType=='1'">
                            <div class="myCardStyle">
                              <div class="myCardStyleTop"> -->
                                <!-- <div class="myCardStyleTopOne" v-if="item.MsgType=='1'"> -->
                                  <!-- <div v-if="item.imgurl!='null'&&item.imgurl!=''&&item.imgurl!='undefined'"> -->
                                    <!-- <img :src="item.imgurl" alt=""> -->
                                  <!-- </div> -->
                                  
                                <!-- </div> -->
                                <!-- <div class="myCardStyleTopTwo">
                                  <p>{{ item.mainTitle }}</p>
                                  <p>{{ item.subTitle }}</p>
                                </div>
                              </div>
                              <div class="myCardStyleDwon">{{ item.moduleName }}</div>
                            </div>
                          </div> -->
                          <div v-else>
                            <span>{{ item.Content }}</span>
                            <!-- <textarea disabled placeholder="请输入内容(Ctrl＋Enter为换行)" v-model="item.Content" @keydown="sendKeydown" type="textarea" autocomplete="off" validateevent="true" class="el-textarea__inner" style="height: auto!important;width: auto!important;background: transparent;border: none;"></textarea> -->
                          </div>
                        </div>
                      </div>
                      <div class="chat_images">
                        <img :src="'/tpdwt_web/chat/getFile.html?filePath='+accessphotourl" alt="">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="chat_input">
              <div v-if="isCloseConversation" class="chat_star">
                <el-button type="success" @click="openConversationTwo()" :disabled="isDisabelStar">开始会话</el-button>
              </div>
              <div v-else class="chat_input_box">
                <!-- <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="chat_textarea"
                  @keyup.enter.native="sendKeydown"
                  >
                </el-input> -->
                <div class="el-textarea">
                  <textarea placeholder="请输入内容(Ctrl＋Enter为换行)" v-model="chat_textarea" @keydown="sendKeydown" type="textarea" rows="5" autocomplete="off" validateevent="true" class="el-textarea__inner" style="min-height: 34px;"></textarea>
                </div>
                <el-button type="success" @click="sendOperation()" :disabled="isSengContent">发送↵</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="chat_message">
          <Personal @clientFooterDataL="clientFooterDataL" @clientPortrayalData="clientPortrayalData" :isPhoneDisabel="isPhoneDisabel" :isDisabel="isDisabel" @sendNoteData="sendNoteData" @sendWechatData="sendWechatData" @openContent="openContentC" @openContentNote="openContentNote" :clientPortrayalDataList="clientPortrayalDataList" :clientFooterData="clientFooterData" :isJudge="isJudge" ref="personalOn" :clientPortrayalNo="clientPortrayalNo"></Personal> 
        </div>
      </div>
    </div>
    <div v-if="isbigImg" class="big_img_style" @click="closeBigImg">
      <img :src="bigImgData" alt="">
    </div>
    <div class="supernatant_bg" v-if="idSupernatant">
      <MyCard v-if="isMyCard" @fetch="closeOperation" :cardDataList="cardDataList"></MyCard>
      <Preview v-if="isPreview" @fetch="closeOperation" @sendNoteData="sendNoteData" @sendWechatData="sendWechatData" :PreviewData="PreviewData" :PreviewTitleName="PreviewTitleName" :previewDisabel="previewDisabel"></Preview>
      <Binding v-if="isBinding" @fetch="closeOperation" :qrcodeLogionData="qrcodeLogionData" @baindingOver="baindingOver" ref="bindingFn"></Binding>
      <comeToNothing v-if="isComeToNothing" @fetch="closeOperation" @nothingFn="nothingFn" :comeToNothingData="comeToNothingData"></comeToNothing>
    </div>
  </section>
</template>

<script>
import promise from "es6-promise";
promise.polyfill();
import axios from "axios";
import Personal from "../components/personalInformation";
import MyCard from "../components/myCard";
import Preview from "../components/preview";
import Binding from "../components/binding";
import comeToNothing from "../components/comeToNothing";
import * as types from "../store/types.js";
import { mapActions } from "vuex";

export default {
  components: {
    Personal,
    MyCard,
    Preview,
    Binding,
    comeToNothing
  },
  data() {
    return {
      isbigImg: false, //图片放大蒙版是否显示
      bigImgData: "", //大图路径
      isMeImgPt: "",
      tenData: "",
      contentText: false,
      getmessagelist: "",
      isSelectName: "", //查询按钮
      isJudge: "",
      accessphotourl: "", //
      messageNoList: "",
      iframeNameData: "",
      isPlayiing: false,
      midId: "",
      nowChatFlag: "",
      starNum: "",
      starToken: "",
      isDisabelStar: "",
      qrcodeLogionData: "",
      imgurlNow: "",
      messageTypeData: "text",
      send_error: false,
      isDisabel: true, //判断开始绘画按钮
      tsrnoBadingData: "工号已经绑定",
      isPhoneDisabel: true,
      previewDisabel: false,
      nowOpenIdData: "", //当前OPenId
      nowPhoneNo: "", //当前手机号码
      NotePreviewData: "",
      WechatPreviewData: "",
      PreviewData: "",
      PreviewTitleName: "",
      cardDataList: "", //名片内容
      selectIndex: "",
      chatFlag: "", //轮训
      userTsrL: "",
      comeToNothingData: "",
      isCloseConversation: true,
      clientName: "", //客户姓名
      clientNameNow: "我自己", //当前聊天客户姓名
      phoneNO: "", //手机号码
      isMyCard: false, //名片编辑
      isPreview: false, //预览
      isComeToNothing: false, //离线消息
      chat_textarea: "",
      idSupernatant: false, //浮层显示是否
      ischatListShow: true, //列表是否显示
      isChatListleft: true,
      isSengContent: false, //发送按钮
      isBinding: false, //绑定页面
      clientPortrayalDataList: "", //画像
      clientPortrayalNo: "", //个数
      clientFooterData: "", //足迹
      selectList: [
        {
          value: "",
          label: "不限"
        },
        {
          value: "2",
          label: "有微信互动"
        },
        {
          value: "1",
          label: "有短信互动"
        }
      ],
      selectData: "",
      clientListData: [],
      mesageList: [
        {
          messageTiem: "",
          isMe: true,
          clientImg: "",
          Content: ""
        }
      ]
    };
  },
  created() {
    this.starNum = this.$utils.getUrlKey("content");
    // console.log(this.starNum)
    // this.starToken = this.$utils.getUrlKey('token');
  },
  mounted() {
    // 获取员工信息
    this.openWindow();
    this.goOnFnTwo();
    this.bottomshow();
    this.judge();
    this.selsectWindow();
  },
  methods: {
    ...mapActions({
      clientList: types.CLIENT_LIST,
      clientListGain: types.CLIENT_LIST_GAIN,
      clientListEecord: types.CLIENT_LIST_RECORD,
      sendMessageData: types.SEND_MESSAGE,
      clientPortrayal: types.CLIENT_PORTRAYAL,
      clientFooter: types.CLIENT_FOOTER,
      clientCompile: types.CLIENT_COMPILE,
      qrcodeLogion: types.QRCODELOGION,
      modelList: types.MODELLIST,
      showtmList: types.SHOWTM,
      tempWechat: types.TEMPWECHAT,
      tempSms: types.TEMPSMS,
      updataChat: types.UPDATACHAT,
      toLogionCkeck: types.TO_LOGION_CKECK,
      messageLx: types.MESSAGE_LX,
      nothingMessageFn: types.NOTHINGMESSAGE,
      returnDxFn: types.RETURNDX,
      returnDxFn1: types.TSRUNBIND,
      getMoreMess: types.GET_MORE_MESS,
      upSataStatus: types.UPDATACHATSTATUS,
      getTsrHeadFn: types.GETTSRHEAD,
    }),
    //点击更新头像的方法
    newPoto(){
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      let getTsrHeadData = new FormData();
      getTsrHeadData.append("tsrno", userTsrL.TSR_SESSION.tsrno);
      this.getTsrHeadFn({
        getTsrHeadData,
        successCallback: () => {
          location.reload()
        },
        failCallback: () => {}
      })
    },
    //切换页面函数
    selsectWindow() {
      // window.blur(function(){
      //   this.selectChat(0);
      // })
      // window.onblur = function() {
      //   // 切换出页面执行事件
      //   console.log(this.selectIndex);
      //   this.selectChat(0);
      // };
      var newMun;
      window.onblur = () => {
        console.log("失去焦点");

        newMun = this.selectIndex;
        this.selectChat(0);
        console.log(this.selectIndex);
      };
      window.onfocus = () => {
        console.log("进入页面");
        console.log(newMun);
        this.selectChat(newMun);
      };
      // window.onfocus = function() {
      //   // 切换出页面执行事件
      //   console.log("进入页面");
      //   // this.selectChat(0);
      // };
    },
    //轮训函数
    goOnFnTwo() {
      setTimeout(() => {
        // this.goOnFn()
        this.selectClientNameDataTwo();
      }, 5000);
    },
    goOnFn() {
      let clientMessageData = {};
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      let messageNoData = new FormData();
      messageNoData.append("tsrno", userTsrL.TSR_SESSION.tsrno);
      messageNoData.append("openId", this.nowOpenIdData);
      this.messageLx({
        messageNoData,
        successCallback: () => {
          // this.clientListData[0].arrNumber = '0'
          // console.log(this.$store.getters.messageNoDataList)
          for (let i = 0; i < this.clientListData.length; i++) {
            // this.clientListData[0].arrNumber = '9999-99-99 99:99:99'
            // console.log(this.clientListData[0])

            for (
              let j = 0;
              j < this.$store.getters.messageNoDataList.length;
              j++
            ) {
              if (
                this.clientListData[i].OPENID ==
                this.$store.getters.messageNoDataList[j].MSGFROM
              ) {
                this.clientListData[
                  i
                ].UNREADSUM = this.$store.getters.messageNoDataList[
                  j
                ].UNREADSUM;
                this.clientListData[
                  i
                ].MSGCONTENT = this.$store.getters.messageNoDataList[
                  j
                ].MSGCONTENT;
                this.clientListData[
                  i
                ].SENDTIME = this.$store.getters.messageNoDataList[j].SENDTIME;
              }
            }
            // console.log(this.clientListData[i].SENDTIME)
            if (
              this.clientListData[i].SENDTIME != "" &&
              this.clientListData[i].SENDTIME != undefined &&
              this.clientListData[i].SENDTIME != null
            ) {
              let arrNumberData = this.clientListData[i].SENDTIME.split(
                " "
              )[1].split(":");
              let arrNumberDataTwo = this.clientListData[i].SENDTIME.split(
                " "
              )[0].split("-");
              // console.log(arrNumberData[0] + '-' + arrNumberData[1] + '-' + arrNumberData[2] + '-' + arrNumberDataTwo[2])
              this.clientListData[i].arrNumber =
                arrNumberDataTwo[0] * 12 * 30 * 24 * 3600 +
                arrNumberDataTwo[1] * 30 * 24 * 3600 +
                arrNumberDataTwo[2] * 24 * 3600 +
                arrNumberData[0] * 3600 +
                arrNumberData[1] * 60 +
                arrNumberData[2];
              //  console.log(this.clientListData[i].SENDTIME)
              //  console.log(arrNumberDataTwo[0])
              // this.clientListData[0].arrNumber = '999999999999999999999'
              if (this.clientListData[i].NICKNAME === "我自己") {
                this.clientListData[i].arrNumber = "999999999999999999999";
              }
            }
          }
          this.clientListData.sort((a, b) => {
            if (a.arrNumber < b.arrNumber) {
              return 1;
            } else if (a.arrNumber > b.arrNumber) {
              return -1;
            }
            return 0;
          });
          // setTimeout(()=>{
          //   this.goOnFn()
          //   this.selectClientNameDataTwo()
          // },3000)
        },
        failCallback: () => {}
      });
    },
    //图片放大函数
    imgbig(imgruldata) {
      // alert(imgruldata);
      this.isbigImg = true;
      this.bigImgData = "/tpdwt_web/chat/getFile.html?filePath=" + imgruldata;
    },
    //关闭图片放大
    closeBigImg() {
      this.isbigImg = false;
    },
    selectClientNameDataTwo() {
      let clientMessageData = {};
      this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      if (this.userTsrL.fromType == 1) {
        clientMessageData = {
          tsrno: this.userTsrL.TSR_SESSION.tsrno,
          fromType: this.userTsrL.fromType,
          mobile: this.userTsrL.userInfo.mobile,
          userName: this.userTsrL.userInfo.userName,
          realname: this.userTsrL.userInfo.realname
        };
      }
      if (this.userTsrL.fromType == 2) {
        clientMessageData = {
          tsrno: this.userTsrL.TSR_SESSION.tsrno,
          fromType: this.userTsrL.fromType
        };
      }
      clientMessageData = JSON.stringify(clientMessageData);
      let clientMessage = new FormData();
      clientMessage.append("clientmessage", clientMessageData);
      this.clientListGain({
        clientMessage,
        successCallback: () => {
          // console.log(this.$store.getters.myChatData)
          this.clientListData.length = 1;
          // console.log(this.clientListData)
          // if(this.userTsrL.fromType == 2){
          //   // this.selectChat(0)

          //   //当前聊天
          //     this.$store.getters.myChatData.className='examine'
          //     this.clientNameNow = this.$store.getters.myChatData.NICKNAME
          //     this.mesageList = this.$store.getters.chatRecordList

          //     for (let i = 0; i < this.mesageList.length; i ++){
          //       if (this.mesageList[i].ToUserName == this.$store.getters.myChatData.OPENID){
          //         this.mesageList[i].isMe = false
          //       }
          //     }
          //     // this.selectChat(0)
          //   }
          // this.$store.getters.myChatData.HEADERIMG = this.accessphotourl
          // this.clientListData.push(this.$store.getters.myChatData)
          //
          if (this.userTsrL.fromType == 1) {
            if (
              this.$store.getters.nowChat != "" &&
              this.$store.getters.nowChat != undefined
            ) {
              // this.$store.getters.nowChat.className='examine'
              this.clientListData.push(this.$store.getters.nowChat);
              // this.selectChat(1)
              this.mesageList = this.$store.getters.chatRecordList;
            }
          }
          if (
            this.$store.getters.chatData != "" &&
            this.$store.getters.chatData != undefined &&
            this.$store.getters.chatData != null
          ) {
            // console.log(this.$store.getters.chatData)
            for (var i = 0; i < this.$store.getters.chatData.length; i++) {
              this.clientListData.push(this.$store.getters.chatData[i]);
            }
          }
          // console.log(this.nowPhoneNo)
          for (let i = 0; i < this.clientListData.length; i++) {
            // console.log(this.clientListData[i].PHONENO)
            this.clientListData[i].chatFlag = "";
            // if(this.userTsrL.fromType == 1){
            if (
              this.clientListData[i].OPENID == this.nowOpenIdData &&
              this.clientListData[i].PHONENO == this.nowPhoneNo
            ) {
              this.clientListData[i].className = "examine";
              this.clientListData[i].chatFlag = "start";
              // console.log(i +'+'+this.clientListData[i].OPENID +'+'+ this.nowPhoneNo)
              // console.log(this.clientListData[i])
              // this.selectChat(i)
              // this.clientNameNow = this.clientListData[i].NICKNAME
              // this.mesageList = this.$store.getters.chatRecordList
              // for (let i = 0; i < this.mesageList.length; i ++){
              //   if (this.mesageList[i].ToUserName == this.userTsrL.userInfo.openid){
              //     this.mesageList[i].isMe = true
              //   }
              // }
            }
            // this.ischatListShow = false
            // this.isChatListleft = false
            // }
          }
          // console.log(this.clientListData)
          // if(this.userTsrL.fromType == 2){
          //     this.selectChat(0)
          //   }
        },
        failCallback: () => {}
      });
      setTimeout(() => {
        // this.goOnFn()
        this.selectClientNameDataTwo();
      }, 30000);
    },
    //判定
    judge() {
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      // console.log(userTsrL.TSR_SESSION.tsrposition)
      if (
        userTsrL.TSR_SESSION.tsrposition == "TSR" ||
        userTsrL.TSR_SESSION.tsrposition == "CSR" ||
        userTsrL.TSR_SESSION.tsrposition == "CSL"
      ) {
        this.isDisabelStar = false;
        this.isSelectName = false;
      } else {
        this.isSelectName = true;
      }
      if (
        userTsrL.TSR_SESSION.tsrposition == "TSR" ||
        userTsrL.TSR_SESSION.tsrposition == "CSR" ||
        userTsrL.TSR_SESSION.tsrposition == "TL" ||
        userTsrL.TSR_SESSION.tsrposition == "CSL"
      ) {
        this.isJudge = true;
        this.isDisabelStar = false;
      } else {
        this.isJudge = false;
      }
    },
    //开始会话
    openConversationTwo() {
      this.chat_textarea = "";
      this.isCloseConversation = false;
      // this.openConversation()
      let unDataChat = new FormData();
      unDataChat.append("fromUserName", this.userTsrL.TSR_SESSION.tsrno);
      unDataChat.append("toUserName", this.nowOpenIdData);
      unDataChat.append("chatStatusFlag", "1");
      this.upSataStatus({
        unDataChat,
        successCallback: () => {
          // this.get_message_reply('/tpdwt_web/chat/getMessage.html', this.nowOpenIdData, this.userTsrL.TSR_SESSION.tsrno, '1', '');
        },
        failCallback: () => {}
      });
    },
    openConversation() {
      this.chat_textarea = "";
      // this.isCloseConversation = false
      let unDataChat = new FormData();
      unDataChat.append("fromUserName", this.userTsrL.TSR_SESSION.tsrno);
      unDataChat.append("toUserName", this.nowOpenIdData);
      unDataChat.append("chatStatusFlag", "1");
      // console.log(this.userTsrL.TSR_SESSION.tsrno+'-'+this.nowOpenIdData)
      this.updataChat({
        unDataChat,
        successCallback: result => {
          if (result == "1") {
            this.isCloseConversation = false;
          }
          // alert(11)
          //  clearTimeout(() => {
          //   this.getmessagelist
          // })
          // console.log(this.nowOpenIdData +'+'+this.userTsrL.TSR_SESSION.tsrno)
          this.get_message_reply(
            "/tpdwt_web/chat/getMessage1.html",
            this.nowOpenIdData,
            this.userTsrL.TSR_SESSION.tsrno
          );
          // this.get_message_reply('/tpdwt_web/chat/getMessage.html', this.nowOpenIdData, this.userTsrL.TSR_SESSION.tsrno, '1', '');
        },
        failCallback: () => {}
      });
    },
    closeConversation() {
      this.chat_textarea = "";
      if (this.isCloseConversation) {
        return false;
      }
      // alert(11)
      this.isCloseConversation = true;
      let unDataChat = new FormData();
      unDataChat.append("fromUserName", this.userTsrL.TSR_SESSION.tsrno);
      unDataChat.append("toUserName", this.nowOpenIdData);
      unDataChat.append("chatStatusFlag", "0");
      this.upSataStatus({
        unDataChat,
        successCallback: () => {},
        failCallback: () => {}
      });
    },
    //打开页面调取内容
    openWindow() {
      let starNumDat = this.starNum;
      var starNumData = new FormData();
      starNumData.append("params", starNumDat);
      this.clientList({
        starNumData,
        successCallback: () => {
          let userTsr = JSON.parse(window.localStorage.getItem("userTsr"));
          if (
            userTsr.TSR_SESSION.tsrOpenid == "" ||
            userTsr.TSR_SESSION.tsrOpenid == undefined ||
            userTsr.TSR_SESSION.tsrOpenid == null
          ) {
            this.tsrnoBadingData = "绑定工号";
          }
          this.accessphotourl = userTsr.TSR_SESSION.accessphotourl;
          // console.log(userTsr.TSR_SESSION.f_photourl_is_default)
          if (userTsr.TSR_SESSION.f_photourl_is_default == "0") {
            this.isMeImgPt = true;
          } else {
            this.isMeImgPt = false;
          }
          // this.tsrCardMessage()
          this.selectClientNameData();
        },
        failCallback: () => {}
      });
    },
    //获取名片信息
    // tsrCardMessage() {
    //   let userTsr = JSON.parse(window.localStorage.getItem('userTsr'))
    //   let tsrno = userTsr.TSR_SESSION.tsrno
    //   var tsrcardData = new FormData()
    //       tsrcardData.append('tsrcard', tsrno)
    //       this.clientCompile({
    //         tsrcardData,
    //         successCallback: () => {
    //           this.cardDataList = this.$store.getters.cardData
    //           console.log(this.cardDataList)
    //         },
    //         failCallback: () => {
    //         }
    //       })
    // },
    //选择会话
    selectChat(index) {
      //  if (index == 0){
      //    this.$refs.personalOn.perSelectTwo(true)
      //  }else {
      //    this.$refs.personalOn.perSelectTwo(false)
      //  }
      // console.log(this.clientListData[index])
      let userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));

      this.selectIndex = index;
      for (let i = 0; i < this.clientListData.length; i++) {
        // this.clientListData[i].UNREADSUM = 0
        this.clientListData[i].className = "";
        this.clientListData[i].chatFlag = "end";
      }
      // console.log(this.clientListData)
      this.clientListData[index].UNREADSUM = 0;
      // console.log(this.clientListData[index])
      if (
        this.clientListData[index].OPENID != "" &&
        this.clientListData[index].OPENID != undefined &&
        this.clientListData[index].OPENID != null &&
        (userTsrL.TSR_SESSION.tsrposition == "TSR" ||
          userTsrL.TSR_SESSION.tsrposition == "CSR")
      ) {
        // console.log(this.clientListData[index])
        this.isDisabelStar = false;
        this.isDisabel = false;
        this.previewDisabel = false;
        // this.$refs.personalOn.perSelectTwo(false, false)
      } else {
        this.isDisabelStar = true;
        this.isDisabel = true;
        this.previewDisabel = true;
        // this.$refs.personalOn.perSelectTwo(true, true)
      }
      if (index == "0") {
        // this.$refs.personalOn.perSelectTwo(true, true)
        if (
          this.clientListData[index].OPENID != "" &&
          this.clientListData[index].OPENID != undefined &&
          this.clientListData[index].OPENID != null &&
          (userTsrL.TSR_SESSION.tsrposition == "TSR" ||
            userTsrL.TSR_SESSION.tsrposition == "CSR" ||
            userTsrL.TSR_SESSION.tsrposition == "TL" ||
            userTsrL.TSR_SESSION.tsrposition == "UM")
        ) {
          // console.log(this.clientListData[index])
          this.isDisabelStar = false;
          this.isDisabel = false;
          this.previewDisabel = false;
        } else {
          this.isDisabelStar = true;
          this.isDisabel = true;
          this.previewDisabel = true;
        }
      }
      if (
        this.clientListData[index].PHONENO != "" &&
        this.clientListData[index].PHONENO != undefined &&
        this.clientListData[index].PHONENO != null &&
        (userTsrL.TSR_SESSION.tsrposition == "TSR" ||
          userTsrL.TSR_SESSION.tsrposition == "CSR" ||
          userTsrL.TSR_SESSION.tsrposition == "TL")
      ) {
        // console.log(this.clientListData[index].PHONENO)
        // this.$refs.personalOn.perSelectTwo(false, false)
        this.isPhoneDisabel = false;
        this.previewDisabel = false;
      } else {
        // this.$refs.personalOn.perSelectTwo(false, true)
        // console.log(this.clientListData[index].PHONENO)
        this.isPhoneDisabel = true;
        this.previewDisabel = true;
      }
      if (
        this.clientListData[index].OPENID != "" &&
        this.clientListData[index].OPENID != undefined &&
        this.clientListData[index].OPENID != null
      ) {
        // console.log(this.clientListData[index])
        // this.isDisabelStar = false
        // this.isDisabel = false
        // this.previewDisabel = false
        if (
          this.clientListData[index].PHONENO != "" &&
          this.clientListData[index].PHONENO != undefined &&
          this.clientListData[index].PHONENO != null
        ) {
          this.$refs.personalOn.perSelectTwo(true, false);
        } else {
          this.$refs.personalOn.perSelectTwo(true, true);
        }
      } else {
        if (
          this.clientListData[index].PHONENO != "" &&
          this.clientListData[index].PHONENO != undefined &&
          this.clientListData[index].PHONENO != null
        ) {
          this.$refs.personalOn.perSelectTwo(false, true);
        } else {
          this.$refs.personalOn.perSelectTwo(true, true);
        }
        // this.isDisabelStar = true
        // this.isDisabel = true
        // this.previewDisabel = true
        // this.$refs.personalOn.perSelectTwo(true, true)
      }
      //发送按钮解冻
      this.isSengContent = false;
      //取当前头像
      this.imgulrNow = this.clientListData[index].HEADERIMG;
      this.chat_textarea = "";
      this.isCloseConversation = true;
      // this.closeConversation()
      this.clientListData[index].chatFlag = "start";
      this.clientListData[index].className = "examine";
      this.clientNameNow = this.clientListData[index].NICKNAME;
      let chatRecordMessageLs = this.clientListData[index].OPENID;
      this.nowOpenIdData = this.clientListData[index].OPENID;
      this.nowPhoneNo = this.clientListData[index].PHONENO;
      // console.log(this.nowPhoneNo)
      this.nowChatFlag = this.clientListData[index].chatFlag;
      var chatRecordMessageL = new FormData();
      chatRecordMessageL.append("openId", chatRecordMessageLs);
      chatRecordMessageL.append("phoneNo", this.nowPhoneNo);
      // this.clientPortrayalData (chatRecordMessageL)
      // this.clientFooterDataL(chatRecordMessageL)

      this.clientListEecord({
        chatRecordMessageL,
        successCallback: () => {
          this.mesageList = this.$store.getters.chatRecordList;
          console.log(this.mesageList);
          if (this.$store.getters.chatRecordList != "0") {
            // alert(11)
            for (let i = 0; i < this.mesageList.length; i++) {
              this.$store.getters.chatRecordList[i].isMe = "";
              this.$store.getters.chatRecordList[i].IMGURLNOW = this.imgulrNow;
              // console.log(this.mesageList[i].FromUserName)
              if (
                this.mesageList[i].ToUserName ==
                this.clientListData[index].OPENID
              ) {
                this.mesageList[i].isMe = true;
              }
              if (
                this.mesageList[i].ToUserName ==
                this.clientListData[index].PHONENO
              ) {
                this.mesageList[i].isMe = true;
              }
            }
          }

          // setInterval(() => {

          // }, 5000)

          this.bottomshow();
        },
        failCallback: () => {}
      });
      this.openConversation();
      // this.clientPortrayalData ()
      // this.clientFooterDataL()
      this.$refs.personalOn.titleOPeration(0);
      // this.$refs.personalOn.clientFooterList()
    },
    get_message_reply(url, reciver_uid, sender_uid) {
      // get_message_reply(url, reciver_uid, sender_uid, request_type, send_data) {
      var getMessageData = new FormData();
      getMessageData.append("reciver_uid", reciver_uid);
      getMessageData.append("sender_uid", sender_uid);
      // getMessageData.append('request_type', request_type)
      // getMessageData.append('send_data', send_data)
      axios({
        method: "post",
        url: url,
        data: getMessageData,
        traditional: true //属性在这里设置
      })
        .then(res => {
          let response = res.data;
          // console.log(response)
          if (response.responseCode == "0") {
            // alert(11)
            // if (response.msg == 'is_read') {
            // console.log(response.msg)
            //将消息写入到消息盒子
            var messages = response.result;
            // console.log(this.nowOpenIdData)
            // console.log(messages)
            // this.chatRecordList.push(messages)
            var id_arr = [];
            if (messages != undefined && messages != "" && messages != null) {
              for (let i = 0; i < messages.length; i++) {
                if (
                  messages[i].FromUserName == this.nowOpenIdData ||
                  messages[i].ToUserName == this.nowOpenIdData ||
                  messages[i].FromUserName == this.nowPhoneNo ||
                  messages[i].ToUserName == this.nowPhoneNo
                ) {
                  id_arr.push(messages[i].id);
                  if (messages[i].FromUserName == "system") {
                    messages[i].isMe = true;
                  }
                  // alert(11)
                  messages[i].IMGURLNOW = this.imgulrNow;
                  console.log(messages[i]);
                  this.mesageList.push(messages[i]);
                } else {
                  // alert(22)
                  return false;
                }
              }
              this.bottomshow();
            }
            // alert(22)
            // console.log(getmessagelist)
            clearTimeout(this.getmessagelist);
            this.getmessagelist = setTimeout(() => {
              // console.log(this.nowOpenIdData +'+'+this.userTsrL.TSR_SESSION.tsrno)
              // alert(11)
              // this.get_message_reply('/tpdwt_web/chat/getMessage.html', reciver_uid, sender_uid, '2', id_arr);
              // getmessagelist
              this.get_message_reply(
                "/tpdwt_web/chat/getMessage1.html",
                this.nowOpenIdData,
                this.userTsrL.TSR_SESSION.tsrno
              );
            }, 3000);
            // console.log(this.getmessagelist)

            // } else if (response.msg == 'is_connecting') {
            // clearTimeout(() => {
            //     this.get_message_reply
            //   })
            //  if(this.nowChatFlag == 'start'){
            //     // setTimeout(() => {
            //       // console.log(22)
            //       this.get_message_reply('/tpdwt_web/chat/getMessage.html', reciver_uid, sender_uid, '1', '');
            //     // },500)
            //   }
            // }
          } else {
            // alert(11)
          }
        })
        .catch(function(err) {
          console.log("消息轮训出错");
          // failCallback()
          // let res = err.response
          // if (err) {
          //     window.alert('api error, HTTP CODE: ' + res)
          // }
        });
    },
    //获取客户画像
    clientPortrayalData() {
      let chatRecordMessageL = new FormData();
      chatRecordMessageL.append("openId", this.nowOpenIdData);
      this.clientPortrayal({
        chatRecordMessageL,
        successCallback: () => {
          this.clientPortrayalDataList = "";
          this.clientPortrayalDataList = this.$store.getters.clientPortrayalData;
          this.clientPortrayalDataList.HEADERIMG = this.imgulrNow;
          this.clientPortrayalDataList.clientPortrayalNo = this.$store.getters.clientPortrayalData.laber.length;
          // console.log(this.clientPortrayalDataList)
        },
        failCallback: () => {
          this.clientPortrayalDataList = "";
          // this.clientPortrayalDataList.HEADERIMG = ''
          // this.clientPortrayalDataList.clientPortrayalNo = ''
        }
      });
    },
    //获取客户足迹
    clientFooterDataL() {
      // console.log(chatRecordMessageL)
      let chatRecordMessageL = new FormData();
      chatRecordMessageL.append("openId", this.nowOpenIdData);
      this.clientFooter({
        chatRecordMessageL,
        successCallback: () => {
          this.clientFooterData = "";
          this.clientFooterData = this.$store.getters.clientFooterData;
          for (let i = 0; i < this.clientFooterData.length; i++) {
            this.clientFooterData[i].addClassNameData = "";
            this.clientFooterData[i].clientOperation = "";
            this.clientFooterData[i].iconContent = "";
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 1) {
              this.clientFooterData[i].clientOperation = "提交";
              this.clientFooterData[i].iconContent = "icon-tijiao";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 2) {
              this.clientFooterData[i].clientOperation = "发消息";
              this.clientFooterData[i].iconContent = "icon-duanxin";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 3) {
              this.clientFooterData[i].clientOperation = "点击";
              this.clientFooterData[i].iconContent = "icon-quxiaoguanzhu";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 4) {
              this.clientFooterData[i].clientOperation = "预约";
              this.clientFooterData[i].iconContent = "icon-shijian";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 5) {
              this.clientFooterData[i].clientOperation = "提取";
              this.clientFooterData[i].iconContent = "icon-tiqujilu";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 6) {
              this.clientFooterData[i].clientOperation = "关注";
              this.clientFooterData[i].iconContent = "icon-guanzhu";
            }
            if (this.clientFooterData[i].FOOTPRINT_TYPE == 7) {
              this.clientFooterData[i].clientOperation = "取关";
              this.clientFooterData[i].iconContent = "icon-quxiaoguanzhu";
            }
            this.clientFooterData[0].addClassNameData = "footer_one";
          }
          // console.log(this.clientFooterData)
        },
        failCallback: () => {
          this.clientFooterData = "";
        }
      });
    },
    //是否显示聊天列表
    isChatList() {
      this.ischatListShow = !this.ischatListShow;
      this.isChatListleft = !this.isChatListleft;
    },
    //查询客户姓名
    selectClientName() {
      var selectDataNm = {
        clientName: this.clientName,
        phoneNO: this.phoneNO,
        selectData: this.selectData,
        tsrno: this.userTsrL.TSR_SESSION.tsrno,
        queryflag: "Y",
        fromType: this.userTsrL.fromType
      };
      selectDataNm = JSON.stringify(selectDataNm);
      let clientMessage = new FormData();
      clientMessage.append("clientmessage", selectDataNm);
      this.clientListGain({
        clientMessage,
        successCallback: () => {
          if (this.userTsrL.fromType == 1) {
            this.clientListData.length = 2;
          } else {
            this.clientListData.length = 1;
          }
          if (this.$store.getters.chatData.length == 0) {
            this.clientListData.push();
          }
          // console.log(this.clientListData)
          // console.log(this.userTsrL.fromType)
          for (var i = 0; i < this.$store.getters.chatData.length; i++) {
            this.clientListData.push(this.$store.getters.chatData[i]);
          }
          // console.log(this.$store.getters.chatData)
        },
        failCallback: () => {}
      });
    },
    //查询函数初始加入
    selectClientNameData() {
      let clientMessageData = {};
      this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      if (this.userTsrL.fromType == 1) {
        clientMessageData = {
          tsrno: this.userTsrL.TSR_SESSION.tsrno,
          fromType: this.userTsrL.fromType,
          mobile: this.userTsrL.userInfo.mobile,
          userName: this.userTsrL.userInfo.userName,
          realname: this.userTsrL.userInfo.realname
        };
      }
      if (this.userTsrL.fromType == 2) {
        clientMessageData = {
          tsrno: this.userTsrL.TSR_SESSION.tsrno,
          fromType: this.userTsrL.fromType
        };
      }
      clientMessageData = JSON.stringify(clientMessageData);
      let clientMessage = new FormData();
      clientMessage.append("clientmessage", clientMessageData);
      this.clientListGain({
        clientMessage,
        successCallback: () => {
          console.log(this.$store.getters.myChatData);
          if (this.userTsrL.fromType == 2) {
            // this.selectChat(0)

            //当前聊天
            this.$store.getters.myChatData.className = "examine";
            this.clientNameNow = this.$store.getters.myChatData.NICKNAME;
            this.mesageList = this.$store.getters.chatRecordList;

            for (let i = 0; i < this.mesageList.length; i++) {
              if (
                this.mesageList[i].ToUserName ==
                this.$store.getters.myChatData.OPENID
              ) {
                this.mesageList[i].isMe = false;
              }
            }
            // this.selectChat(0)
          }
          this.$store.getters.myChatData.HEADERIMG = this.accessphotourl;
          this.clientListData.push(this.$store.getters.myChatData);
          //
          if (this.userTsrL.fromType == 1) {
            if (
              this.$store.getters.nowChat != "" &&
              this.$store.getters.nowChat != undefined
            ) {
              this.$store.getters.nowChat.className = "examine";
              this.clientListData.push(this.$store.getters.nowChat);
              console.log(this.$store.getters.nowChat);
              this.nowPhoneNo = this.$store.getters.nowChat.PHONENO;
              // this.selectChat(1)
              this.mesageList = this.$store.getters.chatRecordList;
            }
          }
          if (
            this.$store.getters.chatData != "" &&
            this.$store.getters.chatData != undefined &&
            this.$store.getters.chatData != null
          ) {
            // console.log(this.$store.getters.chatData)
            for (var i = 0; i < this.$store.getters.chatData.length; i++) {
              this.clientListData.push(this.$store.getters.chatData[i]);
            }
          }
          // console.log(this.userTsrL.userInfo)
          for (let i = 0; i < this.clientListData.length; i++) {
            this.clientListData[i].chatFlag = "";
            if (this.userTsrL.fromType == 1) {
              if (
                this.clientListData[i].OPENID == this.userTsrL.userInfo.openid
              ) {
                this.clientListData[i].className = "examine";
                this.clientListData[i].chatFlag = "start";
                // console.log(i)
                this.selectChat(i);
                this.clientNameNow = this.clientListData[i].NICKNAME;
                this.mesageList = this.$store.getters.chatRecordList;
                for (let i = 0; i < this.mesageList.length; i++) {
                  if (
                    this.mesageList[i].ToUserName ==
                    this.userTsrL.userInfo.openid
                  ) {
                    this.mesageList[i].isMe = true;
                  }
                }
              }
              this.ischatListShow = false;
              this.isChatListleft = false;
            }
          }
          if (this.userTsrL.fromType == 2) {
            this.selectChat(0);
          }
        },
        failCallback: () => {}
      });
    },
    // 赵盼
    bindingOperationOne() {
      // alert(789)
      if (this.tsrnoBadingData == "工号已经绑定") {
        //alert(444)
        if (confirm("确认解除工号绑定吗？")) {
          this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
          let returnDxData2 = new FormData();
          returnDxData2.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
          console.log(this.userTsrL.TSR_SESSION.tsrno);
          // returnDxData.append('phoneno1', this.clientListData[0].PHONENO1)
          this.returnDxFn1({
            returnDxData2,
            successCallback: customerKeyzp => {
              this.$message.success(customerKeyzp);
              this.tsrnoBadingData = "绑定工号";
            },

            failCallback: () => {
              console.log("qingqiuchengg8888");
              this.$message.error(customerKeyzp);
            }
          });
        } else {
          return false;
        }
      }
      if (this.tsrnoBadingData == "绑定工号") {
        // alert(456)
        this.idSupernatant = true;
        this.isBinding = true;
        var bindingData = new FormData();
        bindingData.append("tsrcard", this.userTsrL.TSR_SESSION.tsrno);
        this.qrcodeLogion({
          bindingData,
          successCallback: () => {
            this.qrcodeLogionData = this.$store.getters.qrcodeLogionData;
            // alert(this.qrcodeLogionData)
            this.$refs.bindingFn.useqrcode(
              this.$store.getters.qrcodeLogionData
            );
            console.log(this.$store.getters.qrcodeLogionData);
            // this.tsrnoBadingData == '工号已经绑定'
          },
          failCallback: () => {}
        });
      }
    },
    //绑定操作
    // bindingOperation() {

    //   // if (this.tsrnoBadingData == '工号已经绑定'){
    //   //  return false
    //   //alert("hahha ");

    //   // }
    //   this.idSupernatant = true
    //   this.isBinding = true
    //   var bindingData = new FormData()
    //       bindingData.append('tsrcard', this.userTsrL.TSR_SESSION.tsrno)
    //   this.qrcodeLogion({
    //     bindingData,
    //     successCallback: () => {
    //       this.qrcodeLogionData = this.$store.getters.qrcodeLogionData
    //       // alert(this.qrcodeLogionData)
    //       this.$refs.bindingFn.useqrcode(this.$store.getters.qrcodeLogionData)
    //       console.log(this.$store.getters.qrcodeLogionData)
    //       // this.tsrnoBadingData == '工号已经绑定'
    //     },
    //     failCallback: () => {
    //     }
    //   })
    // },
    //显示预览
    openContentC(listNoThree) {
      // console.log(listNoThree)
      this.previewDisabel = this.isDisabel;
      this.WechatPreviewData = listNoThree;
      listNoThree.type = "2";
      listNoThree = JSON.stringify(listNoThree);
      var showtmData = new FormData();
      showtmData.append("showtmData", listNoThree);
      showtmData.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
      this.showtmList({
        showtmData,
        successCallback: () => {
          this.PreviewTitleName = "微信预览";
          this.PreviewData = this.$store.getters.WechatPreviewData;
        },
        failCallback: () => {}
      });
      this.idSupernatant = true;
      this.isPreview = true;
    },
    //短信显示预览
    openContentNote(listNoThree) {
      this.previewDisabel = this.isPhoneDisabel;
      this.NotePreviewData = listNoThree;
      listNoThree.type = "1";
      listNoThree = JSON.stringify(listNoThree);
      var showtmData = new FormData();
      showtmData.append("showtmData", listNoThree);
      showtmData.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
      this.showtmList({
        showtmData,
        successCallback: () => {
          this.PreviewTitleName = "短信预览";
          // console.log(this.$store.getters.WechatPreviewData)
          this.PreviewData = this.$store.getters.WechatPreviewData;
        },
        failCallback: () => {}
      });
      this.idSupernatant = true;
      this.isPreview = true;
    },
    //微信发送
    sendWechatData(wechataDatatDir) {
      // this.tenData = true
      let wechataDatat;
      if (wechataDatatDir == "" || wechataDatatDir == undefined) {
        wechataDatat = this.WechatPreviewData;
      } else {
        wechataDatat = wechataDatatDir;
      }
      wechataDatat.type = "2";
      this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      wechataDatat.sender = this.userTsrL.TSR_SESSION.tsrno;
      wechataDatat.openid = this.nowOpenIdData;
      wechataDatat = JSON.stringify(wechataDatat);
      var wechataData = new FormData();
      wechataData.append("showtmData", wechataDatat);
      var showtmData = new FormData();
      showtmData.append("showtmData", wechataDatat);
      this.showtmList({
        showtmData,
        successCallback: () => {
          this.PreviewData = this.$store.getters.WechatPreviewData;
        },
        failCallback: () => {}
      });
      this.tempWechat({
        wechataData,
        successCallback: () => {
          // this.tenData = false
          let sendMessageContent = {};
          sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
          sendMessageContent.userOpenId = this.clientListData[
            this.selectIndex
          ].OPENID;
          sendMessageContent.isMe = true;
          sendMessageContent.messageType = "1";
          sendMessageContent.CreateTime = formatDate(
            new Date(),
            "yyyy-MM-dd hh:mm:ss"
          );
          sendMessageContent.myImg = "";
          sendMessageContent.MsgType = "3";
          sendMessageContent.sendStatus = "1";
          sendMessageContent.imgurl = this.PreviewData.accessimgurl;
          sendMessageContent.mainTitle = this.PreviewData.mainTitle;
          sendMessageContent.subTitle = this.PreviewData.subTitle;
          sendMessageContent.moduleName = this.PreviewData.moduleName;
          // console.log(sendMessageContent)
          this.mesageList.push(sendMessageContent);
          this.bottomshow();
          this.messageTypeData = "news";
        },
        failCallback: midIdData => {
          let sendMessageContent = {};
          sendMessageContent.minIdData = midIdData;
          sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
          sendMessageContent.userOpenId = this.clientListData[
            this.selectIndex
          ].OPENID;
          sendMessageContent.isMe = true;
          sendMessageContent.messageType = "1";
          sendMessageContent.CreateTime = formatDate(
            new Date(),
            "yyyy-MM-dd hh:mm:ss"
          );
          sendMessageContent.myImg = "";
          sendMessageContent.MsgType = "3";
          sendMessageContent.sendStatus = "-1";
          sendMessageContent.imgurl = this.PreviewData.accessimgurl;
          sendMessageContent.mainTitle = this.PreviewData.mainTitle;
          sendMessageContent.subTitle = this.PreviewData.subTitle;
          sendMessageContent.moduleName = this.PreviewData.moduleName;
          this.mesageList.push(sendMessageContent);
          this.bottomshow();
          this.messageTypeData = "news";
        }
      });
    },
    //10s
    tenMin() {
      if (this.tenData) {
        this.$message.error("消息发送失败，请重新发送！");
        this.isSengContent = false;
      }
    },
    //短信发送
    sendNoteData(NoteDatatDir) {
      // this.tenData = true
      let NoteDatat;
      if (NoteDatatDir == "" || NoteDatatDir == undefined) {
        NoteDatat = this.NotePreviewData;
      } else {
        NoteDatat = NoteDatatDir;
      }
      NoteDatat.type = "1";
      this.userTsrL = JSON.parse(window.localStorage.getItem("userTsr"));
      NoteDatat.phoneNo = this.nowPhoneNo;
      NoteDatat.sender = this.userTsrL.TSR_SESSION.tsrno;

      NoteDatat = JSON.stringify(NoteDatat);
      console.log(NoteDatat);
      var NoteData = new FormData();
      NoteData.append("showtmData", NoteDatat);
      var showtmData = new FormData();
      showtmData.append("showtmData", NoteDatat);
      showtmData.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
      this.showtmList({
        showtmData,
        successCallback: () => {
          // alert(11)
          this.PreviewTitleName = "短信预览";
          this.PreviewData = this.$store.getters.WechatPreviewData;
          //   this.bottomshow()
          //   let sendMessageContent = {}
          // sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno
          // sendMessageContent.userOpenId = this.clientListData[this.selectIndex].OPENID
          // sendMessageContent.isMe = true
          // sendMessageContent.messageType = '1'
          // sendMessageContent.CreateTime = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
          // sendMessageContent.myImg = ''
          // sendMessageContent.MsgType = '3'
          // sendMessageContent.sendStatus = '1'
          // sendMessageContent.imgurl = this.PreviewData.imgurl
          // sendMessageContent.mainTitle = this.PreviewData.mainTitle
          // sendMessageContent.subTitle = this.PreviewData.subTitle
          // sendMessageContent.moduleName = this.PreviewData.moduleName
          // this.mesageList.push(sendMessageContent)
          // this.messageTypeData = 'news'
        },
        failCallback: () => {}
      });

      this.tempSms({
        NoteData,
        successCallback: isSend => {
          // alert(22)
          // this.tenData = false
          if (isSend.isSend == 1) {
            this.$message.error("短信发送次数已达上限！");
            // sendMessageContent.sendStatus = '-1'
            return false;
          }
          this.bottomshow();
          let sendMessageContent = {};
          sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
          sendMessageContent.userOpenId = this.clientListData[
            this.selectIndex
          ].OPENID;
          sendMessageContent.isMe = true;
          sendMessageContent.messageType = "1";
          sendMessageContent.CreateTime = formatDate(
            new Date(),
            "yyyy-MM-dd hh:mm:ss"
          );
          sendMessageContent.myImg = "";
          sendMessageContent.MsgType = "3";
          sendMessageContent.sendStatus = "1";
          sendMessageContent.imgurl = this.PreviewData.imgurl;
          sendMessageContent.mainTitle = this.PreviewData.mainTitle;
          sendMessageContent.subTitle = isSend.msg;
          sendMessageContent.moduleName = this.PreviewData.moduleName;
          this.mesageList.push(sendMessageContent);
          this.bottomshow();
          this.messageTypeData = "news";
        },
        failCallback: () => {
          this.$message.error("短信发送失败！");
          // this.tenData = false
          let sendMessageContent = {};
          sendMessageContent.minIdData = midIdData;
          sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
          sendMessageContent.userOpenId = this.clientListData[
            this.selectIndex
          ].OPENID;
          sendMessageContent.isMe = true;
          sendMessageContent.messageType = "1";
          sendMessageContent.CreateTime = formatDate(
            new Date(),
            "yyyy-MM-dd hh:mm:ss"
          );
          sendMessageContent.myImg = "";
          sendMessageContent.MsgType = "3";
          sendMessageContent.sendStatus = "-1";
          sendMessageContent.imgurl = this.PreviewData.imgurl;
          sendMessageContent.mainTitle = this.PreviewData.mainTitle;
          sendMessageContent.subTitle = this.PreviewData.subTitle;
          sendMessageContent.moduleName = this.PreviewData.moduleName;
          // console.log(sendMessageContent)
          this.mesageList.push(sendMessageContent);
          this.messageTypeData = "news";
        }
      });
      // setTimeout(() => {
      //   this.tenMin()
      // }, 10000)
    },
    //名片编辑
    cardRedact() {
      if (this.userTsrL.TSR_SESSION.tsrposition != "TSR") {
        return false;
      }
      // this.tsrCardMessage()
      this.idSupernatant = true;
      this.isMyCard = true;
    },
    //关闭操作
    closeOperation() {
      this.idSupernatant = false;
      this.isMyCard = false;
      this.isPreview = false;
      this.isComeToNothing = false;
      this.isBinding = false;
    },
    //键盘发送
    sendKeydown() {
      if (event.keyCode === 13) {
        if (event.ctrlKey) {
          if (this.chat_textarea == "") {
            return false;
          }
          this.chat_textarea += "\n";
        } else {
          event.returnValue = false;
          if (this.chat_textarea == "") {
            return false;
          }
          // this.contentText = true
          this.sendOperation();
        }
      }
    },
    //发送操作
    sendOperation() {
      this.tenData = true;
      let sendMessageContent = {};
      sendMessageContent.MyName = this.userTsrL.TSR_SESSION.tsrno;
      sendMessageContent.userOpenId = this.nowOpenIdData;
      sendMessageContent.isMe = true;
      sendMessageContent.messageType = "1";
      sendMessageContent.CreateTime = formatDate(
        new Date(),
        "yyyy-MM-dd hh:mm:ss"
      );
      sendMessageContent.myImg = "./static/images/bank_icon.png";
      sendMessageContent.MsgType = "1";
      sendMessageContent.send_error = false;
      this.messageTypeData = "text";
      sendMessageContent.sendStatus = "0";
      sendMessageContent.Content = this.chat_textarea;
      if (this.chat_textarea == "") {
        return false;
      }

      this.isSengContent = true;
      sendMessageContent.minIdData = this.$store.getters.messageData.id;
      this.mesageList.push(sendMessageContent);
      // console.log(this.mesageList.length)
      // console.log(sendMessageContent)
      this.bottomshow();
      let sendMessageContentD = JSON.stringify(sendMessageContent);
      var sendMessage = new FormData();
      sendMessage.append("sendMessage", sendMessageContentD);
      this.sendMessageData({
        sendMessage,
        successCallback: () => {
          this.tenData = false;
          // this.mesageList.push(sendMessageContent);
          console.log(this.mesageList.length);
          console.log(this.mesageList[this.mesageList.length - 1].sendStatus);
          this.mesageList[this.mesageList.length - 1].sendStatus = 1;
          this.bottomshow();
          this.chat_textarea = "";
          this.isSengContent = false;
        },
        failCallback: () => {
          this.tenData = false;
          // sendMessageContent.minIdData = this.$store.getters.messageData.id;
          // sendMessageContent.sendStatus = "-1";
          this.mesageList[this.mesageList.length - 1].sendStatus = "-1";
          // this.mesageList.push(sendMessageContent);
          console.log(this.mesageList.length);
          this.bottomshow();
          this.chat_textarea = "";
          this.isSengContent = false;
        },
        failCallbackTwo: () => {
          this.tenData = false;
          this.isSengContent = false;
        }
      });
      this.chat_textarea = "";
      setTimeout(() => {
        this.tenMin();
      }, 10000);
    },
    //离线消息
    nothingMessage(index) {
      // console.log(this.mesageList[index])
      this.comeToNothingData = this.mesageList[index].Content;
      this.messageNoList = index;
      this.midId = this.mesageList[index].id;
      if (
        this.mesageList[index].id == undefined ||
        this.mesageList[index].id == "" ||
        this.mesageList[index].id == null
      ) {
        this.midId = this.mesageList[index].minIdData;
      }
      this.idSupernatant = true;
      this.isComeToNothing = true;
    },
    nothingFn() {
      if (this.mesageList[this.messageNoList].MsgType == "1") {
        this.messageTypeData = "text";
      } else {
        this.messageTypeData = "news";
      }
      var toSaveOffData = new FormData();
      toSaveOffData.append("mid", this.midId);
      toSaveOffData.append("mtype", this.messageTypeData);
      this.nothingMessageFn({
        toSaveOffData,
        successCallback: () => {
          this.$message.success("离线消息发送成功！");
        },
        failCallback: () => {
          this.$message.error("离线消息发送失败！");
        }
      });
    },
    //完成绑定
    baindingOver(tsrcodeNo) {
      var tsrcodeData = new FormData();
      tsrcodeData.append("tsrcode", tsrcodeNo);
      // toSaveOffData.append('mtype', this.messageTypeData)
      this.toLogionCkeck({
        tsrcodeData,
        successCallback: () => {
          this.tsrnoBadingData = "工号已经绑定";
          this.$message.success("绑定成功！");
          this.closeOperation();
        },
        failCallback: () => {
          this.$message.error("绑定失败！");
          this.closeOperation();
        }
      });
    },
    //返回按钮
    returnBtn(index) {
      // console.log(index)

      let returnDxData = new FormData();
      returnDxData.append("tsrno", this.userTsrL.TSR_SESSION.tsrno);
      returnDxData.append("phoneno", this.clientListData[index].PHONENO);
      if (confirm("确认跳转回该客户的电话行销页面？")) {
        this.returnDxFn({
          returnDxData,
          successCallback: customerKey => {
            this.iframeNameData =
              "http://10.4.211.11/WeChatNestPage.html?customerKey=" +
              customerKey;
          },
          failCallback: () => {}
        });
      }
    },
    //获取更多信息
    getMore() {
      let chat_scroll_height = this.$refs.chat_window_box.scrollHeight;
      // console.log(chat_scroll_height)
      if (this.$refs.chat_window_box.scrollTop == 0) {
        // console.log(this.$refs.chat_window_box.scrollHeight)
        this.mesageList;
        // console.log(this.mesageList[0].id)
        if (this.mesageList.length == 0) {
          return false;
        }
        let getMoreMessData = new FormData();
        getMoreMessData.append("id", this.mesageList[0].id);
        getMoreMessData.append("openId", this.nowOpenIdData);
        getMoreMessData.append("phoneNo", this.nowPhoneNo);
        this.getMoreMess({
          getMoreMessData,
          successCallback: () => {
            // alert(this.$store.getters.getMoreMessage.length)
            for (
              let i = 0;
              i < this.$store.getters.getMoreMessage.length;
              i++
            ) {
              this.$store.getters.getMoreMessage[i].isMe = "";
              this.$store.getters.getMoreMessage[i].IMGURLNOW = this.imgulrNow;
              if (
                this.$store.getters.getMoreMessage[i].ToUserName ==
                  this.nowOpenIdData ||
                this.$store.getters.getMoreMessage[i].ToUserName ==
                  this.nowPhoneNo
              ) {
                this.$store.getters.getMoreMessage[i].isMe = true;
              }
            }
            this.$store.getters.getMoreMessage.reverse();
            // console.log(this.$store.getters.getMoreMessage)
            for (
              let i = 0;
              i < this.$store.getters.getMoreMessage.length;
              i++
            ) {
              this.mesageList.unshift(this.$store.getters.getMoreMessage[i]);
              // console.log('2' + '-' +this.$refs.chat_window_box.scrollHeight)
            }

            // console.log('2' + '-' +this.$refs.chat_window_box.scrollHeight)
            if (this.$store.getters.getMoreMessage.length > 8) {
              console.log(this.$store.getters.getMoreMessage.length);
              this.$refs.chat_window_box.scrollTop = 900;
            }
          },
          failCallback: () => {}
        });
      }
    },
    //显示最底部信息
    bottomshow() {
      let count = 0;
      let interval = setInterval(() => {
        if (count > 200) {
          clearInterval(interval);
        }
        count++;
        if (
          this.$refs.chat_window_box.scrollTop !=
          this.$refs.chat_window_box.scrollHeight
        ) {
          this.$refs.chat_window_box.scrollTop = this.$refs.chat_window_box.scrollHeight;
        }
        if (
          this.$refs.chat_window_box.scrollTop ==
          this.$refs.chat_window_box.scrollHeight
        ) {
          clearInterval(interval);
        }
      }, 0);
    },
    //音乐播放
    audioPlay() {
      // alert(this.$refs.palyMuisc);
      this.isPlayiing = true;
      // this.$refs.palyMuisc.palyMuisc
    },
    //输入判定
    isNumberPd(contentData) {
      // alert(111)
      contentData = this.phoneNO.replace(/\D/g, "");
      // console.log(contentData)
      this.phoneNO = contentData;
    }
  },
  watch: {}
};
</script>

<style lang="scss">
.big_img_style {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.86);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  text-align: center;
  padding: 50px 20px 20px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.chat_box {
  width: 1280px;
  // max-width: 1440px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  display: -webkit-flex;
  min-height: 900px;
  overflow-y: auto;
  .chat_list {
    width: 310px;
    // width: 22%;
    height: 100vh;
    height: 900px;
    overflow: hidden;
    .chat_list_one {
      width: 100%;
      height: 100%;
      background: #f1f5f8;
    }
    .chat_select {
      height: 190px;
      padding: 20px;
      box-sizing: border-box;
      background: #d0dce5;
      ul li {
        margin-bottom: 13px;
        display: flex;
        justify-content: space-between;
      }
    }
    .clientList {
      height: 710px;
      background: #f1f5f8;
      overflow-y: auto;

      li {
        padding: 20px 15px 10px;
        height: 100px;
        box-sizing: border-box;
        position: relative;
        border-bottom: 1px solid #d8e0e6;
        cursor: pointer;
        background: transparent;

        .clientList_content {
          display: flex;
          position: relative;
          cursor: pointer;
        }
        .portrait_img {
          width: 16%;
          min-width: 60px;
          img {
            width: 56px;
            height: 56px;
            display: block;
          }
        }
        .clientContent {
          width: 84%;
          position: relative;
          line-height: 23px;
          padding-left: 10px;
          box-sizing: border-box;
          p {
            font-size: 16px;
            color: #000;
          }
          p.clientContentTwo {
            color: #aaaaaa;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p.client_time {
            color: #aaaaaa;
            font-size: 14px;
          }
        }
        .clientContent_img {
          position: absolute;
          right: 15px;
          top: 18px;
        }
        .client_data_no {
          position: absolute;
          top: 10px;
          left: 0px;
          width: 35px;
          height: 35px;
          border-radius: 35px;
          background: #fc0000;
          border: 3px solid #fff;
          text-align: center;
          line-height: 31px;
          color: #fff;
          font-size: 18px;
          box-sizing: border-box;
          z-index: 5;
        }
      }
      li.examine {
        background: #fff;
      }
    }
  }
  .chat_content {
    width: 970px;
    height: 900px;
    overflow: hidden;
    background: #f1f5f8;
    .chat_hgroup {
      width: 970px;
      height: 82px;
      background: #509ee2;
      padding: 10px 10px 12px;
      box-sizing: border-box;
      .chat_message_staff {
        display: flex;
        .chat_message_left {
          padding-top: 10px;
          width: 70%;
          min-width: 660px;
          .chat_list_left {
            display: inline-block;
            transform: scaleY(1.2);
          }
        }
        .chat_message_rihgt {
          width: 30%;
          min-width: 310px;
          display: flex;
          color: #fff;
          p {
            width: 35%;
            padding-top: 20px;
            text-align: center;
            cursor: pointer;
            text-decoration: underline;
          }
          div {
            width: 30%;
            text-align: center;
            img {
              width: 56px;
              height: 56px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .chat_content_dwon {
      width: 970px;
      display: flex;
      display: -webkit-flex;
      height: 818px;
      .chat_interface {
        width: 660px;
        height: 818px;
        background: #ffffff;
        .chat_window_title {
          height: 65px;
          padding: 20px 15px 15px;
          box-sizing: border-box;
          border-bottom: 1px solid #d7dfe6;
          display: flex;
          .chat_window_name {
            width: 85%;
            font-size: 20px;
            color: #509ee2;
          }
          .chat_window_close {
            width: 15%;
            display: flex;
            line-height: 29px;
            cursor: pointer;
            div {
              width: 25%;
              padding-top: 3px;
              img {
                width: 23px;
              }
            }
          }
        }
        .chat_message_list {
          height: 550px;
          padding: 0 10px;
          box-sizing: border-box;
          overflow-y: auto;
          border-bottom: 1px solid #d7dfe6;
          li {
            margin: 30px 0;
            .chat_message_text {
              position: relative;
              width: 550px;
              display: flex;
              .text_content_box {
                max-width: 400px;
              }
              .chai_time {
                color: #999;
                font-size: 14px;
                position: absolute;
                left: 66px;
              }
              .chat_images {
                width: 56px;
                height: 56px;
                img {
                  width: 56px;
                  height: 56px;
                  display: block;
                }
              }
              .chai_text_data {
                word-wrap: break-word;
                padding: 10px;
                margin-left: 10px;
                background: #509ee2;
                color: #fff;
                border-radius: 7px;
                margin-top: 20px;
                .imgContent {
                  img {
                    max-width: 300px;
                    max-height: 300px;
                  }
                  .audio_music {
                    width: 300px !important;
                  }
                }
              }
              .chai_text_data_1 {
                word-wrap: break-word;
                padding: 10px;
                margin-left: 10px;
                background: #a60a11;
                color: #fff;
                border-radius: 7px;
                margin-top: 20px;
                .imgContent {
                  img {
                    max-width: 300px;
                    max-height: 300px;
                  }
                  .audio_music {
                    width: 300px !important;
                  }
                }
              }
            }
            .chai_me_text {
              display: flex;
              justify-content: flex-end;
              position: relative;
              .chai_time {
                color: #999;
                font-size: 14px;
                position: absolute;
                right: 66px;
              }
              .chai_me_text_data {
                width: 550px;
                display: flex;
                justify-content: flex-end;
                .text_content_box {
                  max-width: 400px;
                }
                .send_sb {
                  padding: 20px 10px 0 0;
                  box-sizing: border-box;
                  div {
                    width: 30px;
                    height: 30px;
                    background: red;
                    color: #fff;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 30px;
                    cursor: pointer;
                  }
                  img {
                    width: 30px;
                    height: 30px;
                    animation: loadingAni 1s linear;
                  }
                }
                .chai_text_data_me {
                  word-wrap: break-word;
                  padding: 10px;
                  margin-right: 10px;
                  background: #f1f5f8;
                  color: #000;
                  border-radius: 7px;
                  margin-top: 20px;
                  .myCardStyle {
                    .myCardStyleTop {
                      display: flex;
                      padding-bottom: 10px;
                      .myCardStyleTopOne {
                        width: 75px;
                        img {
                          width: 56px;
                          height: 56px;
                          display: block;
                        }
                      }
                      .myCardStyleTopTwo {
                        width: 200px;
                        p {
                          width: 200px;
                          line-height: 28px;
                          font-size: 18px;
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        }
                        p:last-child {
                          width: 200px;
                          line-height: 28px;
                          font-size: 16px;
                        }
                      }
                    }
                    .myCardStyleDwon {
                      font-size: 14px;
                      color: #8a8989;
                      padding-top: 10px;
                      border-top: 1px solid #8a8989;
                    }
                  }
                }
                .chat_images {
                  width: 56px;
                  img {
                    width: 56px;
                    height: 56px;
                    display: block;
                  }
                }
              }
            }
          }
        }
        .chat_input {
          width: 660px;
          height: 203px;
          // min-height: 232px;
          box-sizing: border-box;
          position: relative;
          .chat_input_box {
            width: 660px;
            height: 130px;
          }
          .chat_star {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            text-align: center;
            button {
              float: none;
              margin-top: 30px;
            }
          }
          .el-textarea__inner {
            border: none;
            outline: 0px;
            resize: none;
            font-size: 16px;
          }
          button {
            float: right;
            font-size: 20px;
            margin-right: 15px;
          }
        }
      }
      .chat_message {
        width: 310px;
        height: 818px;
        background: #f1f5f8;
      }
    }
  }
  .supernatant_bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.86);
    left: 0;
    top: 0;
    z-index: 999;
  }
  .preview_send {
    text-align: center;
    margin-top: 77px;
  }
  .qiantao {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 0;
    left: 0;
    visibility: hidden;
    iframe {
      width: 10px;
      height: 10px;
    }
  }
  .input_text {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    text-align: left;
    font-size: 14px;
  }
}
@keyframes loadingAni {
  0%,
  100% {
    transform: scaleZ(0deg);
  }
  50% {
    transform: scaleZ(360deg);
  }
}
</style>


