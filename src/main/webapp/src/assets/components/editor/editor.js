/**
 * Created by lizhao on 2016/2/29.
 */

define('editor',[
	'jquery',
	'eventTarget',
	'kindEditor', 'kindEditorLang'
], function($, EventTarget) {
	var VERSION = '1.1.0';
	var objClass = function(options) {
		if(options.el) {
			if(options.el instanceof jQuery && options.el.length > 0) {
				this.$el = options.el;
			} else if(isDOM(options.el)) {
				this.$el = $(options.el);
			} else if(typeof(options.el) == 'string' && $(options.el).length > 0) {
				this.$el = $(options.el);
			}
		} else {
			this.$el = $('<div></div>')
		}
		this.$el.html('<textarea></textarea>');
		this.options = options;
		initialize.call(this);
		this.content = this.$el;
	};
	var initialize = function() {
		var _self = this;
		if(_self.options.mode == 'mini') {
			//this.options.items=[['undo', 'redo','|','bold', 'italic', 'underline','removeformat', 'formatmatch','|','forecolor', 'backcolor','|','rowspacingtop', 'rowspacingbottom', 'lineheight','|','customstyle', 'paragraph', 'fontfamily', 'fontsize','|','indent','|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify']]
			_self.options.items = ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'removeformat', '|', 'forecolor', 'hilitecolor', '|', 'formatblock', 'fontname', 'fontsize', '|', 'indent', 'outdent', 'lineheight', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull'];
		} else {
			_self.options.items = [
				'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
				'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
				'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
				'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen',
				'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
				'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
				'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
				'anchor', 'link', 'unlink', '|', 'about'
			]
		}
		//加载指定的工具图标
		if(_self.options.addTools) {
			_self.options.items = _self.options.items.concat(_self.options.addTools);
		}
		//是否开启字数统计
		if(_self.options.wordCount===false) { //否
			var opt = $.extend({
				width: "100%",
				height: 320, //初始化编辑器高度,默认320
				resizeType: 0 // 是否可以拖动改变宽度和高度,2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。
			}, _self.options);
			_self.origin = KindEditor.create(_self.$el.find("textarea")[0], opt);
		} else {
			var maxWords = _self.options.maximumWords || 10000;
			var opt = $.extend({
				width: "100%",
				height: 320, //初始化编辑器高度,默认320
				resizeType: 0 // 是否可以拖动改变宽度和高度,2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。
			}, _self.options, {
				afterChange: function() {
					var count = this.count(),
						remain = maxWords - this.count(),
						html = '当前已输入' + count + '个字符, 您还可以输入' + remain + '个字符。';
					_self.$el.find('.count-hook').html(html)
					if(_self.options.afterChange) {
						_self.options.afterChange.call(this);
					}
				}
			});
			_self.origin = KindEditor.create(_self.$el.find("textarea")[0], opt);
			_self.$el.find('.ke-statusbar').css({
					"height": "20px"
				})
				.append('<div class="count-hook" style="position:absolute;width:100%;bottom:0;right:12px;font-size:12px;line-height:20px;text-align:right;">当前已输入0个字符, 您还可以输入' + maxWords + '个字符。</div>')
				.find('.ke-statusbar-center-icon').css({
					"margin-top": "4px"
				})
		}
		//写入默认内容
		if(_self.options.content) {
			_self.origin.html(this.options.content);
		}
	}
	$.extend(objClass.prototype, EventTarget.prototype, {
		version: VERSION,
		setContent: function(html) {
			return this.origin.html(html)
		},
		getContent: function() {
			return this.origin.html();
		}
	})

	var isDOM = function(obj) {
		return obj.tagName ? true : false
	}
	//解决ie下console.log()报错问题
	window.console = window.console || (function() {
		var c = {};
		c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function() {};
		return c;
	})();

	return objClass;

});
