/**
 * @auth  yangsheng
 * @des   require.js
 * @date  2018-10-12
 * @des   重写requirejsMain
 */
var require = {
	baseUrl : "../../",
    map: {
      	/*'*': { 'style': 'assets/lib/requirejs/css.min' }*/
    },
	paths : {
        //jquery
		'jquery' : 'assets/lib/jquery/jquery',
		
		//ajax
		//'ajax' : 'assets/common/ajax_amd',
			
		//event
		//'event' : 'assets/common/event'
		
		
		
		//统一注释掉
		/*'crossAPI':getReferrerUrl(),
        'jquery' : 'assets/lib/jqr/jqr',
        'backbone':'assets/lib/backbone/a',
		'laydate':'assets/lib/laydate/laydate',
		'text' : 'assets/lib/requirejs/text',
        'artDialog' : 'assets/lib/dialog/dialog-plus',
        'zTree':'assets/lib/zTree_v3/js/jquery.ztree.all',
        'simpleTree':'assets/components/simpleTree/simpleTree',
        'ueditorConfig':'assets/lib/ueditor/ueditor.config',
        'ueditor':'assets/lib/ueditor/ueditor.all',
        'echarts': 'assets/lib/echarts/echarts-all',*/
        
        //jquery plugins begin---
        /*'jquery.jplayer':'assets/lib/jqueryPlugin/jPlayer/dist/jplayer/jquery.jplayer',
        "jquery.placeholder": "assets/lib/jqueryPlugin/placeholder/jquery.placeholder.min",
        "jquery.fileuploader": "assets/lib/jqueryPlugin/jQuery-File-Upload/js/jquery.fileupload",
        "jquery.ui.widget":"assets/lib/jqueryPlugin/jQuery-File-Upload/js/vendor/jquery.ui.widget",
        "jquery.pagination":"assets/lib/jqueryPlugin/pagination/jquery.pagination",
        'jqueryUI': 'assets/lib/jqueryui/jquery-ui.min',*/
        //jquery plugins end---

        /*'cookie' : 'assets/common/cookie',
        'ajax' : 'assets/common/ajax_amd',
        'hdb' : 'assets/lib/handlebars/handlebars',
        'hdbr' : 'assets/lib/handlebars/handlebars.runtime',
        'eventTarget':'assets/common/eventTarget',
        'form':'assets/common/form_amd',
        'keyboardEvent': 'assets/common/keyboardEvent_amd',
        'hdbHelper' : 'assets/lib/handlebars/helpers',
        'underscore':'assets/lib/underscore/underscore',
        'json2' : 'assets/lib/json2/json2',
        'type' : 'assets/common/type',
        'event' : 'assets/common/event',*/
		
        /*组件*/
		/*'tab':'assets/components/tab/tab',
        'radios':'assets/components/radios/radios',
		'list':'assets/components/list/list',
		'select':'assets/components/select/select',
        'date':'assets/components/date/date',
		'dialog':'assets/components/dialog/dialog',
		'editor':'assets/components/editor/editor',
		'validator':'assets/components/validator/validator',
		'selectTree':'assets/components/selectTree/selectTree',
        'voice':'assets/components/voice/voice',
        'video':'assets/components/video/video',
        'counter':'assets/components/counter/counter',
        'selectMultiple' : 'assets/components/selectMultiple/selectMultiple',
        'timer':'assets/components/timer/timer',
        'loading':'assets/components/loading/loading',
        'satisfyStar':'assets/components/satisfyStar/satisfyStar',
        'groupSearchForm':'assets/components/groupSearchForm/groupSearchForm',
        'upload':'assets/components/upload/upload',
        'buttonGroup' : 'assets/components/buttonGroup/buttonGroup',
        'checkboxes' : 'assets/components/checkboxes/checkboxes',
        'groupSearchForm':'assets/components/groupSearchForm/groupSearchForm',
        'process':'assets/components/process/process',
        'detailPanel':'assets/components/detailPanel/detailPanel',
        'Util' : 'assets/common/util',
        'loggerParam' : 'js/loggerParam',
        'loggerNgbusi' : 'js/loggerNgbusi',
        'jqComboSelect':'assets/lib/comboSelect/jquery.combo.select',
        'comboSelect':'assets/components/comboSelect/comboSelect'*/

    },
	waitSeconds:0,
	shim:{
		//'ajax': { deps: ['jquery'] }
		
		//统一注释掉
        /*'jquery.fileuploader': { deps: ['jquery.ui.widget'] },
        'jquery.fileuploader': { deps: ['jquery'] },
        'jquery.ui.widget': { deps: ['jquery'] },
        'jquery.placeholder': { deps: ['jquery'] },
        'jquery.jplayer': { deps: ['jquery'] },
        'jquery.pagination': { deps: ['jquery'] },
        'validator': { deps: ['jquery'] },

        'ueditor': { deps: ['ueditorConfig'] },
        'hdb':{ exports: ['Handlebars'] },
        'hdbHelper': { deps: ['hdb'] },
        'ajax': { deps: ['jquery'] },
        'artDialog': { deps: ['jquery'] },
        'zTree' : { deps:['jquery'], exports:'$.fn.zTree' },
        'jqueryUI': { deps: ['jquery'] }*/
	}
}
