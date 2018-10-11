define(['Util', 'list','select','groupSearchForm','detailPanel','buttonGroup','loggerParam','crossAPI'],
	function (Util,List,Select,GroupSearchForm,DetailPanel,buttonGroup,loggerParam,crossAPI) {
	var nowdate = new Date();
	var array = new Array();
	var logger = getLoggerInstance();
	var newMonth = nowdate.getMonth()+1;
	if(newMonth > 9){
		array[0] = nowdate.getFullYear()+''+newMonth;
	}else{
		array[0] = nowdate.getFullYear()+'0'+newMonth;
	}
	for (var i = 1; i < 12; i++) {
		 nowdate.setMonth(nowdate.getMonth()-1);
         var year = nowdate.getFullYear();
         var month = nowdate.getMonth()+1;
         if(month > 9){
        	 array[i] = year+''+month;
         }else{
        	 array[i] = year+'0'+month;
         }
	}
	var month = [{
					 "id":"1001",
			         "name":array[0],
			         "value":array[0]
					},
					{
						"id":"1002",
				        "name":array[1],
				        "value":array[1]
					},
					{
						"id":"1003",
				         "name":array[2],
				         "value":array[2]
					},
					{
						"id":"1004",
				         "name":array[3],
				         "value":array[3]
					},
					{
						"id":"1005",
				         "name":array[4],
				         "value":array[4]
					},
					{
						"id":"1006",
				         "name":array[5],
				         "value":array[5]
					},{
						 "id":"1007",
				         "name":array[6],
				         "value":array[6]
					},
					{
						"id":"1008",
				        "name":array[7],
				        "value":array[7]
					},
					{
						"id":"1009",
				         "name":array[8],
				         "value":array[8]
					},
					{
						"id":"10010",
				         "name":array[9],
				         "value":array[9]
					},
					{
						"id":"1011",
				         "name":array[10],
				         "value":array[10]
					},
					{
						"id":"1012",
				         "name":array[11],
				         "value":array[11]
					}];
	var citys = [
	             {
					"name": "呼伦贝尔",
					"value": "470"
				},{
					"name": "呼和浩特",
					"value": "471"
				},{
					"name": "包头",
					"value": "472"
				},{
					"name": "乌海",
					"value": "473"
				},{
					"name": "乌兰察布",
					"value": "474"
				},{
					"name": "通辽",
					"value": "475"
				},
				{
					"name": "赤峰",
					"value": "476"
				},{
					"name": "鄂尔多斯",
					"value": "477"
				},{
					"name": "巴彦淖尔",
					"value": "478"
				},{
					"name": "锡林浩特",
					"value": "479"
				},{
					"name": "兴安盟",
					"value": "482"
				},{
					"name": "阿拉善盟",
					"value": "483"
				}
				];
	var $el = null;
	//受理号码
	var subsNumber = "";
	//接入号码
	var msisdn = "";
	//月份 Month
	var monthValue;
	//地市
	var city;
	//查询入参
	var allFrom;
	//查询列表
	var list;
	
	var activityUnpackInfo = function(){
        $el = $('body');
        crossAPI.getContact("getSystermOldStaffIdList",function(dataParams){
            var systermOldStaffIdListData = dataParams.systermOldStaffIdList;
            if(systermOldStaffIdListData){
                var oldStaffId = systermOldStaffIdListData[0].origStaffId;
                logger.setOldOpId(oldStaffId);//老工号获取
// //							var strUrl = 'http://10.173.226.172:8081/csp/c_kbs/homepageTabset2.action?staffId='+oldStaffId+'&kngId='+openOfferId;
// //							window.open(strUrl);
        crossAPI.getContact('getClientBusiInfo', function(data) {// 获取接续信息
            if (data != null && data && data.bean != null && data.bean && data.bean.msisdn != null && data.bean.msisdn) {
                msisdn = data.bean.msisdn;
                subsNumber = data.bean.msisdn;
                logger.setAcceptNum(msisdn);
                crossAPI.getIndexInfo(function(params){
                    if (params && params.userInfo.staffId && "" != params.userInfo.staffId){
                        var provinceId = params.userInfo.provinceId;
                        var serviceTypeId = params.userInfo.serviceTypeId;
                        logger.setOpId(params.userInfo.staffId);//员工编号
                        logger.setOpOrgId(params.userInfo.deptId);//组织编号
                        logger.setOpName(params.userInfo.staffName);//员工名称
                        logger.setOpOrgName(params.userInfo.deptName);//组织名称
                        logger.setClientIp(params.userInfo.clientIp);//本机Ip
                        // if(params.userInfo.serviceTypeId === "nmhytck"){//新交互系统
                        //     provinceId = commonAPI.getXjhProvinceId() || crossAPI.tips("新交互系统获取xjhProvinceId值失败");
                        //     serviceTypeId = commonAPI.getServiceTypeId() || crossAPI.tips("新交互系统获取serviceTypeId值失败");
                        // }
                        logger.setProvCode(provinceId);//登陆人省份编码，用于接口调用的csf路由
                        logger.setServiceTypeId(serviceTypeId);//系统业务类型ID，用于接口调用csf路由
                    }
                });
                eventInit();
            }else{
                crossAPI.tips("号码为空！",2000);
            }
        });
            }else{
                alert("该工号没有配置BOSS工号！");
            }
        });

        //页面刷新事件
        crossAPI.on('tabSwitch',function(resultObj){
            if(resultObj!=undefined ||resultObj!="undefined"){
                var tabName = resultObj.title;
                if(tabName == "活动拆包查询"){
                    if(subsNumber!= msisdn){
                        crossAPI.refreshTab([{
                            tabName: tabName
                        }]);
                    }
                }
            }
        });

        // 右边触发事件
        crossAPI.on('acceptNumberChange',function(data){
            subsNumber = data;
        });
	};
	
	var eventInit = function(){
		pageInit();
	};
	var pageInit = function(){
		queryConditions();
		infoList();
		buttonInit();
	};
	
	var queryConditions = function(){
		var queryFrom = {
			    el: $('#queryForm',$el), // * 要绑定的容器
			    className: 'groupSearchForm', //组件外围的className
			    column: 3, //表单文本框的列数(每一行表单项的个数)，枚举值：2、3、4，默认4。
			    advancedQuery: -1, //启用高级查询,items的index(从1开始)大于该数字的item会被隐藏；默认-1不启用
			    items: [ // 表单属性信息 及页面显示顺序      
			        // {
			        //     element: 'input',
			        //     className:'queryMobile',
			        //     label: '接入号码',
			        //     name: 'userMobile',
                     //    config: { //自定义config,如果element是input，可选值为：className,attr
                     //        className: '',
                     //        attr: { //input的属性
                     //            // placeholder: '请输入手机号码',
                     //            value:msisdn
                     //        }
                     //    }
			        // },
                    {
                        element: 'any', // 盖到。
                        content: "<div  id='mobil'></div>",
                        className: 'user-defined' //
                    },
			        {
			            element: 'select', //子组件类型（必须）
			            className:'select1',
			            label: '查询月份', // 输入框label（必须）
			            name: 'queryMonth', //该表单元素的name，对应getDate方法获取到的json数据的名（必须）
			            value:'0',
			            validator: {
			                rules: ["required"]
			            },
			            config:{
							"name": month[0].name,
							"value": month[0].value
			            },
			            datas:month //数据源  url和datas 2选1，都设置的话url优先级高
			        },
			        {
			            element: 'select', 
			            className:'select2',
			            label: '地市',
			            name: 'city',
			            validator: {
			                rules: ["required"]
			            },
			            config:{
							"name": "呼伦贝尔",
							"value": "471"
			            },
			            datas:citys //数据源  url和datas 2选1，都设置的话url优先级高
			        }
			    ]
		};
		allFrom = new GroupSearchForm(queryFrom);
        var jso={
            "mobile":	msisdn
        };
        var con = {
            el:$('#mobil',$el),
            labelWidth: "100px",
            className: 'formContent',
            colon:' ',
            items: [{
                label: '手机号码', // 必选
                key: 'mobile' // 必选
            }],
            data: jso
        };
        new DetailPanel(con);
	};


	
	var infoList = function(){
		//根据上面的拼接入参
		//将根据路径+方法+入参 获取数据放在list中
			 var listConfig = {
		                el:$('#activityListContainer'),
		                height:450, 
		                field:{
		                   items:[
		                        {
		                        	text:'序号',name:'rowNum'
		                        },{
		                        	text:'用户编号',name:'userId'
		                        },{
		                        	text:'IMEI',name:'imei'
		                        },{
		                        	text:'地市',name:'city'
		                        },{
		                        	text:'生成时间',name:'produceDate'	
		                        },{
		                        	text:'通话次数',name:'communicateTimes'	
		                        },{
		                        	text:'4G流量使用量(单凭：MB)',name:'flowUseAmount'	
		                        },{
		                        	text:'备注',name:'remarks'
		                        }    
		                ]},
		                page:{  //分页设置
					        customPages:[2,3,5,10,15,20,30,50],     //可选择每页显示多少条
					        perPage:10,     //默认每页显示多少条记录
					        total:true,
					        align:'right'
					    },
		                data:{
		                	url:'/ngbusi_nm/front/sh/activityUnpackQuery!execute?uid=queryActivityUnpack'
                        }
		            };
					list = new List(listConfig);
	            	var params = allFrom.getValue();
	            	params.userMobile = msisdn;
       				params.log = logger.getJsonStr();
	            	list.search(params);
	};

    /**
     * 查询按钮
     */
    var buttonInit = function(){
        var btnSearch = {
            el:$('#btnSearchActivity',$el),             //要绑定的容器
            className:'buttonGroup',                //整个按钮组外围的class
            direction:'horizontal',                 //按钮布局 horizontal横向|vertical纵向
            items:[                                 //按钮配置集合
                {
                    className:'buttonSave1',        //按钮外围的class
                    text:'查询',                    //按钮上的文本
                    type:'0',                       //按钮类型  0普通按钮(默认白色)|1焦点按钮(蓝色)|2特殊按钮(绿色),默认值为 0
                    size:'sm',                    //按钮的大小，lg表示大按钮，md表示中等按钮，sm表示小按钮，xs表示特小按钮，默认中等大小。
                    disabled:'1',                   //是否禁用  0禁用|1默认启用
                    id:'btn002',                   //方便方法调用；可选项；默认无；
                    click:function(e){
                        var params = allFrom.getValue();
                        params.userMobile = msisdn;
                        params.log = logger.getJsonStr();
                        list.search(params);
                    }
                }
            ]
        };
        new buttonGroup(btnSearch);
    };
	
	$(function(){
		new activityUnpackInfo();
	}) ;
});