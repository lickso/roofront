/**
 *
 */
define(['crossAPI', 'Util', 'list', 'date', 'validator',
        'groupSearchForm', 'detailPanel', 'loggerParam'
    ],
    function (crossAPI, Util, List, date, Validator,
        GroupSearchForm, DetailPanel, loggerParam) {
        var init = function () {
            $el = $('body');
            eveitinint();
        };
        var eveitinint = function () {
            getMis();
        };
        // 获取手机号码
        var mis;
        var subsNumber;
        var logger = getLoggerInstance();
        var list3;
        var myDetail;
        var myDetailPanel;
        var getMis = function () {
            crossAPI.getContact("getSystermOldStaffIdList", function (dataParams) {
                var systermOldStaffIdListData = dataParams.systermOldStaffIdList;
                if (systermOldStaffIdListData) {
                    var oldStaffId = systermOldStaffIdListData[0].origStaffId;
                    console.log("老工号：" + oldStaffId);
                    logger.setOldOpId(oldStaffId); //老工号获取	  

                    crossAPI.getContact('getClientBusiInfo', function (data) {
                        crossAPI.getIndexInfo(function (params) {
                            if (params && params.userInfo.staffId && "" != params.userInfo.staffId) {
                                var provinceId = params.userInfo.provinceId;
                                var serviceTypeId = params.userInfo.serviceTypeId;
                                logger.setOpId(params.userInfo.staffId); //员工编号
                                logger.setOpOrgId(params.userInfo.deptId); //组织编号
                                logger.setOpName(params.userInfo.staffName); //员工名称
                                logger.setOpOrgName(params.userInfo.deptName); //组织名称
                                logger.setClientIp(params.userInfo.clientIp); //本机Ip
                                if (params.userInfo.serviceTypeId === "nmhytck") { //新交互系统
                                    provinceId = commonAPI.getXjhProvinceId() || crossAPI.tips("新交互系统获取xjhProvinceId值失败");
                                    serviceTypeId = commonAPI.getServiceTypeId() || crossAPI.tips("新交互系统获取serviceTypeId值失败");
                                }
                                logger.setProvCode(provinceId); //登陆人省份编码，用于接口调用的csf路由
                                logger.setServiceTypeId(serviceTypeId); //系统业务类型ID，用于接口调用csf路由
                            }
                        });
                        if (data != null && data && data.bean != null && data.bean && data.bean.msisdn != null && data.bean.msisdn) {
                            mis = data.bean.msisdn;
                            subsNumber = data.bean.msisdn;
                            logger.setAcceptNum(mis);
                            console.log('欠费工单历史')
                            grop();
                        } else {
                            crossAPI.tips("获取接续号码失败！", 2000);
                        };
                    })
                } else {
                    crossAPI.tips("该工号没有配置BOSS工号！");
                };
            });
        };
        //页面刷新事件
        crossAPI.on('tabSwitch', function (resultObj) {
            if (resultObj != undefined || resultObj != "undefined") {
                var tabName = resultObj.title;
                if (tabName == "欠费工单历史") {
                    if (subsNumber != mis) {
                        crossAPI.refreshTab([{
                            tabName: tabName
                        }]);
                    }
                }
            }
        });
        //右边触发事件
        crossAPI.on('acceptNumberChange', function (data) {
            logger.setAcceptNum(data);
            subsNumber = data;
            if (list3 != null) {
                list3.clear();
            };
            if (myDetailPanel != null) {
                var jj = {
                    callTxt: '',
                    remark: ''
                };
                myDetailPanel.reload(jj);
            }
            //getMis();
        });
        // 操作类型
        var typejson = [{
            "id": "0",
            "name": "全部",
            "value": "0"
        }, {
            "id": "1",
            "name": "5元催缴",
            "value": "2"
        }, {
            "id": "2",
            "name": "10元催缴",
            "value": "5"
        }, {
            "id": "3",
            "name": "单停",
            "value": "29"
        }, {
            "id": "4",
            "name": "双停",
            "value": "31"
        }, {
            "id": "5",
            "name": "开机",
            "value": "53"
        }, ];
        //内蒙12地市
        var cityNum1 = [{
            "id": "0",
            "name": "呼和浩特",
            "value": "471"
        }, {
            "id": "1",
            "name": "包头",
            "value": "472"
        }, {
            "id": "2",
            "name": "乌海",
            "value": "473"
        }, {
            "id": "3",
            "name": "赤峰",
            "value": "476"
        }, {
            "id": "4",
            "name": "通辽",
            "value": "475"
        }, {
            "id": "5",
            "name": "鄂尔多斯",
            "value": "477"
        }, {
            "id": "6",
            "name": "呼伦贝尔",
            "value": "470"
        }, {
            "id": "7",
            "name": "乌兰察布",
            "value": "474"
        }, {
            "id": "8",
            "name": "巴彦淖尔",
            "value": "478"
        }, {
            "id": "9",
            "name": "兴安盟",
            "value": "482"
        }, {
            "id": "10",
            "name": "阿拉善盟",
            "value": "483"
        }, {
            "id": "11",
            "name": "锡林郭勒盟",
            "value": "479"
        }];
        //信息备注展示项
        var dtit = function (json) {
            var new2 = {
                el: '#detailPanel',
                labelWidth: "120px",
                className: 'formContent',
                colon: ' ',
                errValue: ' ',
                items: [{
                    label: '催缴使用文本', // 必选
                    key: 'callTxt', // 必选
                    // 对应json数据的key
                }, {
                    label: '备注', // 必选
                    key: 'remark', // 必选
                    // 对应json数据的key
                }],
                data: json
            };
            myDetailPanel = new DetailPanel(new2);
        };
        //表格列
        var familyitems = [{
            text: '工单编号', // 列文本设置
            name: 'workOrderId', // 列字段设置
            click: function (e, val, item) { //该列td点击事件
                    var json;
                    json = {
                        callTxt: item.data.callText,
                        remark: item.data.remark
                    };
                    dtit(json);
                },
                render: function (item, val, $src) { //重写列表展示
                    return '<a style=   "cursor:pointer;text-decoration:underline;">' + val + '</ a>';
                }
        }, {
            text: '地区编号', // 列文本设置
            name: 'cityNum' // 列字段设置
        }, {
            text: '操作类型', // 列文本设置
            name: 'operationType' // 列字段设置
        }, {
            text: '执行时间', // 列文本设置
            name: 'exeTime' // 列字段设置
        }, {
            text: '账户可用余额', // 列文本设置
            name: 'accountAvailableBalance' // 列字段设置
        }, {
            text: '批次号', // 列文本设置
            name: 'batchNum' // 列字段设置
        }, {
            text: '归属市县', // 列文本设置
            name: 'city' // 列字段设置
        }, {
            text: '归属营业厅', // 列文本设置
            name: 'homeOffice' // 列字段设置
        }];
        //判断当前日期
        var getMax = function (nowdate) {
            var nowDay = nowdate.getDate();
            if (nowDay > 9) {
                return nowDay;
            } else {
                return '0' + nowDay;
            };
        };
        var nowdate = new Date();
        var nowYear = nowdate.getFullYear();
        var newMonth = nowdate.getMonth() + 1;

        var mix;
        var max;
        if (newMonth > 9) {
            mix = nowYear + '-' + newMonth + '-' + '01';
            max = nowYear + '-' + newMonth + '-' + getMax(nowdate);
        } else {
            mix = nowYear + '-0' + newMonth + '-' + '01';
            max = nowYear + '-0' + newMonth + '-' + getMax(nowdate);
        };
        var g1;
        var grop = function () {
            var config = {
                el: '#groupSearchForm', // * 要绑定的容器
                className: 'groupSearchForm', // 组件外围的className
                column: 3, // 表单文本框的列数(每一行表单项的个数)，枚举值：2、3、4，默认4。
                items: [ // 表单属性信息 及页面显示顺序
                    {
                        element: 'any', // 盖到。
                        content: "<div  id='mobil'></div>",
                        className: 'user-defined', //
                    }, {
                        element: 'doubleDate',
                        label: ['开始时间', '结束时间'], // 必须是length为2的数组
                        name: ['startTime', 'endTime'], // 必须是length为2的数组
                        validator: [{
                            rules: ["required", "date"],
                            messages: [, "开始时间格式不正确"]
                        }, {
                            rules: ["required", "date"],
                            messages: [, "结束时间格式不正确"]
                        }], // 如果配置了，那么它也是一个数组,index与name一一对应
                        config: [ //如果配置了doubleDate的config,config也必须是一个length为2数组
                            {
                                defaultValue: mix
                            }, {
                                defaultValue: max,
                                max: max
                            }
                        ]
                    }, {
                        element: 'select', // 子组件类型（必须）
                        label: '操作类型    ', // 输入框label（必须）
                        name: 'operatType', // 
                        config: {
                            text: '全部',
                            value: "0"
                        },
                        datas: typejson, // 数据源 url和datas
                    }, {
                        element: 'select', // 子组件类型（必须）
                        label: '归属地市   ', // 输入框label（必须）
                        name: 'cityType', // 
                        config: {
                            text: '呼和浩特',
                            value: "471"
                        },
                        datas: cityNum1, // 数据源 url和datas
                    }
                ]
            };
            var jso = {
                mobile: mis
            };
            var con = {
                el: '#mobil',
                labelWidth: "100px",
                className: 'formContent',
                colon: ' ',
                items: [{
                    label: '手机号码', // 必选
                    key: 'mobile', // 必选
                }],
                data: jso
            };
            g1 = new GroupSearchForm(config);
            var myDetail = new DetailPanel(con);
        };
        $("#query").click(function () {
            var tel = mis;
            var startTime = g1.getValue().startTime;
            var endTime = g1.getValue().endTime;
            var operatType = g1.getValue().operatType;
            var city = g1.getValue().cityType;
            if (tel != '' && startTime != '' && endTime != '' && operatType != '' && operatType != '-1' && city != '-1') {
                if (/^1[345789]\d{9}$/.test(tel)) {
                    var par = {
                        'userMobile': tel,
                        'operationType': operatType,
                        'startTime': startTime,
                        'endTime': endTime,
                        'city': city,
                        "log": logger.getJsonStr()
                    };
                    var config3 = {
                        el: '#list', // 要绑定的容器
                        field: { // 字段设置
                            key: 'orderMessage', // 主键，必须设置该项
                            items: familyitems
                        },
                        data: {
                            url: '/ngbusi_nm/front/sh/arrearsOrderHistory!execute?uid=queryInfo'
                        }
                    };
                    list3 = new List(config3);
                    list3.search(par);
                    var json;
                    json = {
                        callTxt: '',
                        remark: ''
                    };
                    dtit(json);
                } else {
                    crossAPI.tips("请输入正确的手机号码！", 2000);
                };
            } else {
                crossAPI.tips("有必填项未填！", 2000);
            };
        });
        $(function () {
            new init();
        });
    });